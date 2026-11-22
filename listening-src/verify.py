"""Verify a published listening exam and its referenced assets."""
import argparse
import hashlib
import json
import subprocess
from pathlib import Path

from build import EXAMS, add_audio_scripts, compile_exam, sha, validate


def check_asset(release, asset, masters):
    path = release / asset["src"]
    assert 0 < path.stat().st_size <= 25 * 1024 * 1024, path
    assert sha(path) == asset["sha256"], path
    if path.suffix == ".mp3":
        duration = subprocess.check_output([
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "default=nw=1:nk=1", str(path),
        ], text=True)
        assert abs(float(duration) * 1000 - asset["durationMs"]) < 100, path
        if masters:
            assert sha(masters / path.with_suffix(".wav").name) == asset["masterSha256"], path
    return path.stat().st_size


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--exam", choices=EXAMS, default="l01")
    parser.add_argument("--masters", type=Path)
    args = parser.parse_args()
    release = EXAMS[args.exam]["release"]
    exam = json.loads((release / "exam.json").read_text(encoding="utf-8"))
    script = add_audio_scripts(compile_exam(EXAMS[args.exam]))
    validate(exam)
    total = 0
    assets = [exam["media"]["audio"]]
    for group, compiled_group in zip(exam["parts"], script["parts"], strict=True):
        for entry, compiled in zip(group["sets"], compiled_group["sets"], strict=True):
            assert entry["items"] == compiled["items"]
            assert entry["passages"] == compiled["passages"]
            assert entry["audioScript"] == compiled["audioScript"]
            assert entry["media"].get("table") == compiled["media"].get("table")
            audio = entry["media"]["audio"]
            assert audio["startMs"] == total and audio["durationMs"] > 0
            total += audio["durationMs"]
            digest = hashlib.sha256(
                json.dumps(entry["audioScript"], ensure_ascii=False, sort_keys=True).encode("utf-8")
            ).hexdigest()
            assert audio["scriptSha256"] == digest
            assets.append(audio)
            if photo := entry["media"].get("photo"):
                assets.append(photo)
    assert total == exam["media"]["audio"]["durationMs"]
    largest = max(check_asset(release, asset, args.masters) for asset in assets)
    full_track = release / exam["media"]["audio"]["src"]
    subprocess.run(["ffmpeg", "-v", "error", "-xerror", "-i", str(full_track),
                    "-f", "null", "-"], check=True)
    items = sum(len(entry["items"]) for group in exam["parts"] for entry in group["sets"])
    sets = sum(len(group["sets"]) for group in exam["parts"])
    print(f"{exam['examId']}: {items} items, {sets} sets, {len(assets)} assets verified. "
          f"Exam duration {total / 1000:.2f} s. Largest asset {largest / 1048576:.2f} MiB.")


if __name__ == "__main__":
    main()
