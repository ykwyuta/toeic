"""Build or verify the Part-by-Part practice bank and its release media."""
import argparse
import hashlib
import json
import runpy
import wave
from pathlib import Path

SOURCE = Path(__file__).resolve().parent
ROOT = SOURCE.parent
DIST = ROOT / "dist"
BANK = "study/r1/bank.js"
PREFIX = "globalThis.toeicStudyBank = "
AUDIO = runpy.run_path(str(ROOT / "listening-src/build.py"))
PART_TITLES = (
    "写真描写", "応答", "会話", "説明文", "短文穴埋め", "長文穴埋め", "読解",
)
PART_COUNTS = (3, 4, 5, 5, 4, 3, 5)
MANUSCRIPTS = ("listening12.txt", "listening34.txt", "reading.txt")


def authored_sets():
    current = None
    for name in MANUSCRIPTS:
        for text in (SOURCE / name).read_text(encoding="utf-8-sig").splitlines():
            if not text.strip():
                continue
            marker, payload = text[0], text[1:].strip()
            fields = [value.strip().replace(r"\n", "\n") for value in payload.split("|")]
            if marker == "@":
                if current is not None:
                    yield current
                slug, part, skill, setting, level = fields
                current = {"setId": slug, "part": int(part), "setting": setting,
                           "passages": [], "media": {}, "items": [{
                               "id": f"fs1-{slug}", "skill": skill, "difficulty": level, "choices": [],
                               "choiceExplanationsJa": {}, "translationJa": {"choices": {}},
                           }]}
                item = current["items"][0]
            elif marker == "*":
                ja, prompt = fields
                current["media"]["photo"] = {
                    "id": "photo", "src": f"study/r1/photos/{slug}.webp", "altJa": "練習用の写真",
                    "descriptionJa": ja, "prompt": prompt, "revision": 1,
                    "generator": "Codex ImageGen", "reviewer": "Codex",
                }
            elif marker == ":":
                speaker, body, ja = fields
                identifier = f"t{len(current['passages']) + 1}"
                turn = {"id": identifier, "text": body, "translationJa": ja, "type": "document"}
                if speaker != "text":
                    turn = AUDIO["speech"](speaker, identifier, body, ja, 420, "passage")
                current["passages"].append(turn)
            elif marker == "#":
                caption, ja = fields
                current["media"]["table"] = {
                    "id": "table", "caption": caption, "translationJa": ja, "rows": [],
                }
            elif marker == "=":
                rows = current["media"]["table"]["rows"]
                rows.append([
                    {"id": f"r{len(rows)}c{column}", "text": en.strip(), "translationJa": ja.strip()}
                    for column, (en, ja) in enumerate(
                        (cell.split("|") for cell in payload.split(";")), 1
                    )
                ])
            elif marker == "?":
                refs, stem, ja = fields
                item["stem"] = stem
                item["translationJa"]["stem"] = ja
                item["evidence"] = [{"refIds": refs.split(",")}]
            elif marker in "ABCD":
                option, ja, note = fields
                item["choices"].append({"id": marker, "text": option})
                item["translationJa"]["choices"][marker] = ja
                item["choiceExplanationsJa"][marker] = note
            elif marker == "!":
                item["answerId"] = payload
                item["explanationJa"] = item["choiceExplanationsJa"][payload]
                item["evidence"][0]["detailJa"] = item["explanationJa"]
            elif marker == "%":
                item["vocabulary"] = [
                    {"term": term, "meaningJa": ja}
                    for term, ja in (field.split("=", 1) for field in fields)
                ]
            else:
                raise ValueError(f"{name}: {text}")
    if current is not None:
        yield current


def compile_bank():
    parts = [{"part": number, "titleJa": title, "sets": []}
             for number, title in enumerate(PART_TITLES, 1)]
    for number, exercise in enumerate(authored_sets(), 1):
        part = exercise["part"]
        item = exercise["items"][0]
        item["number"] = number
        parts[part - 1]["sets"].append(exercise)
        if part <= 4:
            used = {turn["speakerId"] for turn in exercise["passages"]}
            narrator = next(key for key in ("b", "f", "g", "m") if AUDIO["VOICES"][key][0] not in used)
            turns = exercise["passages"][:]
            if part <= 2:
                for choice in item["choices"]:
                    letter = choice["id"]
                    turns.append(AUDIO["speech"](
                        narrator, f"choice-{letter}", f"Choice {letter}, {choice['text']}",
                        item["translationJa"]["choices"][letter], 640, "choice",
                    ))
            else:
                turns.append(AUDIO["speech"](
                    narrator, "question", item["stem"], item["translationJa"]["stem"], 450, "question",
                ))
            exercise["audioScript"] = turns
            exercise["media"]["audio"] = {"src": f"study/r1/audio/{exercise['setId']}.mp3"}
    bank = {"examId": "field-study-01", "revision": 1, "parts": parts}
    validate(bank)
    return bank


