import { BsArrowClockwise, BsArrowLeft } from "react-icons/bs"
type Props = {
    onClick ?: () => void
}
const Reload : React.FC<Props> = ({onClick}) =>{
    return  <span onClick={onClick} className="w-9 h-9 cursor-pointer duration-500 transition-all hover:bg-white hover:ring-4 hover:ring-gray-100 bg-gray-100 rounded-xl border grid place-items-center"><BsArrowClockwise className="w-5 h-5"/></span> 
}
export default Reload