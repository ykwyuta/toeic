"""Compile the bilingual listening manuscript and synthesize its release audio."""
import argparse
import hashlib
import importlib.metadata
import json
import random
import re
import subprocess
import wave
from collections import Counter
from pathlib import Path

SOURCE = Path(__file__).resolve().parent
ROOT = SOURCE.parent
PART_COUNTS = {1: 6, 2: 25, 3: 39, 4: 30}
SET_COUNTS = {1: 6, 2: 25, 3: 13, 4: 10}
EXAMS = {
    "l01": {
        "examId": "listening-01", "prefix": "l01", "seed": 4487, "source": SOURCE,
        "release": ROOT / "dist/listening/r1",
        "parts": {1: ("part1.txt",), 2: ("part2.txt",),
                  3: ("part3-a.txt", "part3-b.txt"), 4: ("part4-a.txt", "part4-b.txt")},
    },
    # The second exam has no photographs, so it starts at question 7 with Part 2.
    "l02": {
        "examId": "listening-02", "prefix": "l02", "seed": 9127, "source": SOURCE / "l02",
        "release": ROOT / "dist/listening/l02/r1",
        "parts": {2: ("part2.txt",), 3: ("part3-a.txt", "part3-b.txt"), 4: ("part4-a.txt", "part4-b.txt")},
    },
}
VOICES = {
    "f": ("af_heart", "en-US"),
    "m": ("am_michael", "en-US"),
    "g": ("bf_emma", "en-GB"),
    "b": ("bm_fable", "en-GB"),
}
INTRO = (
    "Part one. For each photograph, listen to four descriptions. Mark the letter of the description that fits the photograph best.",
    "Part two. You will hear a question or statement followed by three replies. Mark the letter of the most appropriate reply.",
    "Part three. Listen to each conversation. Answer the three questions that follow it. Use the table on screen when a question refers to one.",
    "Part four. Listen to each talk, then answer three questions about it. Refer to the table on screen when instructed.",
)
INTRO_JA = (
    "写真ごとに4つの描写を聞き、写真に最も合う描写を選んでください。",
    "質問や発言と3つの応答を聞き、最も適切な応答を選んでください。",
    "会話を聞き、続く3問に答えてください。表を参照する設問では画面の表を使ってください。",
    "トークを聞き、続く3問に答えてください。指示があれば画面の表を参照してください。",
)
SPEED = 0.97
RATE = 24000
MODEL_REVISION = "1939ad2a8e416c0acfeecc08a694d14ef25f2231"
PHOTO_PREFIX = "Use case: photorealistic-natural. Create one original landscape 3:2 editorial photograph for an English listening assessment. "
PHOTO_SUFFIX = " Neutral daylight and natural colors, with the key objects clearly visible even at phone size. No legible lettering, no logos, no watermarks, no borders."


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def speech(speaker, identifier, text, translation, pause, role):
    voice, locale = VOICES[speaker]
    return {
        "id": identifier, "type": role, "speakerId": voice, "locale": locale,
        "spokenText": text, "translationJa": translation, "pauseAfterMs": pause,
    }


