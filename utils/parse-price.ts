export default function parsePrice(metadata: Record<string,any>){
    let currency = ''
    let price =  "Ask price"
    
    switch(metadata.currency){
        case "Dirham":
            currency = "aed"
            break;
        case "CDF" :
            currency = "Fc"
            break;
        case "Yuan" :
            currency = "Y"
            break;
        default : 
            currency = "$"
            break;
    }
    const prices = metadata.metadata
    
    if( prices){
        if(parseInt(prices.price) || parseFloat(prices.price)){
            price = prices.price+ " "+ currency
        }else if(parseInt(prices.price4) || parseFloat(prices.price4)){
            price = prices.price4+ " "+ currency
        }
        if(prices.price4.split('_')[1]){
            price = prices.price4.split("_")[1] +" " +currency
        }else if(prices.price1.split("_")[1] && !prices.price4.split('_')[1]){
            price = prices.price1.split("_")[1] +" " +currency
        }
    }

    return price
}