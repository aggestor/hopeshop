import { toast } from "sonner";

export function Ok(message:string){
    return toast.success(message)
}
export function Oups(message:string){
    return toast.error(message)
}
export function Humm(message: string){
    return toast.warning(message)
}
export function Hey(message:string){
    return toast.info(message)
}