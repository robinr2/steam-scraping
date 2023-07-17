import fs from 'fs';
function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}
function getHeaders(lines, valueSeparator) {
    const firstLine = lines[0];
    if (!firstLine || !firstLine.trim())
        return undefined;
    return firstLine.split(valueSeparator);
}
function getStartIndex(headers) {
    return headers ? 0 : 1;
}
function parseValue(value, valueIndex, lineIndex) {
    if (!value.trim()) {
        console.log(`[SKIP] Line ${lineIndex + 1}: Value at position ${valueIndex + 1} is blank.`);
        return null;
    }
    const numericValue = Number(value);
    if (!isNaN(numericValue))
        return numericValue;
    const lowerCaseValue = value.toLowerCase();
    if (lowerCaseValue === 'true' || lowerCaseValue === 'false')
        return lowerCaseValue === 'true';
    return value;
}
function parseValues(values, lineIndex, headers) {
    if (values.length !== headers.length) {
        console.log(`[SKIP] Line ${lineIndex + 1}: Number of values (${values.length}) does not match number of headers (${headers.length}).`);
        return null;
    }
    const record = {};
    for (let index = 0; index < headers.length; index++) {
        const value = values[index];
        const parsedValue = parseValue(value, index, lineIndex);
        if (parsedValue === null)
            return null;
        const header = headers[index];
        record[header] = parsedValue;
    }
    return record;
}
function parseLine(line, lineIndex, valueSeparator, headers) {
    if (!line.trim()) {
        console.log(`[SKIP] Line ${lineIndex + 1}: Line is blank.`);
        return null;
    }
    const values = line.split(valueSeparator);
    return parseValues(values, lineIndex, headers);
}
function parseLines(lines, valueSeparator, headers) {
    const records = [];
    const startIndex = getStartIndex(headers);
    headers = headers ?? getHeaders(lines, valueSeparator);
    if (!headers) {
        console.error(`[FATAL] Line 1: No headers.`);
        return null;
    }
    for (let lineIndex = startIndex; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex];
        const record = parseLine(line, lineIndex, valueSeparator, headers);
        if (!record)
            continue;
        records.push(record);
    }
    return records;
}
export default function parseCSV(filePath, lineSeparator, valueSeparator, headers) {
    const data = readFile(filePath);
    const lines = data.split(lineSeparator);
    return parseLines(lines, valueSeparator, headers);
}
function main() {
    console.log(parseCSV('data/test.csv', '\n', ';'));
}
main();
//# sourceMappingURL=index.js.map