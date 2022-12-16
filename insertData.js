const {google} = require('googleapis')
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
})

module.exports = async function insertData(arr){
    const client = await auth.getClient()
    const googleSheets = google.sheets({version: 'v4', auth: client})
    const spreadsheetId = '17tzH19mC9fc-anuZW4SFTa5909Qtr4Z-hVhH3CO-q90'
    const request = {
        auth,
        spreadsheetId,
        range: 'Данные по асинам!A:Z',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            'majorDimension': 'ROWS',
            'values': arr
        }
    }
    try{
        await googleSheets.spreadsheets.values.append(request).data
    }
    catch(e){
        console.error(e)
    }
}