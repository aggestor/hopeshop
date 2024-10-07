import moment from "moment";

export  function formatToAgo(input:any){
    return moment(input).fromNow()
}
export  function formatToReadableDate(input:any){
    return moment(input).format('ll')
}