def compile_exam(config):
    exam = {"examId": config["examId"], "revision": 1, "parts": []}
    for part, files in config["parts"].items():
        rng = random.Random(config["seed"] + part)
        n_choices = 3 if part == 2 else 4
        positions = [i % n_choices for i in range(PART_COUNTS[part])]
        while True:
            rng.shuffle(positions)
            if all(len(set(positions[i:i + 4])) > 1 for i in range(len(positions) - 3)):
                break
        sets = []
        items = []
        for filename in files:
            for line in (config["source"] / filename).read_text(encoding="utf-8").splitlines():
                if not line.strip():
                    continue
                marker, payload = line[0], line[1:].strip()
                fields = [value.strip() for value in payload.split("|")]
                if marker == "@":
                    first, topic = fields[:2]
                    num = int(first)
                    set_id = f"s{num:03}"
                    media = {"audio": {"src": f"audio/{set_id}.mp3"}}
                    current = {"setId": set_id, "part": part, "setting": topic,
                               "passages": [], "media": media, "items": []}
                    sets.append(current)
                    if part == 1:
                        skill, level, description, prompt = fields[2:]
                        media["photo"] = {
                            "id": "photo", "src": f"photos/q{num:03}.webp", "altJa": f"問題{num}の写真",
                            "descriptionJa": description, "revision": 1, "generator": "Codex ImageGen",
                            "prompt": PHOTO_PREFIX + prompt + PHOTO_SUFFIX, "reviewer": "Codex",
                        }
                        question = (num, skill, level, "photo", "", description)
                    if part == 2:
                        skill, level, stem, ja = fields[2:]
                        question = (num, skill, level, "t1", "", ja)
                        current["passages"].append(speech(
                            "fmbg"[(num - 7) % 4], "t1", stem, ja, 700, "prompt"
                        ))
                elif marker == ":":
                    speaker, body, ja = fields
                    identifier = f"t{len(current['passages']) + 1}"
                    current["passages"].append(speech(speaker, identifier, body, ja, 460, "passage"))
                elif marker == "#":
                    title, ja = fields
                    media["table"] = {"id": "table", "title": title, "translationJa": ja, "rows": []}
                elif marker == "=":
                    rows = media["table"]["rows"]
                    rows.append([
                        {"id": f"r{len(rows)}c{col}", "text": en.strip(), "translationJa": ja.strip()}
                        for col, (en, ja) in enumerate(
                            (cell.split("|") for cell in payload.split(";")), 1
                        )
                    ])
                elif marker == "?":
                    question = (int(fields[0]), *fields[1:])
                elif marker == "+":
                    choice_rows = [fields]
                elif marker == "-":
                    choice_rows.append(fields)
                elif marker == "%":
                    number, skill, level, sources, stem, ja = question
                    assert len(choice_rows) == n_choices, question
                    correct, *distractors = choice_rows
                    rng.shuffle(distractors)
                    placed = distractors[:]
                    position = positions[len(items)]
                    placed.insert(position, correct)
                    answer = "ABCD"[position]
                    options = dict(zip("ABCD", placed))
                    item = {
                        "id": f"{config['prefix']}-q{number:03}", "number": number, "stem": stem, "skill": skill,
                        "difficulty": level, "answerId": answer,
                        "choices": [{"id": k, "text": v[0]} for k, v in options.items()],
                        "evidence": [{"refIds": sources.split(","), "detailJa": correct[2]}],
                        "explanationJa": correct[2],
                        "translationJa": {"stem": ja, "choices": {k: v[1] for k, v in options.items()}},
                        "choiceExplanationsJa": {k: v[2] for k, v in options.items()},
                        "vocabulary": [
                            {"term": term, "meaningJa": meaning}
                            for term, meaning in (pair.split("=", 1) for pair in fields)
                        ],
                    }
                    current["items"].append(item)
                    items.append(item)
                else:
                    raise ValueError(f"{filename}: {line}")
        exam["parts"].append({"part": part, "sets": sets})
    validate(exam)
    return exam


def validate(exam):
    numbers = []
    for group in exam["parts"]:
        part = group["part"]
        sets = group["sets"]
        assert len(sets) == SET_COUNTS[part]
        choices = Counter()
        for entry in sets:
            refs = {turn["id"] for turn in entry["passages"]}
            assert len(refs) == len(entry["passages"])
            media = entry["media"]
            if "photo" in media:
                refs.add(media["photo"]["id"])
            if "table" in media:
                rows = media["table"]["rows"]
                assert len(rows) > 1 and len({len(row) for row in rows}) == 1
                for cell in (cell for row in rows for cell in row):
                    assert cell["translationJa"] and cell["text"] and cell["id"] not in refs
                    refs.add(cell["id"])
            assert len(entry["items"]) == (1 if part < 3 else 3)
            for item in entry["items"]:
                numbers.append(item["number"])
                expected = set("ABC" if part == 2 else "ABCD")
                assert {choice["id"] for choice in item["choices"]} == expected
                assert len({choice["text"] for choice in item["choices"]}) == len(expected)
                assert item["answerId"] in expected
                assert expected == item["choiceExplanationsJa"].keys()
                assert expected == item["translationJa"]["choices"].keys()
                assert all(item["choiceExplanationsJa"].values())
                assert all(item["translationJa"]["choices"].values())
                assert item["translationJa"]["stem"] and item["explanationJa"]
                assert item["skill"] and item["difficulty"] in {"easy", "medium", "hard"}
                assert item["vocabulary"] and all(all(v.values()) for v in item["vocabulary"])
                assert bool(item["stem"]) == (part >= 3)
                for evidence in item["evidence"]:
                    assert evidence["refIds"] and set(evidence["refIds"]) <= refs
                    assert evidence["detailJa"]
                    if item["stem"].startswith("Look at the table"):
                        assert any(ref.startswith("r") for ref in evidence["refIds"])
                        assert any(ref.startswith("t") for ref in evidence["refIds"])
                choices[item["answerId"]] += 1
            for turn in entry["passages"]:
                assert turn["translationJa"] and turn["spokenText"]
        assert sum(choices.values()) == PART_COUNTS[part]
        assert max(choices.values()) - min(choices.values()) <= 1
    assert numbers == list(range(numbers[0], 101)) and numbers[0] in (1, 7)


