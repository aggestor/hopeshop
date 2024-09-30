import React, { ChangeEvent, useState } from "react"
import { BsEye, BsEyeSlash } from "react-icons/bs"

interface Props {
    placeholder?:string
    name : string
    className ?: string
    autoFill ?: boolean
    disabled ?: boolean
    value : any
    onChange : (event: ChangeEvent<HTMLInputElement>) => void
    type ?: "text" | "number" | "tel" | 'email' | 'password'
}

const TextInput : React.FC<Props> = ({onChange,className, type='text',value,placeholder,name, autoFill = false}) =>{
     return <div className="rounded-xl  bg-gray-100 transition-all duration-500 border my-2 focus-within:ring-2 focus-within: ring-black px-2">
        <input className={`${className} h-10 w-full bg-transparent outline-none focus:placeholder:text-gray-400 placeholder:text-gray-700`} type={type} placeholder={placeholder} onChange={onChange} name={name} value={value} autoComplete={autoFill ? ' on' : 'off'}/>
     </div>
}

export default TextInput