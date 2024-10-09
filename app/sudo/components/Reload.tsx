import { BsArrowClockwise, BsArrowLeft } from "react-icons/bs"
type Props = {
    onClick ?: () => void
}
const Reload : React.FC<Props> = ({onClick}) =>{
    return  <span onClick={onClick} className="w-10 group h-10 cursor-pointer duration-500 transition-all hover:bg-white hover:ring-4 hover:ring-gray-100 bg-gray-100 rounded-xl border grid place-items-center"><BsArrowClockwise className="w-5 transition-all duration-500 group-hover:rotate-[360deg] h-5"/></span> 
}
export default Reload