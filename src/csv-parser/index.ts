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

function parseValue(value: string) {
  const numericValue = Number(value)
  if (!isNaN(numericValue)) return numericValue

  const lowerCaseValue = value.toLowerCase()
  if (lowerCaseValue === 'true' || lowerCaseValue === 'false') return lowerCaseValue === 'true'

  return value
}

function parseLine(lines: string[], lineIndex: number, valueSeparator: string, headers: string[]) {
  const line = lines[lineIndex]
  if (!line) {
    console.log(`[SKIP] Line ${lineIndex + 1}: Line is blank.`)
    return null
  }

  const row = line.split(valueSeparator)
  if (row.length !== headers.length) {
    console.log(
      `[SKIP] Line ${lineIndex + 1}: Row length (${row.length}) does not match headers length (${
        headers.length
      }).`
    )
    return null
  }

  const record: Record<string, string | number | boolean> = {}
  let valueIndex: number
  for (valueIndex = 0; valueIndex < row.length; valueIndex++) {
    const value = row[valueIndex]
    if (value === undefined) {
      console.log(`[SKIP] Line ${lineIndex + 1}: No value at position ${valueIndex + 1}.`)
      return null
    }

    const header = headers[valueIndex]
    if (!header) {
      console.log(
        `[SKIP] Line ${lineIndex + 1}: No header for value ${value} at position ${valueIndex + 1}.`
      )
      return null
    }

    if (!value.trim()) {
      console.log(`[SKIP] Line ${lineIndex + 1}: Value at position ${valueIndex + 1} is blank.`)
      return null
    }

    record[header] = parseValue(value)
  }

  return record
}

function parseLines(lines: string[], valueSeparator: string, headers?: string[]) {
  const records: Record<string, string | number | boolean>[] = []

  const startIndex = getStartIndex(headers)
  headers = headers ?? getHeaders(lines, valueSeparator)
  if (!headers) {
    console.error(`[FATAL] Line 1: No headers.`)
    return records
  }

  for (let lineIndex = startIndex; lineIndex < lines.length; lineIndex++) {
    const record = parseLine(lines, lineIndex, valueSeparator, headers)
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
  const records = parseLines(lines, valueSeparator, headers)
  return records
}

function main() {
  console.log(parseCSV('data/test.csv', '\n', ';'))
}

main()
