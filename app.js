import express from 'express'
import books from './db/books.json' assert {type: 'json'}
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.use((req, res, next) => {
    console.log(`\nMethod: ${req.method} at ${req.path}`)
  console.log('IP: ',req.ip)
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
  let autores = books.map(e => e.author)
  res.json(autores)
})

app.get('/api/titulos', (req, res) => {
  let titulos = books.map(e => e.tittle)
  res.json(titulos)
})

const PORT = env.process.PORT || 3000

app.listen(PORT, () => console.log(`Server on port: ${PORT}`))
