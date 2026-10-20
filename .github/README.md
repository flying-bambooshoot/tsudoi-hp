## 【環境構築】
### 1. node.jsのインストール
https://nodejs.org/ja/download
### 2. 以下コマンドでnodeとnpmがセットでインストールされていることを確認
`node -v`
`npm -v`
### 3. Gitをインストール（コマンドでのGit操作が不慣れな場合はTotoiseGitなどのGUIツールもインストール）
https://gitforwindows.org/
### 4. Visual Studio Codeなどのコードエディタをダウンロード
https://code.visualstudio.com/
### 5. PCを再起動
### 6. 任意のディレクトリに"tsudoi-hp"プロジェクトのリポジトリをクローンする
### 7. VSCodeで5でクローンしたプロジェクトを開く
`{リポジトリの保存場所}\tsudoi-hp`
### 8. VSCodeウィンドウのヘッダーメニューからTerminal>New Terminalをクリックしターミナルを開く
### 9. 以下コマンドでプロジェクトに必要なパッケージをダウンロード
`npm install`
### 10. 以下コマンドでプロジェクトを起動
`npm start`
### 11. 以下URLでプロジェクトがローカル起動したのを確認
http://localhost:3000/

## 【NEWSの管理画面（ブラウザで更新する）】
NEWSは、ブラウザの管理画面から追加・修正・削除できます（プログラムの知識は不要です）。

管理画面: https://tsudoi-shamisen.com/admin/

### 使えるようにする（最初の1回だけ）
1. GitHubのアカウントを作り、オーナーに伝えます。オーナーが本家のリポジトリにメンバーとして招待します（Settings > Collaborators で Write 権限）。届いた招待メールの「Accept invitation」を押します
2. GitHubにログインしたブラウザで、次のURLを**ふつうのタブで**開き、「Authorize」を押します（その後の真っ白なページは閉じて大丈夫です）。管理画面のログインで出る小さなウィンドウでは「Authorize」が押せないため、最初の1回だけこの手順が必要です
   https://tsudoi-cms-auth.k-f-3213.workers.dev/auth?provider=github&site_id=tsudoi-shamisen.com&scope=public_repo,user
3. 管理画面を開き、「GitHubにログイン」を押します

### 記事を追加する
1. 「新規作成」を押し、日本語のタイトル・日付・本文を入れます（必須はこの3つ）。リンク・地図・写真は必要なときだけ入れます
2. 英語・中国語の訳は、右側のタブ（英語・中国語）で入れます。空欄のままでも保存でき、空欄の項目は日本語で表示されます
   - 訳は自動では作られません。ChatGPTなどのAIに日本語の文を訳してもらい、各言語の欄に貼り付けてください（例：「次の文を、英語・中国語（繁体字）・中国語（簡体字）に訳してください」）
   - 中国語は繁体字（台湾・香港向け）と簡体字（中国本土向け）の2つがあります
3. 「保存」を押すと、2〜3分で本番のサイトに表示されます
4. 記事ごとに専用のページができます（例：`https://tsudoi-shamisen.com/news/2026-10-06`。最後の部分は記事のファイル名＝日付）。NEWS一覧やTOPの記事のタイトルを押すと開けます。SNSで共有するときはこのURLを使うと、記事のタイトルと写真がカードに表示されます

- 写真はスマホの写真をそのまま入れて大丈夫です（自動で縮小・WebP形式に変換されます）
- リンク・地図の見出し（例：◆公式サイト◆）の次の行に、URLが表示されます
- **日本語を直したときは、英語・中国語の欄も直してください。** 訳がある記事は、日本語だけ直しても英語・中国語のページには直す前の訳が表示されたままになります（日付・リンクのURL・地図のURL・写真は、日本語の欄だけ直せば全言語に反映されます）
- 記事を削除しても写真は残ります。不要な写真は、管理画面の左上の画像のアイコン（アセット）から削除できます

### 仕組み（開発者向け）
- 管理画面は Sveltia CMS（`public/admin/`）。保存すると本家の master にコミットされ、GitHub Actions が本番に公開します
- 「GitHubでログイン」は、ujiのCloudflareアカウントのWorker「tsudoi-cms-auth」（Sveltia CMS Authenticator）と、ujiのGitHubアカウントのOAuth App「集-tsudoi- NEWS 管理画面」で動いています

## 【NEWSに表示するデータを追加する（ファイルを直接編集する場合）】
NEWSは1記事につき1ファイルで、"tsudoi-hp\src\content\news"フォルダに置きます。
ファイル名は記事の日付にします（例：`2026-10-06.json`）。同じ日付の記事が2つある場合は`2026-10-06-1.json`のようにします（後から追加した記事が上に表示されます）。
フォルダにファイルを追加するだけで、NEWSの一覧（新しい順）とTOPページに表示されます。

ファイルの中身の例：
```json
{
  "ja": {
    "title": "記事のタイトル",
    "date": "2026-10-06",
    "contents": "本文",
    "linkTitle": "◆公式サイト◆\n",
    "link": "https://example.com/",
    "map_title": "◆会場地図◆\n",
    "map_link": "https://www.google.com/maps/...",
    "img": "/img/2027_narita.webp"
  },
  "en": { "title": "Title", "contents": "Text", "linkTitle": "◆Official site◆\n", "map_title": "◆Venue Map◆\n" },
  "zh-Hant": { "title": "標題", "contents": "內文" },
  "zh-Hans": { "title": "标题", "contents": "正文" }
}
```
- "date"は`年-月-日`の形で書きます（画面には`2026.10.6`の形で表示されます）
- "date"・"link"・"map_link"・"img"は、日本語（"ja"）にだけ書けば、すべての言語で使われます
- リンク・地図・写真がない記事は、その項目を書かなくて大丈夫です
- 文章の中で改行したい場所には"\n"を入れてください
- 写真は"tsudoi-hp\public\img"フォルダに置き、"img"に`"/img/ファイル名"`の形で指定します。JPEG のままでも表示できますが、WebP 形式（横幅 900px 程度）にすると、ページの表示が速くなります

### 翻訳について（英語・中国語ページ）
"en"・"zh-Hant"・"zh-Hans"は省略できます。翻訳がない記事・項目は、英語・中国語のページでも日本語のまま表示されます。

NEWS以外の文章（紹介文・料金など）は"tsudoi-hp\src\locales"フォルダの各言語のファイルにあります。

## 【修正内容を公開する】
1. 最新の状態を取り込む（`git pull`）。NEWSの管理画面で保存した記事も master に直接コミットされるため、作業の前に必ず取り込んでください
2. ソースコード修正
3. コミット＆プッシュ（masterブランチ）

※pushすると GitHub Actions が自動でビルドとデプロイを行います。
　手動でのビルドは不要です。
　ビルドに使う Node のバージョンは ".github/workflows/deploy.yml" で指定しています（22.21.0）。

### デプロイ状況の確認
リポジトリの「Actions」タブから実行結果を確認できます。
緑のチェックがつけば公開完了です（2〜3分程度かかります）。
赤い×がついた場合はビルドに失敗しているので、クリックしてログを確認してください。
警告（使っていない変数など）が1つでもあるとビルドは失敗します。

### 注意
- 独自ドメインの設定は、リポジトリの Settings > Pages にある「Custom domain」欄で管理されています。
　GitHub Actions からデプロイする場合、"public/CNAME" ファイルは参照されません。
- ビルドに失敗した場合、公開中のサイトはそのまま維持されます（古い状態のまま残ります）。

-------------------------------------------------------------------------------------------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
