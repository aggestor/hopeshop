import React, { ChangeEvent, useState } from "react"

interface Props {
    placeholder?:string
    name : string
    className ?: string
    autoFill ?: boolean
    disabled ?: boolean
    children : React.ReactNode
    value : any
    onChange : (event: ChangeEvent<HTMLInputElement>) => void
    type ?: "text" | "number" | "tel" | 'email' | 'password'
}

const DataList : React.FC<Props> = ({onChange,className, type='text',value,placeholder,name, autoFill = false, children}) =>{
     return<div className="w-full relative group  h-fit">
         <div className="rounded-xl  bg-gray-100 transition-all duration-500 border my-2 focus-within:ring-2 focus-within: ring-black px-2">
            <input className={`${className} h-10 w-full bg-transparent outline-none focus:placeholder:text-gray-400 placeholder:text-gray-700`} type={type} placeholder={placeholder} onChange={onChange} name={name} value={value} autoComplete={autoFill ? ' on' : 'off'}/>
        </div>
        <div className="rounded-xl group-focus-within:flex hidden transition-all duration-500 flex-col absolute bg-gray-100 p-2 min-h-[200px] z-40 w-full top-16 border-black border-2 left-0">
            {children}
        </div>
     </div>
}

export default DataList