const switchAcc = async(page, id) => {
    await page.waitForSelector('.accountFilter-selected')
    await page.click('.accountFilter-selected')
    await page.waitForTimeout(4000)
    await page.click(`[data-account="${id}"]`)
    try{
        await page.waitForSelector('.completeRegistration-close')
        await page.click('.completeRegistration-close')
        await page.waitForTimeout(1000)
        await page.click('div.jconfirm-buttons.all-button-wrapper > .btn-primary')
    }
    catch{}
    await page.waitForTimeout(5000)
}

module.exports = switchAcc;