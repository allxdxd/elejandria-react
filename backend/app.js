import express from 'express'
import books from './db/books.json' assert { type: 'json' }
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.use((req, res, next) => {
  console.log(`\nMethod: ${req.method} at ${req.path}`)
  console.log('IP: ', req.ip)
  console.log('-----------------')
  next()
})

app.get('/', (req, res) => {
  res.send('<h1>Hi word</h1>')
})

app.get('/api/libros', (req, res) => {
  res.json(books)
})

app.get('/api/autores', (req, res) => {
  let autores = books.map((e) => e.author)
  res.json(autores)
})

app.get('/api/titulos', (req, res) => {
  let titulos = books.map((e) => e.tittle)
  res.json(titulos)
})

app.get('/api/buscar/:texto', (req, res) => {
  let text = req.params.texto.toUpperCase()
  let searchtitle = books.filter(e=>{
    return  e.tittle.slice(0,text.length) == text
  })
  let searchauthor = books.filter(e=>{
    return  e.author.slice(0,text.length) == text
  })

  // res.json([...new Set([...searchauthor, searchtitle])])
  res.json([...searchauthor, searchtitle])
})

app.get('/api/libros-aleatorios/:n', (req, res) => {
  let n = req.params.n
  let arrayOfIndexs = []
  for (let i = 0; i < n; i++) {
    arrayOfIndexs.push(Math.floor(Math.random() * books.length))
  }
  let randomBooks = arrayOfIndexs.map(i => books[i])
  res.json(randomBooks)
})

const PORT = 3000

app.listen(PORT, () => console.log(`Server on port: ${PORT}`))
