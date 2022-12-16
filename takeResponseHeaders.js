const takeResponseHeaders = async page => await page.waitForResponse(res => {
    if(res.url() === 'https://app.sellerboard.com/en/dashboard/periods'){
        page.reload()
        return res
    }
})

module.exports = takeResponseHeaders;