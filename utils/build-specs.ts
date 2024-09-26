export default async function buildSpecs(input : any) {
    const accumulator : Record<string,any>[] = []
    if(input.details && Array.isArray(input.details) && input.details.length > 0){
        const pref = JSON.parse(input.preferences)
        pref.forEach((p:Record<string,any>) =>{
            const checkCopy = accumulator.filter(a => a.name == p?.split("__@__")[1].split('__')[1])
            if(checkCopy[0]){
                accumulator[accumulator.indexOf(checkCopy[0])] = {name : p?.split("__@__")[1].split('__')[1], values : checkCopy[0].values +','+p?.split("__@__")[0].split('__')[1]}
            }else{

                let obj = {
                    name : p?.split("__@__")[1].split('__')[1],
                    values : p?.split("__@__")[0].split('__')[1],
                }
                accumulator.push(obj)
            }
        })
    }else{
        let pref = JSON.parse(input.preferences)
        Array.isArray(pref) && pref.forEach((det : Record<string,any>)  =>{
            const checkCopy = accumulator.filter(a => a.name == det.name)
            if(checkCopy[0]){
                accumulator[accumulator.indexOf(checkCopy[0])] = {
                    name : det.name,
                    values : checkCopy[0].values + ","+det.values
                }
            }else{
                let obj = {
                    name : det.name,
                    values : det.value,
                }
                accumulator.push(obj)
            }
        })
    }
    return accumulator
}