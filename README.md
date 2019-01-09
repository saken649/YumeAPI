# yumegen

入力された文字列をゆめかわにして返すWebアプリ

形態素解析を用いて、アイドルタイムプリパラの主人公「夢川ゆい」の独特な喋り方を再現してみようとしてみた試みの一環です。  
[アイドルタイムプリパラ (あいどるたいむぷりぱら)とは【ピクシブ百科事典】](https://dic.pixiv.net/a/%E3%82%A2%E3%82%A4%E3%83%89%E3%83%AB%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%97%E3%83%AA%E3%83%91%E3%83%A9)  
[夢川ゆい (ゆめかわゆい)とは【ピクシブ百科事典】](https://dic.pixiv.net/a/%E5%A4%A2%E5%B7%9D%E3%82%86%E3%81%84)

cf. [形態素解析を用いて、夢川ゆいのユメ語録を再現してみる試み - Synthetic Station](https://syn-station.hatenablog.com/entry/2018/12/22/220050)

## App

https://yumegen.herokuapp.com/

### How To Use

ゆめかわにしたい文章を入力します。

```
夢川ゆいはかわいい → 夢川ゆいはユメかわいい
お兄ちゃんなんか大嫌い！ → お兄ちゃんなんかユメ大嫌い！
```

## yumegen-fe

- Nuxt.js
- Express
- MeCab

## yumegen-api

https://yumegen.herokuapp.com/api

```
$ curl -X POST \
  https://yumegen.herokuapp.com/api \
  -H 'Content-Type: application/json' \
  -d '{
    "text": "夢川ゆいはかわいい"
}'
```

Response

```
{
    "text":"夢川ゆいはユメかわいい"
}
```

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
