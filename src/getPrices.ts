import fetch from 'node-fetch'
import fs from 'fs'

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

async function getData(id: string): Promise<Data> {
  const response = await fetch(
    `https://steamcommunity.com/market/itemordershistogram?country=DE&language=german&currency=3&item_nameid=${id}&two_factor=0`
  )
  const data = (await response.json()) as Data
  return data
}

export function getPrices() {
  const rows = fs.readFileSync('./data-clean.csv', 'utf8').trim().split('\n')
  const table = rows.map((row) => row.split(';'))

  let index = 0
  const interval = setInterval(async () => {
    try {
      const row = table[index++]
      if (!row) throw Error(`No row found at index ${index}`)

      const id = row[0]
      if (!id) throw Error(`No id found at index ${index}`)

      const url = row[1]
      if (!url) throw Error(`No URL found at index ${index}`)

      const data = await getData(id)

      const line =
        `${id};${url};${data.highest_buy_order};${data.lowest_sell_order}`.replace(
          /\r?\n|\r/g,
          ''
        ) + '\n'

      console.log(line)

      fs.appendFile('./data-final.csv', line, 'utf-8', (error) => {
        if (error) throw error
      })
    } catch (error) {
      console.error(error)
    }
  }, 240000)
}
