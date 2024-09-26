export default function parseResponse(data: Record<string,any>){
    if(data.data){
        return data
    }else if(data.response){
        return data.response
    }
}