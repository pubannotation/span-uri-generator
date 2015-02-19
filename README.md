[PubAnnotation](http://pubannotation.org/) 用のjQueryプラグインです。

例えば

http://pubannotation.org/docs/sourcedb/PubMed/sourceid/10022882/

に組み込みます。

選択範囲に応じて下記のようなリンクを作成します。

http://pubannotation.org/docs/sourcedb/PubMed/sourceid/10022882/spans/200-710

## 使い方
```js
$('.text').linkToSelectedSpan('.linkSpace')
```

- `.text`の文字列が選択されると`.linkSpace`にリンク文字列を書き込みます。
- 選択を解除してもリンクは消しません。

## 開発手順

### setup
```
npm install
```

### lint
```
npm run lint
```

### unit test
```
npm test
```

### build
```
npm run build
```

### integration test
```
npm open
```

#### 動作確認テスト項目
- 初期表示
    - `Select a part of text above to get its span-url.`
- 選択する
    - 左側に、選択範囲の「開始位置-終了位置」が表示される
    - 右側に、絶対パスのリンクが表示される
        - url/spans/1-10
        - urlが/で終わっていなかったら/が追加される
- 右から左で選択する
    - URLができる
- 全選択して、対象領域をクリック
    - URLが更新されない
- クエリパラメーター付きURL
    - クエリパラメーター`?hoge=aa&fugo=bbb`をつける
    - 選択する
    - `url/spans/1-10?hoge=aa&fugo=bbb`になる

### system test
- http://pubannotation.org/projects/genia-medco-coref/docs/sourcedb/PubMed/sourceid/10022882/spans/849-1028
    - 開発ツールで実行
        - jQuery.linkToSelectedSpan.js
        - $('.text').linkToSelectedSpan('.linkSpace')
    - 選択したリンクで正しく開けること
    - マークされた前後を選んで正しくひらけること
    - マークされたspan内を選んで正しくひらけること
