import puppeteer from 'puppeteer'
import { writeFile } from 'fs'
import { booksFromLetter } from './booksFromLetter.js'

const letters = [...'ABCDEFGHIJKLNOPRSTUVWYZ'.toLowerCase()]

;(async function updateBooks() {
  let books = []

  const browser = await puppeteer.launch({ headless: true })

  for (let i = 0; i < letters.length; i++) {
    let temp = await booksFromLetter(letters[i], browser, false)
    books.push(temp)
  }

  books = books.flat()

  await browser.close()

  const content = JSON.stringify(books, null, 2)

  writeFile('./db/books.json', content, (err) => {
    if (err) {
      console.error(err)
    }
    console.log(`${books.length} books have been saved`)
  })
})()
