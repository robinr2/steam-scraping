import fetch from 'node-fetch'
import fs from 'fs'

async function getHTML(url: string) {
  const response = await fetch(url)
  const html = await response.text()
  return html
}

export function getIds() {
  const urls = fs.readFileSync('./urls.txt', 'utf8').split('\n')

  const regex = /Market_LoadOrderSpread\((.*?)\)/
  let index = urls.length - 1
  const interval = setInterval(async () => {
    if (index < 0) {
      clearInterval(interval)
      return
    }

    try {
      const url = urls[index--]
      if (!url) throw Error(`No URL found at index ${index}`)

      const html = await getHTML(url)
      const match = regex.exec(html)
      if (!match || !match[1]) throw Error(`No id found at index ${index}`)

      const id = match[1].trim()
      console.log({ id })

      const line = `${id};${url}`.replace(/\r?\n|\r/g, '') + '\n'

      fs.appendFile('./data1.csv', line, 'utf-8', (error) => {
        if (error) throw error
      })
    } catch (error) {
      console.error(error)
    }
  }, 15000)
}
