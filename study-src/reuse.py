"""Select published questions and adapt their format to one-question drills."""
from collections import Counter
from copy import deepcopy
import json
import random
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCES = {
    "l01": ("dist/listening/r1/exam.json",),
    "l02": ("dist/listening/l02/r1/exam.json",),
    "p56": ("dist/reading-part56/r1/exam.json",),
    "m01": tuple(f"content/mock-01/part7-{name}.json" for name in ("single-1", "single-2", "multi")),
}
# Japanese translations of the sentence insertions stored as markers in the Part 6 documents.
P6_INSERTIONS_JA = {
    122: "メールに直接送信できる両面スキャンにも対応しています。",
    126: "この5日間は店内での買い物ができません。",
    130: "受付を早く済ませるため、顔写真付き身分証をお持ちください。",
    134: "鍵の利用料は無料ですが、10ドルの預り金が必要です。",
    138: "下記の追跡リンクから最新の配送状況を確認できます。",
    142: "10月12日に指導担当者向けの短い研修を行います。",
    146: "最後の1時間は、5ドルで袋いっぱいに詰められます。",
    151: "現在、当社は有効な利用者ライセンス25件分の料金を支払っています。",
    154: "前シーズンのアンケートを受け、毎日焼きたてのパンを用意するようにしました。",
    158: "質疑応答での皆さまの質問から、実りある議論が生まれました。",
    162: "この5時間は冷却システムを停止します。",
    166: "毎月の未使用分を翌月へ繰り越すことはできません。",
    170: "駐車場は水曜日の午前6時に再開する予定です。",
    174: "スタッフが協力して働く自然な姿を写した写真も何枚か掲載したいと考えています。",
    178: "さらに、昨年は持ち帰り用の包装材をすべて生分解性の素材に切り替えました。",
    182: "図書館カードと充電済みの端末をお持ちください。",
    186: "午後の棚卸し中は新たな納品を受け付けません。",
    190: "この上位会員資格は来年の12月末まで有効です。",
    194: "各バスに無料Wi-FiとUSB充電端子が備わっています。",
    198: "無料駐車場は会場の隣にあります。",
}
P6_DISTRACTORS = {
    121: ("contain は「含む」です。機器が従来機より少ない電力で動くことを表す動詞が必要です。",
          "convince は人などを「納得させる」です。ここで目的語になっているのは消費する energy です。",
          "collect は「集める」です。印刷速度と並べているのは機器の性能で、電力を集めることではありません。"),
    122: ("食堂のメニュー変更では、直前の新型複合機の利点に続く説明になりません。",
          "来客用名札の返却先の指示です。ここでは従業員に新機種の機能と設置時の印刷先を知らせています。",
          "雨天による行楽の延期です。複合機の設置時期や使い方にはつながりません。"),
    126: ("税務セミナーへの出席は、改装中に客が店を利用できるかという話になりません。",
          "日曜の駐車料の説明では、後続の「ただしオンライン店は営業を続ける」と対比できません。",
          "パンの日々の販売予定です。食器売り場の改装中に影響する販売方法を示していません。"),
    128: ("at は at a discount のように価格水準を表せますが、割引対象の商品を discounts の後ろで指定する形ではありません。",
          "by は by April 8 のように期限を示せます。all kitchenware は期限ではなく割引の対象です。",
          "into は何かの内部へ向かう動きを表します。食器類は移動先ではなく値引き対象です。"),
    130: ("プールの閉館時刻は、8時からの研修受付で参加者が準備するものにはつながりません。",
          "デザイナーの採用報告では、名札や日程を受け取る当日の受付案内になりません。",
          "橋の工事の終了時期です。直前の名札受け取りや、受付を進めるための指示とは関係しません。"),
    133: ("install は原形です。設置されたのは駐輪ラックなので、has been の後ろには受動態の過去分詞が必要です。",
          "installing を使うと主語が設置作業をする現在完了進行形になります。駐輪ラックは設置される対象です。",
          "installation は「設置」という名詞です。has been の後ろでラックが設置済みであることを表せません。"),
    134: ("エレベーターの点検予定です。直前に申し込み方を示した駐輪場の鍵について、受け取り条件を続ける位置です。",
          "郵便の配達時刻です。入居者が求める鍵の貸し出し条件を補足していません。",
          "退室時の消灯指示です。自転車を置ける場所と鍵の取り扱いについての案内につながりません。"),
    142: ("食堂の料理の変更です。配属された相手と定期面談する指導役への準備を説明していません。",
          "机の引き出しの施錠案内です。指導役の面談日程と、制度の効果を説明する文の間には入りません。",
          "ロンドン支店の移転報告です。開始予定の指導制度を具体化する内容ではありません。"),
    146: ("図書館カードの更新条件です。直前の古本の値段や直後の売上金の用途に結び付きません。",
          "屋根の修理をいつ終えたかという報告です。古本販売の時間や価格を補足していません。",
          "自習室の位置です。ここは販売する本の価格から、販売収益に話を移す箇所です。"),
    148: ("they は主語として使う形です。ここでは own reusable shopping bags の所有者を表します。",
          "them は目的格で、bring them なら使えます。own が付いたバッグを修飾する所有格が必要です。",
          "theirs は所有代名詞で、それだけで「彼らのもの」を表します。後ろにバッグを続ける位置では使いません。"),
    151: ("空調が直った時期です。ソフトの利用人数に応じて契約規模を見直す話にはつながりません。",
          "新任受付係を迎える依頼です。更新を検討している既存ライセンスの情報を示していません。",
          "駐車許可証の期限です。支払いを見直す対象は利用人数に応じたソフトの契約です。"),
    152: ("lately は「最近」です。既に起きたことの時期を述べる語で、than の後ろの提出期限を示せません。",
          "latest は最上級です。at the latest とは言えますが、no ___ than の比較構文には入りません。",
          "late は原級です。than に続く時刻を比較対象にするときは比較級 later が必要です。"),
    156: ("vehicle は「車両」です。昼食として使える抽選の賞品を表しません。",
          "volume は「容量」や「巻」です。free lunch の費用に使える証書という意味がありません。",
          "venture は「事業」です。アンケート回答者に当たる食事の引換券を指しません。"),
    162: ("休暇の申請方法です。点検中の時刻と、暖かい室内に合わせた服装の指示をつなげません。",
          "食堂の新メニューです。直後に室温が上がるとされる理由を説明していません。",
          "休日のソフトボールの予定です。平日の設備点検中、冷房が止まることを説明する位置です。"),
    163: ("appropriate は形容詞です。clothing のような名詞には使えますが、ここでは dress という動作を修飾します。",
          "appropriateness は「適切さ」という名詞で、dress の動作がどう行われるかは表せません。",
          "appropriated は「流用された」などの過去分詞です。ここでは暖かめの室温に合わせた服装をする指示です。"),
    168: ("among は「複数の物の間に」です。職場の内部と対にするのは外部で、集団の中を示す語ではありません。",
          "until は終了時点の「～まで」です。the workplace は時刻ではなく場所です。",
          "during は期間中を示します。文は支援期間ではなく職場の内外を対にしています。"),
    176: ("hear は動詞の原形です。look forward to の to は前置詞で、動詞なら -ing 形が続きます。",
          "heard は hear の過去形・過去分詞です。look forward to の後ろには今後期待する行動の動名詞が必要です。",
          "hears は三人称単数現在形です。この空所は独立した文の述語ではなく前置詞 to の目的語です。"),
    188: ("prompt は「迅速な」という形容詞です。空所は名詞ではなく、報告する動作 report を修飾します。",
          "promptness は「迅速さ」という名詞です。前置詞を伴わずに報告の仕方を表す位置には入りません。",
          "prompted は「促した」などの過去形・過去分詞です。ここでは報告の速さが問われ、促された人は出てきません。"),
    190: ("プールの階数です。上位会員資格への移行と、直後の会員特典の説明の間には、その資格の有効期間が入ります。",
          "診療所での携帯電話の扱いです。ホテル会員資格や会員特典の説明にはつながりません。",
          "ホームセンターの春のセール案内です。ホテルの新しい会員資格の条件を補足する文ではありません。"),
    192: ("near は「近い」です。会員特典を使い始められるのは、距離が近い滞在ではなく次回の滞在です。",
          "narrow は幅の狭さを表します。宿泊する順番を表せません。",
          "neat は「整った」を表します。会員資格の発効後、いつ特典が使えるかという説明に合いません。"),
    195: ("packed は「梱包された」です。ウェブサイトと主要駅で時刻表や地図を見られることを表せません。",
          "painted は「塗装された」です。ウェブサイトに情報を掲載し駅に掲示することには使いません。",
          "poured は液体などが「注がれた」です。時刻表や地図を案内する動作ではありません。"),
    197: ("they は「彼らは」という主格です。family members and guests を修飾する所有格は their です。",
          "them は「彼らを」という目的格です。連れてくる家族・ゲストが従業員の関係者であることを示せません。",
          "theirs は「彼らのもの」という所有代名詞です。family members の前に置いて修飾しません。"),
}


