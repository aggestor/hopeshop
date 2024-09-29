import { toast } from "sonner";

export function Ok(message:string){
    return toast.success(message)
}
export function Oups(message:string){
    return toast.error(message)
}
export function Attention(message: string){
    return toast.warning(message)
}
export function Inform(message:string){
    return toast.info(message)
}