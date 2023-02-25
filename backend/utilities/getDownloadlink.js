
export default async function getDownloadlink(link, browser) {
  const page = await browser.newPage()

  await page.goto(link)
  try {
    await page.waitForSelector('.download-link')
    const epubLink = await page.evaluate(
      () =>
        document.querySelectorAll('a.btn.btn-info.mt-3.download-link.col')[1]
          .href
    )

    await page.goto(epubLink)
    await page.waitForSelector('.download-link')
    const downloadLink = page.evaluate(
      () =>
        document.querySelector('a.btn.btn-info.offset-top.btn-lg.download-link')
          .href
    )

    browser.close()
    return downloadLink
  } catch {
    return null
  }
}