def source_index(paths):
    index = {}
    for path in paths:
        document = json.loads((ROOT / path).read_text(encoding="utf-8-sig"))
        for part in document.get("parts", [document]):
            for exercise in part["sets"]:
                for item in exercise["items"]:
                    assert item["number"] not in index
                    index[item["number"]] = (exercise, item)
    return index


def answer_text(item):
    return next(choice["text"] for choice in item["choices"] if choice["id"] == item["answerId"])


def complete_part6(exercise, item):
    passage, = deepcopy(exercise["passages"])
    answers = {re.search(r"\[\d+\]", q["stem"])[0]: q for q in exercise["items"]}
    target = re.search(r"\[\d+\]", item["stem"])[0]
    text = passage["text"]
    japanese = passage["translationJa"]
    for marker, question in answers.items():
        answer = answer_text(question)
        # Whole sentences in the source have punctuation after their placeholders.
        token = marker + "." if answer.endswith(".") and marker + "." in text else marker
        text = text.replace(token, "_____" if marker == target else answer)
        if marker in japanese and question["skill"] == "文挿入":
            translated = P6_INSERTIONS_JA[question["number"]]
            token_ja = marker + "。" if marker + "。" in japanese else marker
            japanese = japanese.replace(token_ja, translated)
    passage.update(text=text, translationJa=japanese)
    return [passage]