def add_audio_scripts(exam):
    for group in exam["parts"]:
        part = group["part"]
        for index, entry in enumerate(group["sets"]):
            narrator = "b" if part in (2, 4) else "g"
            body = entry["passages"]
            if part >= 3:
                used = {turn["speakerId"] for turn in body}
                narrator = next(key for key in ("b", "g", "f", "m") if VOICES[key][0] not in used)
            if part == 2 and body[0]["speakerId"] == VOICES[narrator][0]:
                narrator = "g"
            items = entry["items"]
            first, last = items[0]["number"], items[-1]["number"]
            label = f"Number {first}." if first == last else f"Questions {first} through {last}."
            turns = []
            if index == 0:
                instruction = speech(narrator, "intro", INTRO[part - 1], INTRO_JA[part - 1], 1900, "instruction")
                turns.append(instruction)
            turns.append(speech(narrator, "label", label, f"第{first}問" if first == last else f"第{first}問から第{last}問", 750, "label"))
            turns.extend(body)
            for item in items:
                if part <= 2:
                    for choice in item["choices"]:
                        cid = choice["id"]
                        wait = 640 if cid != item["choices"][-1]["id"] else 7300
                        turns.append(speech(narrator, f"option-{cid}",
                                            f"Choice {cid}, {choice['text']}", item["translationJa"]["choices"][cid],
                                            wait, "choice"))
                else:
                    stem = item["stem"].replace("“", '"').replace("”", '"')
                    turns.append(speech(narrator, f"question-{item['number']}", f"Number {item['number']}. {stem}",
                                        item["translationJa"]["stem"], 10900, "question"))
            entry["audioScript"] = turns
    return exam


def sha(path):
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def mp3(wav, output):
    subprocess.run([
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(wav),
        "-c:a", "libmp3lame", "-b:a", "56k", str(output),
    ], check=True)


def load_synthesizer(model_dir):
    import numpy as np
    import onnxruntime as ort
    from kokoro_onnx.tokenizer import Tokenizer

    model = model_dir / "onnx/model_quantized.onnx"
    voices = {voice: model_dir / f"voices/{voice}.bin" for voice, _ in VOICES.values()}
    styles = {name: np.fromfile(path, dtype="<f4").reshape(510, 1, 256)
              for name, path in voices.items()}
    options = ort.SessionOptions()
    options.intra_op_num_threads = 3
    session = ort.InferenceSession(str(model), options, providers=["CPUExecutionProvider"])
    tokenizer = Tokenizer()
    provenance = {
        "model": "onnx-community/Kokoro-82M-v1.0-ONNX",
        "revision": MODEL_REVISION,
        "modelSha256": sha(model),
        "voiceSha256": {name: sha(path) for name, path in voices.items()},
        "sampleRateHz": RATE, "speed": SPEED,
        "dependencies": {name: importlib.metadata.version(name) for name in
                         ("kokoro-onnx", "onnxruntime", "numpy", "espeakng-loader", "phonemizer-fork")},
        "ffmpeg": subprocess.check_output(["ffmpeg", "-version"], text=True, encoding="utf-8").splitlines()[0],
    }

    def synthesize(turn):
        audio = bytearray()
        # Sentence boundaries keep full announcements within the model's context limit.
        for sentence in re.split(r'(?<=[.!?])\s+(?=[\w"]{2,})', turn["spokenText"]):
            phonemes = tokenizer.phonemize(sentence, turn["locale"].lower())
            tokens = tokenizer.tokenize(phonemes)
            assert 0 < len(tokens) < 510, turn
            samples, = session.run(None, {
                "input_ids": np.array([[0, *tokens, 0]], dtype=np.int64),
                "style": styles[turn["speakerId"]][len(tokens)],
                "speed": np.array([SPEED], dtype=np.float32),
            })
            samples = samples.reshape(-1)
            assert np.isfinite(samples).all() and len(samples) > RATE / 5, turn
            rms = np.sqrt(np.mean(samples ** 2))
            assert rms > 0.001, turn
            gain = min(0.075 / rms, 0.92 / max(np.max(np.abs(samples)), 0.001), 3)
            audio.extend((samples * gain * 32767).astype("<i2").tobytes())
        audio.extend(bytes(round(RATE * turn["pauseAfterMs"] / 1000) * 2))
        return audio

    return synthesize, provenance


