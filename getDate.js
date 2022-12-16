const {google} = require('googleapis')
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
})

const getDate = async () => {
    const client = await auth.getClient()
    const googleSheets = google.sheets({version: 'v4', auth: client})
    const spreadsheetId = '17tzH19mC9fc-anuZW4SFTa5909Qtr4Z-hVhH3CO-q90'
    let data = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Даты для выгрузки!A1:A'
    })
    return data.data.values || undefined;
}

module.exports = getDate;