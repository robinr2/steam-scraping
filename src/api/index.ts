import express, { Request, Response } from 'express'
import fs from 'fs'

const app = express()
const PORT = 3000
const ITEM_PATH = 'data/items.csv'
const HEADERS = [
  'id',
  'url',
  'highestBuyOrder',
  'lowestSellOrder',
  'sellsPerMonth',
  'tracked',
  'updatedAt',
]

type Item = {
  id: string
  url: string
  highestBuyOrder: number
  lowestSellOrder: number
  sellsPerMonth: number
  tracked: boolean
  updatedAt: number
}

type UpdateBody = {
  highestBuyOrder: Item['highestBuyOrder'] | undefined
  lowestSellOrder: Item['lowestSellOrder'] | undefined
}

app.use(express.json())

function getFields(line: string) {
  if (line.trim() === '') return null

  const fields = line.split(';')
  if (fields.length !== HEADERS.length) return null

  return fields
}

function getLines() {
  const data = fs.readFileSync(ITEM_PATH, 'utf8')
  const lines = data.split('\n')
  const headers = lines[0]
  if (!headers) return null

  const headerFields = getFields(headers)
  if (!headerFields) return null
  if (!headerFields.every((val, index) => val === HEADERS[index])) return lines

  lines.shift()

  return lines
}

function setLines(lines: string[]) {
  const data = lines.join('\n')
  fs.writeFileSync(ITEM_PATH, data, 'utf8')
}

function getItem(fields: string[]) {
  const id = fields[0]
  if (!id) return null

  const url = fields[1]
  if (!url) return null

  const highestBuyOrder = fields[2] ? +fields[2] / 100 : 0
  const lowestSellOrder = fields[3] ? +fields[3] / 100 : 0
  const sellsPerMonth = fields[4] ? +fields[4] : 0
  const tracked = fields[5] === 'true'
  const updatedAt = fields[6] ? +fields[6] : 0

  const item = {
    id,
    url,
    highestBuyOrder,
    lowestSellOrder,
    sellsPerMonth,
    tracked,
    updatedAt,
  }

  return item
}

app.get('/items', (req: Request, res: Response) => {
  const lines = getLines()
  if (!lines) {
    res.sendStatus(404)
    return
  }

  const items: Item[] = []
  for (const line of lines) {
    const fields = getFields(line)
    if (!fields) continue

    const item = getItem(fields)
    if (!item) continue

    items.push(item)
  }

  res.json(items)
})

app.post('/items/:id', (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    res.sendStatus(404)
    return
  }

  const lines = getLines()
  if (!lines) {
    res.sendStatus(404)
    return
  }

  let updated = false

  for (let line of lines) {
    const fields = getFields(line)
    if (!fields || fields[0] !== id) continue

    const item = getItem(fields)
    if (!item) continue

    const { highestBuyOrder, lowestSellOrder }: UpdateBody = req.body

    item.highestBuyOrder = highestBuyOrder ?? item.highestBuyOrder
    item.lowestSellOrder = lowestSellOrder ?? item.lowestSellOrder
    item.updatedAt = Date.now()

    line = `${item.id};${item.url};${item.highestBuyOrder};${item.lowestSellOrder};${item.sellsPerMonth};${item.tracked};${item.updatedAt}`
    updated = true
  }

  if (!updated) {
    res.sendStatus(404)
    return
  }

  setLines(lines)
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`)
})
