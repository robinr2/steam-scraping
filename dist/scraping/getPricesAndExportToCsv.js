import fetch from 'node-fetch';
import fs from 'fs';
export default function getPricesAndExportToCsv() {
    const rows = fs.readFileSync('data/data-clean.csv', 'utf8').trim().split('\n').slice(0, 1);
    const table = rows.map((row) => row.split(';'));
    let fileTimeStamp = Date.now();
    let index = 0;
    setInterval(async () => {
        if (index > rows.length - 1) {
            console.log('>> Restarting');
            index = 0;
            fileTimeStamp = Date.now();
        }
        const row = table[index++];
        if (!row) {
            console.error(`No row found at index ${index}`);
            return;
        }
        const id = row[0];
        if (!id) {
            console.error(`No id found at index ${index}`);
            return;
        }
        const url = row[1];
        if (!url) {
            console.error(`No URL found at index ${index}`);
            return;
        }
        console.log(url);
        const options = {
            method: 'GET',
            headers: {
                Accept: '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                Connection: 'keep-alive',
                Cookie: 'ActListPageSize=100; sessionid=8e4fdd38d33f339a4110192a; recentlyVisitedAppHubs=496300%2C644930%2C730; webTradeEligibility=%7B%22allowed%22%3A1%2C%22allowed_at_time%22%3A0%2C%22steamguard_required_days%22%3A15%2C%22new_device_cooldown_days%22%3A0%2C%22time_checked%22%3A1679166585%7D; strInventoryLastContext=730_2; steamCurrencyId=3; timezoneOffset=7200,0; steamparental=1680126464%7C%7Cve6wI8oGyJtsUDcJEie%2BLpiFXD3ikd3yCd2%2Fm0IVPqhnU%2F362%2FxKS9Xy%2BhLZUDDN; steamLoginSecure=76561198079493706%7C%7CeyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInI6MEQyMl8yMjNGM0Q0NV82M0U0QSIsICJzdWIiOiAiNzY1NjExOTgwNzk0OTM3MDYiLCAiYXVkIjogWyAid2ViIiBdLCAiZXhwIjogMTY4MDQyOTgxMCwgIm5iZiI6IDE2NzE3MDI0MzUsICJpYXQiOiAxNjgwMzQyNDM1LCAianRpIjogIjE3NDNfMjI1MEYwQUJfQ0U1M0UiLCAib2F0IjogMTY3OTQxMzA2MiwgInJ0X2V4cCI6IDE2OTczODkzMzYsICJwZXIiOiAwLCAiaXBfc3ViamVjdCI6ICI5MS41OC4xMTcuMjM0IiwgImlwX2NvbmZpcm1lciI6ICI0Ni4xMTQuMzIuMjE4IiB9.O2ZLUY96SQsq8CT5cUVj7hpzq1qmcB78_ePwcvDWbHJmOeViHLICdwOpvIbf6RCGo1ob_U-H7YU6M94K7wK0Cg; steamCountry=DE%7C0602c6d567b2b3792efb5ddf1760bca4',
                Host: 'steamcommunity.com',
                'If-Modified-Since': 'Sat, 01 Apr 2023 15:57:20 GMT',
                Referer: encodeURIComponent(url),
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-GPC': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'sec-ch-ua': '"Brave";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': 'Windows',
            },
        };
        try {
            const response = await fetch(`https://steamcommunity.com/market/itemordershistogram?country=DE&language=german&currency=3&item_nameid=${id}&two_factor=0`, options);
            const data = (await response.json());
            const line = `${id};${url};${data.highest_buy_order};${data.lowest_sell_order};${Date.now()}`.replace(/\r?\n|\r/g, '') + '\n';
            fs.appendFileSync(`data/data-final-${fileTimeStamp}.csv`, line);
            console.log(`${index} / ${rows.length} >> Successful`);
        }
        catch (error) {
            console.error(error);
        }
    }, 5000);
}
//# sourceMappingURL=getPricesAndExportToCsv.js.map