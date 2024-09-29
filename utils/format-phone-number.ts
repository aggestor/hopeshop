export default function formatPhoneNumber(input: string){
    if(input){

        let phone = ''
        let code = ''
        if(input.includes("+")){
            phone = Number(input.substring(input.length - 9)).toLocaleString().replaceAll(',',' ')
            code = input.substring(0,4)+' '
        }else{
            phone = Number(input).toLocaleString().toLocaleString().replaceAll(',',' ')
            code = '+243 '
        }
        return code+phone
    }
    return ""
}