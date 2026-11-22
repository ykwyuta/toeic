# リスニング模試制作記録

試験IDは `listening-01`、版は1です。担当はCodexです。非公式リスニング教材としてPart 1〜4を収録し、試験の構成はIIBCの公開形式を参照しました。[IIBC テストの形式と構成](https://www.iibc-global.org/toeic/test/lr/about/format.html)

| Part | 問題ID | 構成 |
| --- | --- | --- |
| 1 | l01-q001〜l01-q006 | 写真6枚。動作・状態・位置 |
| 2 | l01-q007〜l01-q031 | 応答25問。依頼、間接応答、時刻、数量、理由 |
| 3 | l01-q032〜l01-q070 | 会話13セット。3人会話3セット、図表3セット |
| 4 | l01-q071〜l01-q100 | トーク10セット。連絡、案内、広告、図表3セット |

図表と音声を照合して解く設問は7問です。難度は編集上の仮説です。各写真の生成指示、画像版、検品者、使用範囲は対応するセットの `media.photo` に記録しました。

## 編集と音声生成

`part*.txt` が原稿です。`@` がセットの開始、`:` が発話、`#` と `=` が表、`?` が設問、`+` と `-` が正答と誤答、`%` が単語・熟語です。本文、訳、個別解説を `|` で区切ります。ビルドで選択肢を固定順に並べ、本文のターンや表のセルを根拠IDに結び付けます。公開済み設問の意味を変える場合は、版と配信ディレクトリを更新します。

必要な実行環境はPython、FFmpeg、ffprobe、Hugging Face CLIです。音声はKokoro-82M v1.0のONNX版で合成しました。米語は `af_heart` と `am_michael`、英語は `bf_emma` と `bm_fable` です。モデルとボイスの固定リビジョン、SHA-256、エンジンの版、速度、発話間隔を問題データに記録しています。[Kokoroモデルカード](https://huggingface.co/hexgrad/Kokoro-82M) [使用したONNXリビジョン](https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX/tree/1939ad2a8e416c0acfeecc08a694d14ef25f2231) [ボイス一覧](https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md)

```powershell
python listening-src/build.py
hf download onnx-community/Kokoro-82M-v1.0-ONNX onnx/model_quantized.onnx voices/af_heart.bin voices/am_michael.bin voices/bf_emma.bin voices/bm_fable.bin --revision 1939ad2a8e416c0acfeecc08a694d14ef25f2231 --local-dir .listening-build/model
python -m pip install kokoro-onnx==0.5.0 onnxruntime==1.32.0 numpy==2.5.5 espeakng-loader==0.2.4 phonemizer-fork==3.3.2
python listening-src/build.py --model-dir .listening-build/model
python listening-src/verify.py --masters .listening-build
```

WAVマスターは `.listening-build`、配信用MP3は `dist/listening/r1/audio` に出力します。既存の問題データとWAVマスターがある場合、`--reuse-unchanged` を付けると同じ設定と台本の音声を再利用できます。配信にはMP3、WebP、JSON、HTML、CSS、JavaScriptを使用します。

モデルとボイスの配布元はApache-2.0、Kokoro ONNXはMIT、ONNX RuntimeはMITです。eSpeak NGとPhonemizerはGPL系の制作時依存関係です。[Kokoro ONNX](https://github.com/thewh1teagle/kokoro-onnx) [ONNX Runtime](https://github.com/microsoft/onnxruntime) [eSpeak NG](https://github.com/espeak-ng/espeak-ng) [Phonemizer fork](https://pypi.org/project/phonemizer-fork/3.3.2/)

## 検品

初稿を独立解答用の原稿に書き出し、正答・解説を伏せて100問を解き直しました。指摘を反映した最終原稿の正答も100問一致しました。文言を修正した設問と、選択肢を並べ替えたPart 2は再解答しました。Part 1の写真6枚は全選択肢と照合し、360ピクセル幅でも決め手が見えることを確認しました。

最終版は46分46秒です。通し音声と復習用の54区間を含む全配信素材でファイルとハッシュを照合しました。最も大きいファイルは18.73 MiBです。生成音声54区間の台本は音声認識で照合し、認識が飛んだ箇所は短い区間に分けて確認しました。幅390ピクセルのChromiumで、音声再生、セットの自動切替、100問の採点、復習用音声、再受験を確認しました。

米・英・加・豪の4地域アクセントを使ったフル模試向けのブラインド試聴と、2名での自然さ・明瞭さ・アクセント・話者識別の採用評価は今後の検品項目です。

## 第2回（listening-02）

試験IDは `listening-02`、版は1です。担当はClaude Code（初稿・音声生成）です。写真の画像生成を使わない回として、Part 2〜4の94問（第7問〜第100問）を収録しました。Part 1を含まないため、公式形式の100問構成とは異なります。

| Part | 問題ID | 構成 |
| --- | --- | --- |
| 2 | l02-q007〜l02-q031 | 応答25問。疑問詞、依頼・提案・申し出、付加疑問、否定疑問、二者択一、間接応答 |
| 3 | l02-q032〜l02-q070 | 会話13セット。3人会話3セット、図表3セット、発言意図3問 |
| 4 | l02-q071〜l02-q100 | トーク10セット。留守番電話、案内、放送、広告、社内連絡、図表3セット、発言意図2問 |

原稿は `l02/` にあり、書式は第1回と同じです。ビルドとモデル・ボイスの固定リビジョンも第1回と共通で、`--exam l02` を付けて実行します。WAVマスターは `.listening-build/l02` に出力します。

```powershell
python listening-src/build.py --exam l02
python listening-src/build.py --exam l02 --model-dir .listening-build/model
python listening-src/verify.py --exam l02 --masters .listening-build/l02
```

### 検品（2026年11月23日）

ビルド時の検査で、48セット・94問の連番、選択肢と正答ID、根拠の参照先（会話のターンと表のセル）、全選択肢の訳と解説、単語・熟語を確認しました。正答位置はPart 2がA・B・C各8〜9問、Part 3・4はA〜Dの差が1問以内です。

最終版は46分33秒、最も大きいファイルは通し音声の18.65 MiBです。モデルとボイスのSHA-256は第1回と一致しました。生成音声48区間をfaster-whisper（base.en）で台本と照合しました。差分は数字の表記、英米のつづり、短縮形の展開だけでした。区間s083は一括認識で前半が抜けたため、15秒ずつに分けて照合し、台本どおりに読み上げられていることを確認しました。ブラウザでは、第2回の再生開始、図表の表示、94問の採点、復習用音声、第1回との切替、幅375ピクセルでの表示を確認しました。

正答・解説を伏せた状態での独立解答（初稿とは別の文脈で解き直す工程）と、英文・解説のレビューはまだ行っていません。AGENTS.md の手順により、担当のClaude Codeが行います。
