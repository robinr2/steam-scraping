import fs from 'fs';
export function clean() {
    const rows = fs.readFileSync('./data.csv', 'utf8').trim().split('\n');
    console.log('Before: ' + rows.length);
    const cleanedRows = new Set(rows);
    console.log('After: ' + cleanedRows.size);
    for (const row of cleanedRows) {
        fs.appendFile('./data-clean.csv', row, 'utf-8', (error) => {
            if (error)
                throw error;
        });
    }
}
//# sourceMappingURL=clean.js.map