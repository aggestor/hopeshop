import moment from "moment";

export  function useMoment(input:any){
    return moment(input).fromNow()
}