def validate(bank):
    slugs = set()
    for part, group in enumerate(bank["parts"], 1):
        assert group["part"] == part and len(group["sets"]) == PART_COUNTS[part - 1]
        skills = set()
        for exercise in group["sets"]:
            slug = exercise["setId"]
            assert slug.startswith(f"p{part}-") and slug not in slugs
            slugs.add(slug)
            item, = exercise["items"]
            assert item["skill"] and item["skill"] not in skills, slug
            skills.add(item["skill"])
            assert item["difficulty"] in {"easy", "medium", "hard"}, slug
            expected = list("ABC" if part == 2 else "ABCD")
            assert [choice["id"] for choice in item["choices"]] == expected, slug
            assert len({choice["text"] for choice in item["choices"] if choice["text"]}) == len(expected), slug
            assert item["answerId"] in expected and item["explanationJa"], slug
            for keyed_text in (item["translationJa"]["choices"], item["choiceExplanationsJa"]):
                assert set(keyed_text) == set(expected) and all(keyed_text.values()), slug
            assert bool(item["stem"]) == (part >= 3) and item["translationJa"]["stem"], slug
            assert item["vocabulary"] and all(all(v.values()) for v in item["vocabulary"]), slug
            passages = exercise["passages"]
            refs = {turn["id"] for turn in passages}
            for passage in passages:
                assert passage.get("text", passage.get("spokenText")) and passage["translationJa"], slug
            photo = exercise["media"].get("photo")
            assert bool(photo) == (part == 1), slug
            if photo:
                refs.add("photo")
            table = exercise["media"].get("table")
            if table:
                rows = table["rows"]
                assert len(rows) > 1 and len({len(row) for row in rows}) == 1, slug
                for cell in (cell for row in rows for cell in row):
                    assert cell["id"] not in refs and cell["text"] and cell["translationJa"], slug
                    refs.add(cell["id"])
            if part == 5:
                assert item["stem"].count("_____") == 1 and not passages, slug
                refs.add("stem")
            if part == 6:
                assert sum(passage["text"].count("_____") for passage in passages) == 1, slug
            for evidence in item["evidence"]:
                cited = evidence["refIds"]
                assert cited and set(cited) <= refs, (slug, cited, refs)
                if table:
                    assert any(ref.startswith("r") for ref in cited) and any(ref.startswith("t") for ref in cited), slug
                if item["skill"] == "複数文書照合":
                    assert len(passages) >= 2 and len(cited) >= 2, slug


def script_digest(exercise):
    source = json.dumps(exercise["audioScript"], ensure_ascii=False, sort_keys=True)
    return hashlib.sha256(source.encode("utf-8")).hexdigest()


def add_media(bank, model_dir):
    synthesize, provenance = AUDIO["load_synthesizer"](model_dir)
    bank["production"] = provenance
    rate = AUDIO["RATE"]
    masters = ROOT / ".listening-build/study"
    masters.mkdir(parents=True, exist_ok=True)
    release = read_release() if (DIST / BANK).is_file() else {}
    previous = {}
    if release.get("production") == provenance:
        previous = {exercise["setId"]: exercise["media"]["audio"]
                    for part in release["parts"][:4] for exercise in part["sets"]}
    for part in bank["parts"][:4]:
        for exercise in part["sets"]:
            slug = exercise["setId"]
            media = exercise["media"]
            if photo := media.get("photo"):
                photo["sha256"] = AUDIO["sha"](DIST / photo["src"])
            dest = DIST / media["audio"]["src"]
            master = masters / f"{slug}.wav"
            digest = script_digest(exercise)
            old = previous.get(slug, {})
            if (old.get("scriptSha256") == digest and dest.is_file() and master.is_file() and
                    AUDIO["sha"](dest) == old["sha256"] and AUDIO["sha"](master) == old["masterSha256"]):
                media["audio"] = old
                continue
            dest.parent.mkdir(parents=True, exist_ok=True)
            with wave.open(str(master), "wb") as output:
                output.setparams((1, 2, rate, 0, "NONE", "not compressed"))
                for turn in exercise["audioScript"]:
                    output.writeframesraw(synthesize(turn))
                duration = round(output.getnframes() * 1000 / rate)
            AUDIO["mp3"](master, dest)
            media["audio"].update(durationMs=duration, scriptSha256=digest,
                                  sha256=AUDIO["sha"](dest), masterSha256=AUDIO["sha"](master))
            print(f"{slug}: {duration / 1000:.1f} s", flush=True)


def encoded(bank):
    return PREFIX + json.dumps(bank, ensure_ascii=False, indent=2) + ";\n"


def read_release():
    rendered = (DIST / BANK).read_text(encoding="utf-8")
    return json.loads(rendered.removeprefix(PREFIX).strip().removesuffix(";"))


def check(bank):
    release = read_release()
    assert release["examId"] == bank["examId"] and release["revision"] == bank["revision"]
    audio_count = 0
    for authored_part, release_part in zip(bank["parts"], release["parts"], strict=True):
        for authored, exercise in zip(authored_part["sets"], release_part["sets"], strict=True):
            for prop in ("items", "passages", "setId", "part", "setting"):
                assert authored[prop] == exercise[prop], exercise["setId"]
            assert authored["media"].keys() == exercise["media"].keys(), exercise["setId"]
            for kind, media in exercise["media"].items():
                if kind == "table":
                    assert media == authored["media"]["table"]
                    continue
                assert media["src"] == authored["media"][kind]["src"]
                path = DIST / media["src"]
                assert 0 < path.stat().st_size < 25 * 1024 * 1024, path
                assert AUDIO["sha"](path) == media["sha256"], path
                if kind == "audio":
                    audio_count += 1
                    assert exercise["audioScript"] == authored["audioScript"]
                    assert media["scriptSha256"] == script_digest(exercise)
                    assert media["durationMs"] > 0
                if kind == "photo":
                    assert {key: media[key] for key in authored["media"][kind]} == authored["media"][kind]
    assert audio_count == sum(PART_COUNTS[:4])
    print(f"{sum(PART_COUNTS)} exercises in 7 Parts, {audio_count} recordings, 3 photographs.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--model-dir", type=Path)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    bank = compile_bank()
    if args.model_dir:
        add_media(bank, args.model_dir)
        (DIST / BANK).write_text(encoded(bank), encoding="utf-8", newline="\n")
    if args.check:
        check(bank)


if __name__ == "__main__":
    main()
