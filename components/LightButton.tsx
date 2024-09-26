import Link from "next/link"

interface Props {
    type?: "button" | 'submit' | 'reset'
    children : React.ReactNode | string
    full?: boolean
    fullyRounded ?: boolean
    className ?:string
}
const LightButton : React.FC<Props> = ({type = "button",children, full, fullyRounded,className}) =>{
    return <button type={type} className={`${full ? 'w-full' : 'w-fit'} ${className} outline-none text-white flex justify-around gap-3 p-2 bg-cyan-600 focus:ring-4 focus:ring-cyan-200 hover:bg-cyan-700 hover:shadow-lg transition-all duration-500 hover:shadow-cyan-300 ${fullyRounded ? 'rounded-full' : 'rounded-lg'}`}>
        {children}
    </button>
}

export default LightButton