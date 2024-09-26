import moment from "moment";

export default function useMoment(input:any){
    return moment(input).fromNow()
}