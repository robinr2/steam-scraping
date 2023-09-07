import fetch from 'node-fetch'
import PocketBase from 'pocketbase'
import {
  ORDER_EXTRACTION_PATTERN,
  REQUEST_DELAY,
  STEAM_MARKET_BASE_URL,
  STEAM_PRICE_HISTORY_BASE_URL,
  calculateMargin,
  getDayDifference,
  getItemOrderHistogramOptions,
  getItemOrderHistogramUrl,
  getItemPriceHistoryOptions,
} from './helper.js'
import { Item, ItemOrderHistogramData, ItemSaleData } from '../shared/types.js'

const pb = new PocketBase('http://127.0.0.1:8090')

async function getSalesPerMonth(id: string) {
  const item = await pb.collection('items').getOne<Item>(id)
  const itemHashName = item.url.substring(STEAM_MARKET_BASE_URL.length)
  const itemPriceHistoryUrl = STEAM_PRICE_HISTORY_BASE_URL + itemHashName
  const options = getItemPriceHistoryOptions()
  const response = await fetch(itemPriceHistoryUrl, options)
  const data = (await response.json()) as ItemSaleData
  let salesPerMonth = 0
  for (let i = data.prices.length - 1; i >= 0; i--) {
    const sale = data.prices[i]!
    const date = new Date(sale[0]!)
    const dayDifference = getDayDifference(date)
    if (dayDifference > 30) break
    salesPerMonth += +sale[2]!
  }
  return salesPerMonth
}

async function main() {
  let items = await pb.collection('items').getFullList<Item>({
    filter: 'salesPerMonth > 600',
  })
  let index = 0

  setInterval(async () => {
    if (index > items.length - 1) {
      items = await pb.collection('items').getFullList<Item>({
        filter: 'salesPerMonth > 600',
      })
      console.log('>> Restarting')
      index = 0
    }

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
      // const salesPerMonth = await getSalesPerMonth(item.id)
      const body = {
        highestBuyOrder,
        lowestSellOrder,
        buyOrders: buyOrderMatch && buyOrderMatch[1] ? +buyOrderMatch[1] : 0,
        sellOrders: sellOrderMatch && sellOrderMatch[1] ? +sellOrderMatch[1] : 0,
        margin: calculateMargin(highestBuyOrder, lowestSellOrder),
        // salesPerMonth,
      }

      await pb.collection('items').update(item.id, body)

      console.log(`${index} / ${items.length} >> Successful`)
    } catch (error) {
      console.error(error)
    }
  }, REQUEST_DELAY)
}

main()
