"use client"
import { BsFilter, BsPeople, BsPlus } from "react-icons/bs";
import GoBack from "../components/GoBack";
import { useEffect, useRef, useState } from "react";
import TextInput from "@/components/TextInput";
import useForm from "@/hooks/useForm";
import PrimaryButton from "@/components/PrimaryButton";
import User from "@/services/User";
import { UserInfoType as tUser } from "@/types";
import { toast } from "sonner";
import Reload from "../components/Reload";
import formatPhoneNumber from "@/utils/format-phone-number";
import Link from "next/link";

export default function Users(){
    const [users, setUsers] =  useState<tUser[]>([])
    const [copyUsr, setCopyUsr] =  useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(true)
    const [focused, setFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const onFilter = (e : Record<string,any>) =>{
        const c = [...users]
        if(e.target.value !== ""){
            const r = users.filter(d => d.name.toLowerCase().includes(e.target.value))
            if(r[0]){
                setUsers(r)
            }else{
                setUsers(copyUsr)
            }
        }else{
            setUsers(copyUsr)
        }
    }
    const onClickFilter = () => inputRef.current && inputRef.current.focus()
    const [{email,password,name, phone}, handleChange] = useForm({name:'',phone:'',email:'', password : '', type:'Seller'})
    const onCreateUser = async() =>{
        const result = await User.register({email,password,name, phone})
        if(result.status == 201){
            toast.success(result.data.message)
            getUsers()
        }else if(result.response?.status == 400){

        }
    }
    const getUsers = async () =>{
        const u = await User.get()
        if(u.status == 200){
            setUsers(u.data.users)
            setCopyUsr(u.data.users)
        }
    }
    useEffect(()=>{
        getUsers()
    },[])
    return <div className="w-[97.5%] mx-auto p-3 rounded-lg h-full">
        <div className="w-[85%] mx-auto h-full">
            <div className="w-full mx-auto rounded-xl p-4 bg-white">
                <div className="flex w-full justify-between">
                    <div className="flex  items-center gap-3">
                    <GoBack/>
                        <span className="h-8 border-l">  </span>
                        <span className="w-10 h-10 rounded-xl border grid place-items-center"><BsPeople className="w-6 h-6"/></span> 
                        <h2 className="text-xl">Users</h2>
                    </div>
                    <div className="w-5/12 flex gap-3 items-center justify-end">
                        <Reload onClick={getUsers}/>
                        <div onClick={onClickFilter} className={`flex cursor-pointer items-center border h-10 transition-all bg-gray-100 duration-500 rounded-xl p-1 gap-2 ${focused ? 'hover:ring-2 hover:ring-gray-800' : 'hover:ring-4 hover:ring-gray-200 hover:bg-gray-50'}`}>
                        <BsFilter className="w-5 h-5"/> <input ref={inputRef} onChange={onFilter} onFocus={()=> setFocused(true)} onBlur={()=> setFocused(false)} className={`h-8 ${focused? 'w-56' :'w-10 bg-transparent placeholder:text-gray-700'} transition-all duration-500 outline-none bg-transparent`}  placeholder={focused?"Type something to filter" : "Filter"}/>
                        </div>
                        <span className="h-10 bg-black text-white hover:bg-gray-900 transition-all cursor-pointer duration-500 hover:ring-4 hover:ring-gray-400 rounded-xl px-2 flex items-center" onClick={()=>setShowForm(d => d = !d)}><BsPlus className="w-6 h-6"/>Create</span>
                    </div>
                </div>
            </div>
           <div className="flex w-full gap-3">
            <div className={`${showForm ? 'w-8/12' : 'w-full'} transition-all duration-500 mt-5 rounded-xl bg-white p-4`}>
                    <div>

                    </div>
                    {users.length > 0 && users.map((u,i) => <Link href={'/sudo/users/'+u.id} className="flex items-center hover:bg-gray-50 hover:ring-4 hover:ring-gray-200 my-3 transition-all duration-500 hover:text-base text-gray-700  p-2 odd:bg-gray-100 rounded-xl" key={u.name}>
                        <div className="w-1/12">{i+1}</div>
                        <div className="font-semibold w-2/12">{u.name}</div>
                        <div className="w-3/12 text-sm">{formatPhoneNumber(u.mobile)}</div>
                        <div className="w-3/12 text-sm">{u.email}</div>
                        <div className="w-1/12 text-sm"><span className="bg-indigo-200 text-indigo-600 rounded-lg border px-2">{ u.type}</span></div>
                        <div className="w-1/12 text-sm">
                        {u.status == 1 ? <span className="bg-green-100 text-green-600 rounded-lg border px-2">Active</span> :
                        <span className="bg-red-200 text-red-600 rounded-lg border px-2">Inactive</span>}
                        </div>

                    </Link>)}
                </div>
                <div className={`${showForm ? 'flex' : 'hidden'} flex-col w-4/12 mt-5 rounded-xl bg-white p-4`}>
                    <p className="text-lg">Create a new user</p>
                    <small className="mb-5 text-gray-500">Fill all the fields bellow correctly to create a new user of this system, then the user can continue his signup</small>
                    <TextInput  placeholder="Full name" value={name} onChange={handleChange}  name='name'/>
                    <TextInput  placeholder="Phone number" value={phone} onChange={handleChange} name='phone'/>
                    <TextInput  placeholder="Email" value={email} onChange={handleChange} name='email'/>
                    <TextInput  placeholder="Password" value={password} type="password"  onChange={handleChange} name='password'/>
                    <PrimaryButton className="mt-3" onClick={onCreateUser}>Create user</PrimaryButton>
                </div>
           </div>
        </div>
    </div>
}