import Link from "next/link"

interface Props {
    type?: "button" | 'submit' | 'reset'
    children : React.ReactNode | string
    full?: boolean
    fullyRounded ?: boolean
    className ?:string
    onClick: () => void
}
const PrimaryButton : React.FC<Props> = ({type = "button",children, full, onClick, fullyRounded,className}) =>{
    return <button onClick={onClick} type={type} className={`${full ? 'w-full' : 'w-fit'} ${className} outline-none text-white flex justify-around gap-3 p-2 bg-black  focus:ring-4 focus:ring-gray-400 hover:ring-4 hover:ring-gray-400 hover:bg-gray-900 hover:shadow-lg transition-all duration-500  ${fullyRounded ? 'rounded-full' : 'rounded-xl'}`}>
        {children}
    </button>
}

export default PrimaryButton