import Link from "next/link"
import React from "react"

interface Props {
    route : string
    name : string
    Icon : React.ReactNode
}
const SideBarItem : React.FC<Props> = ({route,Icon,name}) => {
    return <Link className="flex items-center py-2 my-1 px-1 gap-3 hover:bg-gray-100 text-gray-700  cursor-pointer  rounded-xl" href={route}>
       <span className="w-9 grid border place-items-center h-9 rounded-lg"> {Icon}</span> {name}
    </Link>
}

export default SideBarItem