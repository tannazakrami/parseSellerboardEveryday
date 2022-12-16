const switchDate = async (page, date) => {
    const customRange = "Custom range";

    await page.click('.dashboard-filters-periodsPresets')
    const buttonCustomRange = await page.evaluateHandle(
        text => [...document.querySelectorAll('.ng-binding')].find(el => el.textContent.includes(text)),
        customRange
    )
    await buttonCustomRange.click();

    let dateToElement = await page.$('.dashboard-filters-periodsPresets-dropdown-custom-inputs-to > .dashboard-filters-periodsPresets-dropdown-custom-inputs-from-input')
    const dateTo = await page.evaluate(element => element.value, dateToElement)

    let dateFromElement = await page.$('.dashboard-filters-periodsPresets-dropdown-custom-inputs-from > .dashboard-filters-periodsPresets-dropdown-custom-inputs-from-input')
    const dateFrom = await page.evaluate(element => element.value, dateFromElement)

    let datePartsTo = dateTo.split('/')
    let datePartsFrom = dateFrom.split('/')
    let dateToDate = Date.UTC(+datePartsTo[2], datePartsTo[0]-1, +datePartsTo[1],0,0,0)
    let dateFromDate = Date.UTC(+datePartsFrom[2], datePartsFrom[0]-1, +datePartsFrom[1],0,0,0)
    let currentDateParts = date.split('.')
    let currentDate = Date.UTC(+currentDateParts[2], currentDateParts[1]-1, +currentDateParts[0], 0,0,0)
    currentDate = currentDate/1000
    dateToDate = dateToDate/1000
    dateFromDate = dateFromDate/1000
    
    if(currentDate > dateToDate){
        await page.waitForTimeout(1000)
        await dateToElement.click({clickCount: 10})
        await dateToElement.press('Backspace')
        await page.waitForTimeout(1000)
        await dateToElement.type(`${currentDateParts[1]}/${currentDateParts[0]}/${currentDateParts[2]}`)

        await page.waitForTimeout(1000)
        await dateFromElement.click({clickCount: 10})
        await dateFromElement.press('Backspace')
        await page.waitForTimeout(1000)
        await dateFromElement.type(`${currentDateParts[1]}/${currentDateParts[0]}/${currentDateParts[2]}`)
        await page.waitForTimeout(2000)
        await page.click('.col-md-1-5.filter-item.sellerboard-flex-center');
    }
    else if(currentDate < dateFromDate){
        await page.waitForTimeout(1000)
        await dateFromElement.click({clickCount: 10})
        await dateFromElement.press('Backspace')
        await page.waitForTimeout(1000)
        await dateFromElement.type(`${currentDateParts[1]}/${currentDateParts[0]}/${currentDateParts[2]}`)

        await page.waitForTimeout(1000)
        await dateToElement.click({clickCount: 10})
        await dateToElement.press('Backspace')
        await page.waitForTimeout(1000)
        await dateToElement.type(`${currentDateParts[1]}/${currentDateParts[0]}/${currentDateParts[2]}`)
        await page.waitForTimeout(2000)
        await page.click('.col-md-1-5.filter-item.sellerboard-flex-center');
    }
    else{
        await page.waitForTimeout(1000)
        await dateFromElement.click({clickCount: 10})
        await dateFromElement.press('Backspace')
        await page.waitForTimeout(1000)
        await dateFromElement.type(`${currentDateParts[1]}/${currentDateParts[0]}/${currentDateParts[2]}`)

        await page.waitForTimeout(1000)
        await dateToElement.click({clickCount: 10})
        await dateToElement.press('Backspace')
        await page.waitForTimeout(1000)
        await dateToElement.type(`${currentDateParts[1]}/${currentDateParts[0]}/${currentDateParts[2]}`)
        await page.waitForTimeout(2000)
        await page.click('.col-md-1-5.filter-item.sellerboard-flex-center');
    }

    await page.waitForTimeout(10000)
}

module.exports = switchDate