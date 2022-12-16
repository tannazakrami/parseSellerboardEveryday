const unpackingData = async (data, acc, day) =>{

    let unpackedData = []
    let object = data;
    for(let i = 0; i < object.length; i++){
        await object[i].channel === 'FBA' ? unpackedData.push([acc, object[i].asin, 
            object[i].sku, object[i].channel, object[i].sales, 
            object[i].price,object[i].units, object[i].orders, object[i].grossProfit,
            object[i].amazonFeesTotal, object[i].refunds, 0,0,0,0,0,0,0, day]) : unpackedData.push([
                acc, object[i].asin, object[i].sku, object[i].channel, 
                0,0,0,0,0,0,0, object[i].sales, object[i].price, object[i].units, 
                object[i].orders, object[i].grossProfit, object[i].amazonFeesTotal, 
                object[i].refunds, day
            ]) 
    }

    return unpackedData;
}

module.exports = unpackingData