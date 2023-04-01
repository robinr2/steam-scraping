import fetch from 'node-fetch'
import fs from 'fs'

//https://steamcommunity.com/market/itemordershistogram?country=DE&language=german&currency=3&item_nameid=175880394&two_factor=0

type Data = {
  success: 1
  sell_order_table: string
  sell_order_summary: string
  buy_order_table: string
  buy_order_summary: string
  highest_buy_order: string
  lowest_sell_order: string
  buy_order_graph: (string | number)[]
  sell_order_graph: (string | number)[]
  graph_max_y: number
  graph_min_x: number
  graph_max_x: number
  price_prefix: string
  price_suffix: string
}

async function getHTML(url: string) {
  const response = await fetch(url)
  const html = await response.text()
  return html
}

async function getData(id: string): Promise<Data> {
  const response = await fetch(
    `https://steamcommunity.com/market/itemordershistogram?country=DE&language=german&currency=3&item_nameid=${id}&two_factor=0`
  )
  const data = (await response.json()) as Data
  return data
}

const urls = fs.readFileSync('./urls.txt', 'utf8').split('\n')

const regex = /Market_LoadOrderSpread\((.*?)\)/
let index = urls.length - 1
const urlInterval = setInterval(async () => {
  if (index < 0) {
    clearInterval(urlInterval)
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

    const row = `${id};${url}`.replace(/\r?\n|\r/g, '') + '\n'

    fs.appendFile('./data1.csv', row, 'utf-8', (error) => {
      if (error) throw error
    })

    // await new Promise((resolve) =>
    //   setTimeout(async () => {
    //     try {
    //       const data = await getData(id)
    //       if (!data || !data.success) throw Error(`Fetching data for ${id} failed.`)

    //       const row =
    //         `${id};${url};${data.highest_buy_order};${data.lowest_sell_order}`.replace(
    //           /\r?\n|\r/g,
    //           ''
    //         ) + '\n'

    //       fs.appendFile('./data.csv', row, 'utf-8', (error) => {
    //         if (error) throw error
    //       })

    //       console.log({ highest_buy_order: data.highest_buy_order })

    //       resolve('success')
    //     } catch (error) {
    //       console.error(error)
    //     }
    //   }, 7000)
    // )
  } catch (error) {
    console.error(error)
  }
}, 15000)
