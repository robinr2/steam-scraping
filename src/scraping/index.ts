import fetch from 'node-fetch'
import PocketBase from 'pocketbase'
import {
  ORDER_EXTRACTION_PATTERN,
  REQUEST_DELAY,
  calculateMargin,
  getItemOrderHistogramOptions,
  getItemOrderHistogramUrl,
} from './helper.js'
import { Item, ItemOrderHistogramData } from '../shared/types.js'

async function main() {
  const pb = new PocketBase('http://127.0.0.1:8090')
  let items = await pb.collection('items').getFullList<Item>()
  let index = 0

  setInterval(async () => {
    if (index > items.length - 1) {
      items = await pb.collection('items').getFullList<Item>()
      console.log('>> Restarting')
      index = 0
    }

    //https://steamcommunity.com/market/pricehistory/?appid=730&market_hash_name=Glock-18%20%7C%20Steel%20Disruption%20(Factory%20New)

    const item = items[index++]!
    const url = getItemOrderHistogramUrl(item.id)
    const options = getItemOrderHistogramOptions(item.url)

    try {
      const response = await fetch(url, options)
      const data = (await response.json()) as ItemOrderHistogramData
      const buyOrderMatch = data.buy_order_summary.match(ORDER_EXTRACTION_PATTERN)
      const sellOrderMatch = data.sell_order_summary.match(ORDER_EXTRACTION_PATTERN)
      const highestBuyOrder = +data.highest_buy_order
      const lowestSellOrder = +data.lowest_sell_order
      const body = {
        highestBuyOrder,
        lowestSellOrder,
        buyOrders: buyOrderMatch && buyOrderMatch[1] ? +buyOrderMatch[1] : 0,
        sellOrders: sellOrderMatch && sellOrderMatch[1] ? +sellOrderMatch[1] : 0,
        margin: calculateMargin(highestBuyOrder, lowestSellOrder),
      }

      await pb.collection('items').update(item.id, body)

      console.log(`${index} / ${items.length} >> Successful`)
    } catch (error) {
      console.error(error)
    }
  }, REQUEST_DELAY)
}

main()
