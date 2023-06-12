import fetch from 'node-fetch'
import { Item } from '../shared/types.js'

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

async function getTrackedItems() {
  const response = await fetch('http://localhost:3000/items?tracked=true')
  const trackedItems = (await response.json()) as Item[]
  return trackedItems
}

async function main() {
  let trackedItems = await getTrackedItems()

  let index = 0
  setInterval(async () => {
    if (index > trackedItems.length - 1) {
      trackedItems = await getTrackedItems()
      console.log('>> Restarting')
      index = 0
    }

    const trackedItem = trackedItems[index++]
    if (!trackedItem) {
      console.error(`No item found at index ${index}`)
      return
    }

    if (!trackedItem.tracked) {
      console.error(`Item at index ${index} is NOT tracked.`)
      return
    }

    console.log(trackedItem.url)

    const options = {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        Cookie:
          'ActListPageSize=100; sessionid=8e4fdd38d33f339a4110192a; recentlyVisitedAppHubs=496300%2C644930%2C730; webTradeEligibility=%7B%22allowed%22%3A1%2C%22allowed_at_time%22%3A0%2C%22steamguard_required_days%22%3A15%2C%22new_device_cooldown_days%22%3A0%2C%22time_checked%22%3A1679166585%7D; strInventoryLastContext=730_2; steamCurrencyId=3; timezoneOffset=7200,0; steamparental=1680126464%7C%7Cve6wI8oGyJtsUDcJEie%2BLpiFXD3ikd3yCd2%2Fm0IVPqhnU%2F362%2FxKS9Xy%2BhLZUDDN; steamLoginSecure=76561198079493706%7C%7CeyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInI6MEQyMl8yMjNGM0Q0NV82M0U0QSIsICJzdWIiOiAiNzY1NjExOTgwNzk0OTM3MDYiLCAiYXVkIjogWyAid2ViIiBdLCAiZXhwIjogMTY4MDQyOTgxMCwgIm5iZiI6IDE2NzE3MDI0MzUsICJpYXQiOiAxNjgwMzQyNDM1LCAianRpIjogIjE3NDNfMjI1MEYwQUJfQ0U1M0UiLCAib2F0IjogMTY3OTQxMzA2MiwgInJ0X2V4cCI6IDE2OTczODkzMzYsICJwZXIiOiAwLCAiaXBfc3ViamVjdCI6ICI5MS41OC4xMTcuMjM0IiwgImlwX2NvbmZpcm1lciI6ICI0Ni4xMTQuMzIuMjE4IiB9.O2ZLUY96SQsq8CT5cUVj7hpzq1qmcB78_ePwcvDWbHJmOeViHLICdwOpvIbf6RCGo1ob_U-H7YU6M94K7wK0Cg; steamCountry=DE%7C0602c6d567b2b3792efb5ddf1760bca4',
        Host: 'steamcommunity.com',
        'If-Modified-Since': 'Sat, 01 Apr 2023 15:57:20 GMT',
        Referer: encodeURIComponent(trackedItem.url),
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-GPC': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua': '"Brave";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': 'Windows',
      },
    }

    try {
      const response = await fetch(
        `https://steamcommunity.com/market/itemordershistogram?country=DE&language=german&currency=3&item_nameid=${trackedItem.id}&two_factor=0`,
        options
      )
      const data = (await response.json()) as Data

      await fetch(`http://localhost:3000/items/${trackedItem.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          highestBuyOrder: data.highest_buy_order,
          lowestSellOrder: data.lowest_sell_order,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      console.log(`${index} / ${trackedItems.length} >> Successful`)
    } catch (error) {
      console.error(error)
    }
  }, 5000)
}

main()
