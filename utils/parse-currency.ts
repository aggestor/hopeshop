export default function parseCurrency(metadata: Record<string,any>){
    let currency = ''
    
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
   return currency
}