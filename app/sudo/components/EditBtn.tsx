import { BsArrowClockwise, BsArrowLeft, BsPen, BsTrash2Fill, BsTrash3 } from "react-icons/bs"
type Props = {
    onClick ?: () => void
    onBlur ?: () => void
}
const EditBtn : React.FC<Props> = ({onClick, onBlur}) =>{
    return  <span tabIndex={0} onClick={onClick} onBlur={onBlur} className="w-10 focus:ring-4 focus:ring-red-300 focus:bg-red-100 focus:text-red-600 h-10 cursor-pointer duration-500 transition-all hover:bg-red-100 hover:ring-4 hover:ring-red-300 hover:text-red-600 bg-gray-100 rounded-xl border grid place-items-center"><BsPen className="w-5 h-5"/></span> 
}
export default EditBtn