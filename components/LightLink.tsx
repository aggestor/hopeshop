import Link from "next/link"

interface Props {
    href: string
    children : React.ReactNode
    full?: boolean
    fullyRounded ?: boolean
    className ?:string
}
const LightLink : React.FC<Props> = ({href,children, full, fullyRounded, className}) =>{
    return <Link className={`${full ? 'w-full' : 'w-fit'} ${className} text-gray-800 flex justify-around border gap-3 p-2 bg-white focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 hover:shadow-lg transition-all duration-500 hover:shadow-gray-300 ${fullyRounded ? 'rounded-full' : 'rounded-lg'}`} href={href}>
        {children}
    </Link>
}

export default LightLink