def document_text(document):
    english, japanese = [], []
    title = document.get("title")
    if title:
        english.append(title)
        japanese.append(document.get("titleTranslationJa") or title)
    if header := document.get("header"):
        english.extend(f"{key.title()}: {value}" for key, value in header.items())
        japanese.append(document.get("headerTranslationJa") or " / ".join(header.values()))
    if table := document.get("table"):
        english.append("  ·  ".join(table["columns"]))
        japanese.append("  ·  ".join(table["columnsJa"]))
    anchors = []
    for segment in document["segments"]:
        anchors.append(segment["id"])
        if "cells" in segment:
            english.append("  ·  ".join(segment["cells"]))
            japanese.append(segment["translationJa"])
            continue
        prefix = " ".join(value for key in ("time", "speaker") if (value := segment.get(key)))
        english.append((prefix + " — " if prefix else "") + segment["text"])
        japanese.append((prefix + " — " if prefix else "") + segment["translationJa"])
    return {
        "id": document["id"], "type": "document", "anchors": anchors,
        "text": "\n".join(english), "translationJa": "\n".join(japanese),
    }


def shuffle_choices(item, slug, position):
    correct = next(choice for choice in item["choices"] if choice["id"] == item["answerId"])
    arranged = [choice for choice in item["choices"] if choice is not correct]
    random.Random(slug).shuffle(arranged)
    arranged.insert(position, correct)
    letters = dict(zip((choice["id"] for choice in arranged), "ABCD"))
    item["choices"] = [{**choice, "id": letters[choice["id"]]} for choice in arranged]
    item["answerId"] = letters[item["answerId"]]
    item["choiceExplanationsJa"] = {letters[key]: text for key, text in item["choiceExplanationsJa"].items()}
    if "choices" in item["translationJa"]:
        item["translationJa"]["choices"] = {
            letters[key]: text for key, text in item["translationJa"]["choices"].items()
        }


