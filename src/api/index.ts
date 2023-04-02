import fs from 'fs'

const rows = fs.readFileSync('data/data-final.csv', 'utf8').trim().split('\n')
const table = rows.map((row) => row.split(';'))
const data = table.map((row) => ({
  id: row[0],
  url: row[1],
  highest_buy_order: row[2] ? +row[2] / 100 : 0,
  lowest_sell_order: row[3] ? +row[3] / 100 : 0,
  timestamp: row[4],
}))

const filteredData = data.filter((row) => row.highest_buy_order > 0 && row.lowest_sell_order > 0)

const sortedData = [...filteredData].sort((a, b) => {
  const marginA = +a.lowest_sell_order - (+a.highest_buy_order * 1.15 - 0.01)
  const marginB = +b.lowest_sell_order - (+b.highest_buy_order * 1.15 - 0.01)

  return marginB - marginA
})

console.log(sortedData)
