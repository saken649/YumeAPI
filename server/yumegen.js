const express = require('express')
const app = express.Router()
const fs = require('fs')

// yume api
const MeCab = new require('mecab-async')
  , mecab = new MeCab()
;

// mecab path
let mecabBase = 'mecab -d '
let mecabPath = ''
const mecabLib64 = '/usr/lib64/mecab/dic/mecab-ipadic-neologd'
if (process.env.MECAB !== undefined) {
  mecabPath = process.env.MECAB
} else {
  try {
    fs.statSync(mecabLib64)
    mecabPath = mecabLib64
  } catch (e) {
    if (e.code === 'ENOENT') {
      mecabPath = '/usr/local/lib/mecab/dic/mecab-ipadic-neologd'
    }
  }
}
mecab.command = `${mecabBase}${mecabPath}`
console.log(mecab.command)

const bodyParser = require('body-parser')
const Enumerable = require('linq')

// yume convert target
const targetTypes = ['形容動詞語幹', '動詞', '形容詞', '副詞']

// init
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', (req, res) => {
  const body = req.body

  // check "text" exists
  if (body.text === undefined) {
    res.status(500).send({ msg: "'text' param is required"})
    return
  }

  // mecab process
  mecab.parse(body.text, (err, parsedList) => {
    try {
      if (err) throw err

      // yume hantei
      console.log(parsedList)
      const yumed = Enumerable.from(parsedList)
                              .select(parsed => {
                                const res = Enumerable.from(targetTypes)
                                                      .any(type => type === parsed[1] || type === parsed[2])
                                if (res) {
                                  parsed[0] = 'ユメ' + parsed[0]
                                }
                                return parsed[0]
                              })
                              .toArray()
                              .join('')
      res.send({ text: yumed })
    } catch (e) {
      res.status(500).send({ msg: 'text processing error'})
    }
  })
})

module.exports = app