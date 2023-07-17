import express from 'express';
import fs from 'fs';
const app = express();
const PORT = 3000;
const ITEM_PATH = 'data/items.csv';
const HEADERS = [
    'id',
    'url',
    'highestBuyOrder',
    'lowestSellOrder',
    'sellsPerMonth',
    'tracked',
    'updatedAt',
    'sellOrders',
    'buyOrders',
];
app.use(express.json());
function getFields(line) {
    if (line.trim() === '')
        return null;
    const fields = line.split(';');
    if (fields.length !== HEADERS.length)
        return null;
    return fields;
}
function getLines() {
    const data = fs.readFileSync(ITEM_PATH, 'utf8');
    const lines = data.split('\n');
    const headers = lines[0];
    if (!headers)
        return null;
    const headerFields = getFields(headers);
    if (!headerFields)
        return null;
    if (!headerFields.every((val, index) => val === HEADERS[index]))
        return lines;
    lines.shift();
    return lines;
}
function setLines(lines) {
    const data = [HEADERS.join(';'), ...lines].join('\n');
    fs.writeFileSync(ITEM_PATH, data, 'utf8');
}
function getItem(fields) {
    const id = fields[0];
    if (!id)
        return null;
    const url = fields[1];
    if (!url)
        return null;
    const highestBuyOrder = fields[2] ? +fields[2] / 100 : 0;
    const lowestSellOrder = fields[3] ? +fields[3] / 100 : 0;
    const sellsPerMonth = fields[4] ? +fields[4] : 0;
    const tracked = fields[5] === 'true';
    const updatedAt = fields[6] ? +fields[6] : 0;
    const buyOrders = fields[7] ? +fields[7] : 0;
    const sellOrders = fields[8] ? +fields[8] : 0;
    const item = {
        id,
        url,
        highestBuyOrder,
        lowestSellOrder,
        sellsPerMonth,
        tracked,
        updatedAt,
        buyOrders,
        sellOrders,
    };
    return item;
}
function compareByPriceDifference(a, b) {
    const priceDifferenceA = a.lowestSellOrder - (a.highestBuyOrder * 1.15 - 0.01);
    const priceDifferenceB = b.lowestSellOrder - (b.highestBuyOrder * 1.15 - 0.01);
    return priceDifferenceB - priceDifferenceA;
}
function getItems(req, res) {
    const lines = getLines();
    if (!lines) {
        res.sendStatus(404);
        return;
    }
    const items = [];
    for (const line of lines) {
        const fields = getFields(line);
        if (!fields)
            continue;
        const item = getItem(fields);
        if (!item)
            continue;
        items.push(item);
    }
    if (req.query.sorted) {
        items.sort(compareByPriceDifference);
    }
    if (req.query.tracked) {
        const trackedItems = items.filter((item) => item.tracked);
        res.json(trackedItems);
        return;
    }
    res.json(items);
}
function getSortedUrls(req, res) {
    const lines = getLines();
    if (!lines) {
        res.sendStatus(404);
        return;
    }
    const items = [];
    for (const line of lines) {
        const fields = getFields(line);
        if (!fields)
            continue;
        const item = getItem(fields);
        if (!item)
            continue;
        items.push(item);
    }
    items.sort(compareByPriceDifference);
    const urls = [];
    for (const item of items) {
        if (item.highestBuyOrder < 5 &&
            item.highestBuyOrder > 1 &&
            item.buyOrders > 2000 &&
            item.sellOrders > 70) {
            urls.push(item.url);
        }
    }
    console.log(urls);
    // console.log(urls.slice(240, 260))
    res.json(urls);
}
app.get('/items', getItems);
app.get('/sortedUrls', getSortedUrls);
app.patch('/items/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.sendStatus(404);
        return;
    }
    const lines = getLines();
    if (!lines) {
        res.sendStatus(404);
        return;
    }
    let updated = false;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line)
            continue;
        const fields = getFields(line);
        if (!fields || fields[0] !== id)
            continue;
        const item = getItem(fields);
        if (!item)
            continue;
        const { highestBuyOrder, lowestSellOrder, buyOrders, sellOrders } = req.body;
        item.highestBuyOrder = highestBuyOrder ?? item.highestBuyOrder;
        item.lowestSellOrder = lowestSellOrder ?? item.lowestSellOrder;
        item.buyOrders = buyOrders ?? item.buyOrders;
        item.sellOrders = sellOrders ?? item.sellOrders;
        item.updatedAt = Date.now();
        lines[i] = Object.values(item).join(';');
        updated = true;
    }
    if (!updated) {
        res.sendStatus(404);
        return;
    }
    setLines(lines);
    res.sendStatus(200);
});
app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map