import fs from 'fs'

function readFile(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8')
}

function getHeaders(lines: string[], valueSeparator: string) {
  const firstLine = lines[0]
  if (!firstLine || !firstLine.trim()) return undefined

  return firstLine.split(valueSeparator)
}

function getStartIndex(headers?: string[]) {
  return headers ? 0 : 1
}

function parseValue(value: string, valueIndex: number, lineIndex: number) {
  if (!value.trim()) {
    console.log(`[SKIP] Line ${lineIndex + 1}: Value at position ${valueIndex + 1} is blank.`)
    return null
  }

  const numericValue = Number(value)
  if (!isNaN(numericValue)) return numericValue

  const lowerCaseValue = value.toLowerCase()
  if (lowerCaseValue === 'true' || lowerCaseValue === 'false') return lowerCaseValue === 'true'

  return value
}

function parseValues(values: string[], lineIndex: number, headers: string[]) {
  if (values.length !== headers.length) {
    console.log(
      `[SKIP] Line ${lineIndex + 1}: Number of values (${
        values.length
      }) does not match number of headers (${headers.length}).`
    )
    return null
  }

  const record: Record<string, string | number | boolean> = {}
  for (let index = 0; index < headers.length; index++) {
    const value = values[index]!
    const parsedValue = parseValue(value, index, lineIndex)
    if (parsedValue === null) return null
    const header = headers[index]!
    record[header] = parsedValue
  }

  return record
}

function parseLine(line: string, lineIndex: number, valueSeparator: string, headers: string[]) {
  if (!line.trim()) {
    console.log(`[SKIP] Line ${lineIndex + 1}: Line is blank.`)
    return null
  }

  const values = line.split(valueSeparator)
  return parseValues(values, lineIndex, headers)
}

function parseLines(lines: string[], valueSeparator: string, headers?: string[]) {
  const records: Record<string, string | number | boolean>[] = []

  const startIndex = getStartIndex(headers)
  headers = headers ?? getHeaders(lines, valueSeparator)
  if (!headers) {
    console.error(`[FATAL] Line 1: No headers.`)
    return null
  }

  for (let lineIndex = startIndex; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex]!
    const record = parseLine(line, lineIndex, valueSeparator, headers)
    if (!record) continue
    records.push(record)
  }

  return records
}

export default function parseCSV(
  filePath: string,
  lineSeparator: string,
  valueSeparator: string,
  headers?: string[]
) {
  const data = readFile(filePath)
  const lines = data.split(lineSeparator)
  return parseLines(lines, valueSeparator, headers)
}

function main() {
  console.log(parseCSV('data/test.csv', '\n', ';'))
}

main()
