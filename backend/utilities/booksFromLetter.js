
export async function booksFromLetter(letter, browser, show = true) {
  const page = await browser.newPage()

  await page.goto(`https://www.elejandria.com/libros/${letter}`)

  await page.waitForSelector('.row')

  const books = await page.evaluate(() => {
    let data = []

    const elements = [
      ...document.querySelectorAll('div.col-lg-2.col-6.text-center')
    ]

    const titles = elements.map(
      (e) => e.childNodes[3].childNodes[1].childNodes[0].innerText
    )

    const authors = elements.map((e) => e.childNodes[3].childNodes[3].innerText)

    const imgs = elements.map((e) => e.childNodes[1].childNodes[0].src)

    const links = elements.map((e) => e.childNodes[1].href)

    elements.forEach((e, i) => {
      let temp = {
        tittle: titles[i],
        author: authors[i],
        img: imgs[i],
        link: links[i]
      }
      data.push(temp)
    })
    
    return data
  })

  if (show) {
    console.log(books)
  }

  await page.close()
  return books
}