def render(exam, release, model_dir, masters, reuse_unchanged):
    masters.mkdir(parents=True, exist_ok=True)
    target = release / "audio"
    target.mkdir(parents=True, exist_ok=True)
    synthesize, provenance = load_synthesizer(model_dir)
    previous = {}
    if reuse_unchanged:
        published = json.loads((release / "exam.json").read_text(encoding="utf-8"))
        if published["media"]["production"] == provenance:
            previous = {entry["setId"]: entry["media"]["audio"]
                        for group in published["parts"] for entry in group["sets"]}
    played = 0
    with wave.open(str(masters / "exam.wav"), "wb") as full:
        full.setparams((1, 2, RATE, 0, "NONE", "not compressed"))
        for group in exam["parts"]:
            for entry in group["sets"]:
                name = entry["setId"]
                wav = masters / f"{name}.wav"
                output = target / f"{name}.mp3"
                audio = entry["media"]["audio"]
                audio["startMs"] = round(1000 * played / RATE)
                audio["scriptSha256"] = hashlib.sha256(
                    json.dumps(entry["audioScript"], ensure_ascii=False, sort_keys=True).encode("utf-8")
                ).hexdigest()
                old = previous.get(name, {})
                old_master = old.get("masterSha256")
                if (old.get("scriptSha256") == audio["scriptSha256"] and
                        wav.is_file() and sha(wav) == old_master):
                    with wave.open(str(wav), "rb") as master:
                        offset = master.getnframes()
                        while frames := master.readframes(10 * RATE):
                            full.writeframesraw(frames)
                    played += offset
                    audio["durationMs"] = round(1000 * played / RATE) - audio["startMs"]
                    audio["masterSha256"] = old_master
                    if not output.is_file() or sha(output) != old["sha256"]:
                        mp3(wav, output)
                    audio["sha256"] = sha(output)
                    print(f"{name}: reused", flush=True)
                    continue
                offset = 0
                with wave.open(str(wav), "wb") as master:
                    master.setparams((1, 2, RATE, 0, "NONE", "not compressed"))
                    for turn in entry["audioScript"]:
                        pcm = synthesize(turn)
                        master.writeframesraw(pcm)
                        full.writeframesraw(pcm)
                        offset += len(pcm) // 2
                played += offset
                audio["durationMs"] = round(1000 * played / RATE) - audio["startMs"]
                audio["masterSha256"] = sha(wav)
                mp3(wav, output)
                audio["sha256"] = sha(output)
                print(f"{name}: {audio['durationMs'] / 1000:.1f} s", flush=True)
    mp3(masters / "exam.wav", target / "exam.mp3")
    exam["media"] = {
        "audio": {
            "src": "audio/exam.mp3",
            "durationMs": round(1000 * played / RATE),
            "masterSha256": sha(masters / "exam.wav"),
            "sha256": sha(target / "exam.mp3"),
        },
        "production": provenance,
    }
    for entry in (entry for group in exam["parts"] for entry in group["sets"]):
        photo = entry["media"].get("photo")
        if photo:
            photo["sha256"] = sha(release / photo["src"])
    validate(exam)
    write_json(release / "exam.json", exam)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--model-dir", type=Path)
    parser.add_argument("--exam", choices=EXAMS, default="l01")
    parser.add_argument("--masters", type=Path,
                        help="WAV master directory (default: .listening-build, or .listening-build/<exam> after l01)")
    parser.add_argument("--reuse-unchanged", action="store_true")
    args = parser.parse_args()
    config = EXAMS[args.exam]
    masters = args.masters or ROOT / ".listening-build" / ("" if args.exam == "l01" else args.exam)
    exam = add_audio_scripts(compile_exam(config))
    if args.model_dir:
        render(exam, config["release"], args.model_dir, masters, args.reuse_unchanged)
    else:
        count = sum(len(entry["items"]) for group in exam["parts"] for entry in group["sets"])
        sets = sum(len(group["sets"]) for group in exam["parts"])
        print(f"{config['examId']} manuscript validated: {count} items, {sets} sets.")


if __name__ == "__main__":
    main()
