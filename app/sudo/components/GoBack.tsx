"use client"
import { useRouter } from "next/navigation"
import { BsArrowLeft } from "react-icons/bs"

const GoBack = () =>{
    const router = useRouter()
    return  <span onClick={()=> router.back()} className="w-9 h-9 cursor-pointer duration-500 transition-all hover:bg-white hover:ring-4 hover:ring-gray-100 bg-gray-100 rounded-xl border grid place-items-center"><BsArrowLeft className="w-5 h-5"/></span> 
}
export default GoBack