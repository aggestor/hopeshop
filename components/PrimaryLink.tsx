import Link from "next/link"

interface Props {
    href: string
    children : React.ReactNode
    full?: boolean
    fullyRounded ?: boolean
    className ?: string
}
const PrimaryLink : React.FC<Props> = ({href,children, full, className, fullyRounded}) =>{
    return <Link className={`${full ? 'w-full' : 'w-fit'} text-white flex ${className} justify-around gap-3 p-2 bg-cyan-600 focus:ring-4 focus:ring-cyan-200 hover:bg-cyan-700 hover:shadow-lg transition-all duration-500 hover:shadow-cyan-300 ${fullyRounded ? 'rounded-full' : 'rounded-lg'}`} href={href}>
        {children}
    </Link>
}

export default PrimaryLink