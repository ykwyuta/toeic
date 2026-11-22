# TOEIC L&R 模擬試験制作

Claude Code、Antigravity、Muse、Codexで共同執筆するための [執筆・検品ガイド](AGENTS.md) と、Cloudflare Pages向け静的サイトの試作です。試作はPart 5のオリジナル3問で、履歴の保存・移行を確認できます。

## 開発と公開

```sh
python3 -m http.server 8000 --directory dist
```

Cloudflareの Workers & Pages で **Pages** プロジェクトを作成し、Git連携で `ykwyuta/toeic` を選びます。フレームワークは None、ビルドコマンドは空欄、出力ディレクトリは `dist`、本番ブランチはリポジトリの既定ブランチを指定します。直接アップロードを選ぶ場合は `dist` を指定します。公開後は `pages.dev` で解答、再読込、別ブラウザへの履歴移行を確認します。[Cloudflare Pages Git連携](https://developers.cloudflare.com/pages/get-started/git-integration/) [Cloudflare Pages 制限](https://developers.cloudflare.com/pages/platform/limits/)

ブラウザ内の履歴はオリジン単位で保存されます。履歴のJSONをダウンロードし、別端末や公開ドメインへの切替後に読み込めます。同じ受験IDを重複登録せず、不正なデータは保存前に拒否します。サイトは履歴送信用のAPI、アカウント、分析タグを使用しません。

## フル模試への拡張

版付き問題データと事前生成した画像・音声を静的アセットとして配信します。200問セットを追加する段階では、受験中の回答と再開位置をIndexedDBに保存し、履歴書き出しには試験ID・版・受験ID・開始/終了時刻・回答・採点結果を含めます。JSONの版移行、新旧の試験版の共存、インポートの一括保存を検証します。

本番モードはリスニング約45分とリーディング75分の時間制御を持ち、解説・音声台本は提出後に表示します。リスニング素材は事前に読み込み、端末の音声再生に必要な最初の操作を案内します。静的公開では問題データを取得できるため、本番モードの解説制御は学習体験のためのものです。Pagesの1ファイル25 MiB制約に合わせ、長い音声は区間で分割します。[Cloudflare Pages 制限](https://developers.cloudflare.com/pages/platform/limits/)
