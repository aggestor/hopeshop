import { BsArrowClockwise, BsArrowLeft, BsTrash2Fill, BsTrash3 } from "react-icons/bs"
type Props = {
    onClick ?: () => void
}
const DeleteBtn : React.FC<Props> = ({onClick}) =>{
    return  <span onClick={onClick} className="w-10 h-10 cursor-pointer duration-500 transition-all hover:bg-red-100 hover:ring-4 hover:ring-red-300 hover:text-red-600 bg-gray-100 rounded-xl border grid place-items-center"><BsTrash3 className="w-5 h-5"/></span> 
}
export default DeleteBtn