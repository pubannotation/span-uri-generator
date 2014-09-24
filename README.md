DBCLS向けです

http://pubannotation.org/docs/sourcedb/PubMed/sourceid/10022882/

に組み込みます。

選択範囲に応じて下記のようなリンクを作成します。

http://pubannotation.org/docs/sourcedb/PubMed/sourceid/10022882/spans/200-710

## 開発手順
テストしやすいように一部(pathJoin)をモジュールにわけています。

### lint
```
jshint */*.js
```

### unti test
```
jasmine-node test
```

### build
```
browserify src/linkToSelectedSpan.js -o jQuery.linkToSelectedSpan.js
```

### integration
```
opes sample.html
```

## 使い方
```js
$('.text').linkToSelectedSpan('.linkSpace')
```

- `.text`の文字列が選択されると`.linkSpace`に文字列を書き込みます。
- 選択を解除してもリンクは消しません。

## メモ
```html
<td class="linkSpace"></td>
```
