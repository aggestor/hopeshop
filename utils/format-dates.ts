import moment from "moment";

export  function formatToAgo(input:any){
    return moment(input).fromNow()
}