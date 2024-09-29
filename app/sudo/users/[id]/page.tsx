"use client"
import { BsAt, BsCalendar2, BsCheck, BsClockHistory, BsListStars, BsPeople, BsPhone, BsPlus, BsToggleOff, BsToggleOn } from "react-icons/bs";
import GoBack from "../../components/GoBack";
import { useEffect, useState } from "react";
import TextInput from "@/components/TextInput";
import useForm from "@/hooks/useForm";
import PrimaryButton from "@/components/PrimaryButton";
import User from "@/services/User";
import { UserInfoType as tUser } from "@/types";
import Reload from "../../components/Reload";
import formatPhoneNumber from "@/utils/format-phone-number";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import parseImage from "@/utils/parse-image";
import useMoment from "@/utils/use-moment";
import { Ok, Oups } from "@/utils/emitter";
import DeleteBtn from "../../components/DeleteBtn";

export default function UserPage(){
    const [user, setUser] =  useState<tUser>()
    const [loading, setLoading] = useState(true)
    const [deletePopup,setDeletePopup] = useState(true)
    const [showForm, setShowForm] = useState(true)
    const [{email,password,name, phone}, handleChange] = useForm({name:'',phone:'',email:'', password : '', type:'Seller'})
    const params = useParams()
    const onCreateUser = async() =>{
        const result = await User.register({email,password,name, phone})
        if(result.status == 201){
            Ok(result.data.message)
            getUser()
        }else if(result.response?.status == 400){

        }
    }
    const getUser = async () =>{
        const u = await User.get(params.id as string)
        if(u.status == 200){
            setUser(u.data.user)
        }
    }
    const banUser =  async () =>{
        const rs = await User.ban(params.id as string)
        if(rs.status == 201){
            getUser()
            Ok("User banned successfully")
        }else{
            Oups("Something went wrong ")
        }
    }
    const unbanUser =  async () =>{
        const rs = await User.unBan(params.id as string)
        if(rs.status == 201){
            getUser()
            Ok("User unbaned successfully")
        }else{
            Oups("Something went wrong ")
        }
    }
    useEffect(()=>{
        getUser()
    },[])
    return <div className="w-[97.5%] mx-auto p-3 rounded-lg h-full">
        <div className="w-[85%] mx-auto h-full">
            <div className="w-full mx-auto rounded-xl p-4 bg-white">
                <div className="flex w-full justify-between">
                    <div className="flex  items-center gap-3">
                    <GoBack/>
                        <span className="h-8 border-l">  </span>
                        <span className="w-10 h-10 rounded-xl border grid place-items-center"><BsPeople className="w-6 h-6"/></span> 
                        <h2 className="text-xl">User Profile</h2>
                    </div>
                    <div className="w-5/12 flex gap-3 items-center justify-end">
                        <Reload onClick={getUser}/>
                        <DeleteBtn onClick={()=>setDeletePopup(d => d= !d)}/>
                        <Link href='/sudo/users#create' className="h-10 bg-black text-white hover:bg-gray-900 transition-all cursor-pointer duration-500 hover:ring-4 hover:ring-gray-400 rounded-xl px-2 flex items-center" onClick={()=>setShowForm(d => d = !d)}><BsPlus className="w-6 h-6"/>Create</Link>
                    </div>
                </div>
            </div>
           <div className="flex w-full gap-3">
            <div className={`${showForm ? 'w-8/12' : 'w-full'} transition-all duration-500 mt-5 rounded-xl bg-white p-4`}>
                    <div className="grid grid-cols-12 gap-10">
                        <div className="col-span-4">
                            <div className="w-64 h-64 rounded-xl overflow-hidden border">
                                <Image className="bg-contain w-full h-full" src={parseImage(user?.image as string)} width={100} height={100} alt={user?.name +"'s profile"}/>
                            </div>
                        </div>
                        <div className=" col-span-8 mt-1">
                            <h2 className="text-xl flex items-center"><span className="flex items-center justify-center h-8 w-8 border rounded-lg bg-gray-100 mr-4"><BsPeople/></span>{user?.name}</h2>
                            <p className="flex items-center my-2"><span className="flex items-center justify-center h-8 w-8 border rounded-lg bg-gray-100 mr-4"><BsAt/></span><span className="text-gray-600">{user?.email}</span></p>
                            <p className="flex items-center"><span className="flex items-center justify-center h-8 w-8 border rounded-lg bg-gray-100 mr-4"><BsPhone/></span><span className="text-gray-600">{formatPhoneNumber(user?.mobile as string)}</span></p>
                            <p className="flex items-center my-2"><span className="flex items-center justify-center h-8 w-8 border rounded-lg bg-gray-100 mr-4"><BsListStars/></span><span className="text-indigo-600 font-semibold">{user?.type as string}</span></p>
                            {user?.status == 1 ? <p className="flex items-center my-2"><span onClick={banUser} className="flex cursor-pointer hover:ring-4 hover:ring-green-300 transition-all duration-500 items-center justify-center h-8 w-8 border border-green-400 rounded-lg bg-green-100 text-green-600 mr-4"><BsToggleOn  className="h-5 w-5"/></span><span className="text-green-600 font-semibold">Active</span></p> : 
                            <p className="flex items-center my-2"><span onClick={unbanUser} className="flex cursor-pointer hover:ring-4 hover:ring-red-300 transition-all duration-500 items-center justify-center h-8 w-8 border border-red-400 rounded-lg bg-red-100 text-red-600 mr-4"><BsToggleOff className="w-5 h-5" /></span><span className="text-red-600 font-semibold">Banned</span></p> }
                            {user?.isRegistered == 1 ? <p className="flex items-center my-2"><span className="flex items-center justify-center h-8 w-8 border border-green-400 rounded-lg bg-green-100 text-green-600 mr-4"><BsCheck className="h-5 w-5"/></span><span className="text-green-600 font-semibold">Verified</span></p> : 
                            <p className="flex items-center my-2"><span className="flex items-center justify-center h-8 w-8 border border-red-400 rounded-lg bg-red-100 text-red-600 mr-4"><BsCheck className="w-5 h-5"/></span><span className="text-red-600 font-semibold">Not Verified</span></p> }
                            <p className="flex items-center my-2"><span className="flex items-center justify-center h-8 w-8 border rounded-lg bg-gray-100 mr-4"><BsCalendar2/></span><span className="text-gray-600">{useMoment(user?.updatedAt)}</span></p>
                            <p className="flex items-center my-2"><span className="flex items-center justify-center h-8 w-8 border rounded-lg bg-gray-100 mr-4"><BsClockHistory/></span><span className="text-gray-600">{useMoment(user?.updatedAt)}</span></p>
                        </div>
                        <small className="col-span-12"> The informations above belongs to <b>{user?.name}</b> and  agreed with <Link href='/terms' className="underline">HopeShop politics and terms</Link> and all the informations provided are not shared with any thirdparty or affiliate not even anonymously.</small>
                    </div>
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