def balance_reading_choices(parts):
    for group in parts[4:]:
        entries = group["sets"]
        movable = [entry for entry in entries if "source" in entry and
                   not (group["part"] == 7 and entry["items"][0]["skill"] == "文挿入")]
        moving_ids = {entry["setId"] for entry in movable}
        fixed = Counter(entry["items"][0]["answerId"] for entry in entries
                        if entry["setId"] not in moving_ids)
        # Keep authored and legacy letters, and keep reading insertion markers in order.
        positions = []
        for _ in movable:
            letter = min("ABCD", key=lambda key: (fixed[key], key))
            fixed[letter] += 1
            positions.append("ABCD".index(letter))
        random.Random(409 + group["part"]).shuffle(positions)
        for entry, position in zip(movable, positions, strict=True):
            shuffle_choices(entry["items"][0], entry["setId"], position)


def add_reused(anchors):
    catalog = json.loads(Path(__file__).with_name("reuse.json").read_text(encoding="utf-8"))
    sources = {key: source_index(paths) for key, paths in SOURCES.items()}
    for anchor, selections in catalog.items():
        for source, numbers in selections.items():
            for number in numbers:
                origin, question = sources[source][number]
                part = origin["part"]
                slug = f"{anchor}-{source}-{number:03d}"
                media = deepcopy(origin["media"]) if isinstance(origin["media"], dict) else {}
                media.pop("audio", None)
                if photo := media.get("photo"):
                    photo["src"] = "listening/r1/" + photo["src"]
                if table := media.get("table"):
                    table["caption"] = table.pop("title")
                    if not any(ref.startswith("r") for evidence in question["evidence"] for ref in evidence["refIds"]):
                        media.pop("table")
                passages = deepcopy(origin["passages"])
                item = deepcopy(question)
                item["id"] = "fs2-" + slug
                item["skill"] = anchors[anchor]
                translation = item["translationJa"]
                if "stem" not in translation:
                    translation["stem"] = translation["text"]
                if part == 6:
                    passages = complete_part6(origin, question)
                    wrong_ids = [choice["id"] for choice in question["choices"]
                                 if choice["id"] != question["answerId"]]
                    item["choiceExplanationsJa"].update(zip(wrong_ids, P6_DISTRACTORS[number], strict=True))
                    item["stem"] = ("Which sentence best completes the text?" if item["skill"] == "文挿入"
                                    else "Which word or phrase best completes the text?")
                    translation["stem"] = ("文書の空所に最もよく入る文はどれですか。" if item["skill"] == "文挿入"
                                           else "文書の空所に最もよく入る語句はどれですか。")
                if part == 7:
                    passages = [document_text(document) for document in passages]
                item["evidence"] = [
                    {"refIds": evidence.get("refIds") or [
                        "stem" if part == 5 else (evidence.get("refId") or evidence["ref"])
                    ], "detailJa": evidence.get("detailJa") or evidence.get("noteJa") or evidence["keyPoint"]}
                    for evidence in question["evidence"]
                ]
                yield {
                    "setId": slug, "part": part, "setting": origin.get("setting") or origin["titleJa"],
                    "passages": passages, "media": media, "items": [item],
                    "source": {"bank": source, "itemId": question["id"], "setId": origin["setId"]},
                }
