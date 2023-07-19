export function getItemPriceHistoryOptions() {
  return {
    method: 'GET',
    headers: {
      Accept: 'text/javascript, text/html, application/xml, text/xml, */*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'de-DE,de;q=0.6',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      Cookie:
        'ActListPageSize=100; timezoneOffset=7200,0; steamCurrencyId=3; extproviders_730=steam; strInventoryLastContext=730_2; recentlyVisitedAppHubs=496300%2C644930%2C730%2C2050650%2C211420; steamLoginSecure=76561198079493706%7C%7CeyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInI6MEQyMl8yMjNGM0Q0NV82M0U0QSIsICJzdWIiOiAiNzY1NjExOTgwNzk0OTM3MDYiLCAiYXVkIjogWyAid2ViIiBdLCAiZXhwIjogMTY4OTc5MDE3MiwgIm5iZiI6IDE2ODEwNjM2NjAsICJpYXQiOiAxNjg5NzAzNjYwLCAianRpIjogIjE3MUNfMjJEQjVGNDFfMjEwRkIiLCAib2F0IjogMTY3OTQxMzA2MiwgInJ0X2V4cCI6IDE2OTczODkzMzYsICJwZXIiOiAwLCAiaXBfc3ViamVjdCI6ICI5MS41OC4xMTcuMjM0IiwgImlwX2NvbmZpcm1lciI6ICI0Ni4xMTQuMzIuMjE4IiB9.5BI5OZffBK89EVc6XAskJi-gWEqBKpegYjWwNclRBD_nr6K6IsrUzCurLYi2JHxRaBIlACmnrfxyeao32fSfAw; sessionid=b9c3ea6dcadd89fcceb94508; webTradeEligibility=%7B%22allowed%22%3A1%2C%22allowed_at_time%22%3A0%2C%22steamguard_required_days%22%3A15%2C%22new_device_cooldown_days%22%3A0%2C%22time_checked%22%3A1689753526%7D; tsTradeOffersLastRead=1663435420',
      Host: 'steamcommunity.com',
      Pragma: 'no-cache',
      Referer: 'https://steamcommunity.com/id/DERKartoffelsalat/inventory/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-GPC': '1',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      'X-Prototype-Version': '1.7',
      'X-Requested-With': 'XMLHttpRequest',
      'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': 'Windows',
    },
  }
}

export function getItemOrderHistogramOptions(url: string) {
  return {
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      Cookie:
        'ActListPageSize=100; sessionid=8e4fdd38d33f339a4110192a; recentlyVisitedAppHubs=496300%2C644930%2C730; webTradeEligibility=%7B%22allowed%22%3A1%2C%22allowed_at_time%22%3A0%2C%22steamguard_required_days%22%3A15%2C%22new_device_cooldown_days%22%3A0%2C%22time_checked%22%3A1679166585%7D; strInventoryLastContext=730_2; steamCurrencyId=3; timezoneOffset=7200,0; steamparental=1680126464%7C%7Cve6wI8oGyJtsUDcJEie%2BLpiFXD3ikd3yCd2%2Fm0IVPqhnU%2F362%2FxKS9Xy%2BhLZUDDN; steamLoginSecure=76561198079493706%7C%7CeyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInI6MEQyMl8yMjNGM0Q0NV82M0U0QSIsICJzdWIiOiAiNzY1NjExOTgwNzk0OTM3MDYiLCAiYXVkIjogWyAid2ViIiBdLCAiZXhwIjogMTY4MDQyOTgxMCwgIm5iZiI6IDE2NzE3MDI0MzUsICJpYXQiOiAxNjgwMzQyNDM1LCAianRpIjogIjE3NDNfMjI1MEYwQUJfQ0U1M0UiLCAib2F0IjogMTY3OTQxMzA2MiwgInJ0X2V4cCI6IDE2OTczODkzMzYsICJwZXIiOiAwLCAiaXBfc3ViamVjdCI6ICI5MS41OC4xMTcuMjM0IiwgImlwX2NvbmZpcm1lciI6ICI0Ni4xMTQuMzIuMjE4IiB9.O2ZLUY96SQsq8CT5cUVj7hpzq1qmcB78_ePwcvDWbHJmOeViHLICdwOpvIbf6RCGo1ob_U-H7YU6M94K7wK0Cg; steamCountry=DE%7C0602c6d567b2b3792efb5ddf1760bca4',
      Host: 'steamcommunity.com',
      'If-Modified-Since': 'Sat, 01 Apr 2023 15:57:20 GMT',
      Referer: encodeURIComponent(url),
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
}

export function getDayDifference(date: Date) {
  const currentDate = new Date()
  const yearDiff = currentDate.getFullYear() - date.getFullYear()
  const monthDiff = currentDate.getMonth() - date.getMonth()
  const dayDiff = currentDate.getDate() - date.getDate()
  return yearDiff * 12 * 30 + monthDiff * 30 + dayDiff
}

export function getItemOrderHistogramUrl(id: string) {
  return `https://steamcommunity.com/market/itemordershistogram?country=DE&language=german&currency=3&item_nameid=${id}&two_factor=0`
}

export function calculateMargin(highestBuyOrder: number, lowestSellOrder: number) {
  return lowestSellOrder / 1.15 - 0.01 - highestBuyOrder
}

export const ORDER_EXTRACTION_PATTERN =
  /<span class="market_commodity_orders_header_promote">(\d+)<\/span>/

export const REQUEST_DELAY = 5000

export const STEAM_MARKET_BASE_URL = 'https://steamcommunity.com/market/listings/730/'

export const STEAM_PRICE_HISTORY_BASE_URL =
  'https://steamcommunity.com/market/pricehistory/?appid=730&market_hash_name='
