const {google} = require('googleapis')
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
})

const getAccounts = async () => {
    const client = await auth.getClient()
    const googleSheets = google.sheets({version: 'v4', auth: client})
    const spreadsheetId = '17tzH19mC9fc-anuZW4SFTa5909Qtr4Z-hVhH3CO-q90'
    let data = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Лист1!A16:B'
    })
    return data.data.values || undefined
}

module.exports = getAccounts