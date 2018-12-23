const express = require('express')
const app = express.Router()

// yume api
const MeCab = new require('mecab-async')
  , mecab = new MeCab()
;

// mecab path
if (process.env.NODE_ENV === 'production') {
  mecab.command = 'mecab -d /usr/lib64/mecab/dic/mecab-ipadic-neologd'
} else {
  // local
  mecab.command = 'mecab -d /usr/local/lib/mecab/dic/mecab-ipadic-neologd'
}
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