const puppeteer = require('puppeteer')
const takeResponseHeaders = require('./takeResponseHeaders')
const parseHeaders = require('./parseHeaders')
const unpackingData = require('./unpackingData')
const switchAcc = require('./switchAcc')
const switchDate = require('./switchDate')
const getAccounts = require('./getAccounts')
const getDate = require('./getDate')
const insertData = require('./insertData')

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const fetchData = async (headers, id, day, page) => {
    let dateParts = day.split('.')
    let startDate = Date.UTC(+dateParts[2], dateParts[1]-1, +dateParts[0],0,0,0)
    startDate = startDate/1000
    let endDate = Date.UTC(+dateParts[2], dateParts[1]-1, +dateParts[0], 23,59,59)
    endDate = endDate/1000
    let data = await fetch('https://app.sellerboard.com/en/dashboard/entries', {
        'headers':{
            'accept': '*/*',
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sellerboard-account-id": id,
                "sellerboard-user-id": "c7579457-070c-11ec-85d6-e4434b01ba5a",
                "x-requested-with": "XMLHttpRequest",
                "cookie": `PHPSESSID=${headers.cookiesPHP}; ${headers.cookiesNoPHP}`,
                "Referer": "https://app.sellerboard.com/en/dashboard/",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                'pragma':'no-cache',
                'cache-control': 'no-store'
        },
        "body": `_=${headers.currentTime}&dashboardSessionId=${headers.SESSIONID_param}&viewType=panels&entryType=product&periodStart=${startDate}&periodEnd=${endDate}&periodicity=period&sortField=units&sortDirection=desc&page=${page}&groupByAsin=&groupBy=&rangeStart=1630195200&rangeEnd=1661817599&rangePeriodicity=month&trendsParameter=sales`,
        "method": "POST"
    }).then(res => res.json())
    return data;
}

const start = async () => {
    const dayRange = await getDate();
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('https://app.sellerboard.com/en/auth/login')
    await page.waitForSelector('#username')
    await page.type('#username', 'talkacevpavel@gmail.com')
    await page.type('#password', 'rmV4E@23Wijp@vR')
    await page.click('button[type="submit"]')

    for(let day of dayRange){
        let accounts = await getAccounts();
        for(let acc of accounts){
            console.log(acc)
            try{
                await switchAcc(page, acc[1])
                page.reload()
                let resultArr = [];
                const pageCount = 5
                let headers = await takeResponseHeaders(page);
                headers = await parseHeaders(headers, page)
                await page.waitForTimeout(10000)
                await switchDate(page, day[0])
                for(let i = 1; i <= pageCount; i++){
                    let data = await fetchData(headers, acc[1], day[0], i)
                    let unpack = await unpackingData(data.entries, acc[0], day[0])
                    resultArr = [...resultArr, ...unpack]
                }
                await insertData(resultArr)
            }
            catch(e){
                accounts.push(acc)
            }
        }
    }
    await browser.close();
}

start()