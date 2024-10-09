"use client"
import { BsFilter, BsListNested, BsMenuDown, BsPeople, BsPlus } from "react-icons/bs";
import GoBack from "../components/GoBack";
import { useEffect, useRef, useState } from "react";
import TextInput from "@/components/TextInput";
import useForm from "@/hooks/useForm";
import PrimaryButton from "@/components/PrimaryButton";
import { CategoryInfoType as tCat, ProductInfo as tProd } from "@/types";
import Reload from "../components/Reload";
import Link from "next/link";
import Category from "@/services/Category";
import {formatToAgo} from "@/utils/format-dates";
import Product from "@/services/Product";
import { Ok } from "@/utils/emitter";

export default function Products(){
    const [prods, setProds] =  useState<tProd[]>([])
    const [categories, setCategories] =  useState<tCat[]>([])
    const [copyPrd, setCopyProd] =  useState([])
    const [loading, setLoading] = useState(true)
    const [cId, setCid] = useState('')
    const [showForm, setShowForm] = useState(true)
    const [focused, setFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const onFilter = (e : Record<string,any>) =>{
        const c = [...prods]
        if(e.target.value !== ""){
            const r = prods.filter(d => d.name.toLowerCase().includes(e.target.value))
            if(r[0]){
                setProds(r)
            }else{
                setProds(copyPrd)
            }
        }else{
            setProds(copyPrd)
        }
    }
    const onClickFilter = () => inputRef.current && inputRef.current.focus()
    const [{alert_stock,equivalent,name}, handleChange] = useForm({name:'',alert_stock:"",equivalent:''})
    const onCreateProd = async() =>{
        const result = await Product.create({alert_stock: Number(alert_stock),equivalent,name,category:cId})
        if(result.status == 201){
           Ok(result.data.message)
            getProds()
        }else if(result.response?.status == 400){

        }
    }
    const getCategorization = async () =>{
        const u = await Category.get()
        if(u.status == 200){
            setCategories(u.data.categories)
        }
        setLoading(false)
    }
    const getProds = async () =>{
        const u = await Product.get()
        if(u.status == 200){
            setProds(u.data.prods)
            setCopyProd(u.data.prods)
        }
        setLoading(false)
    }
    useEffect(()=>{
        getProds()
        getCategorization()
    },[])
    return <div className="w-[97.5%] mx-auto p-3 rounded-lg h-full">
        <div className="w-[85%] mx-auto h-full">
            <div className="w-full mx-auto rounded-xl p-4 bg-white">
                <div className="flex w-full justify-between">
                    <div className="flex  items-center gap-3">
                    <GoBack/>
                        <span className="h-8 border-l">  </span>
                        <span className="w-10 h-10 rounded-xl border grid place-items-center"><BsMenuDown className="w-6 h-6"/></span> 
                        <h2 className="text-xl">Products</h2>
                    </div>
                    <div className="w-5/12 flex gap-3 items-center justify-end">
                        <Reload onClick={getProds}/>
                        <div onClick={onClickFilter} className={`flex cursor-pointer items-center border h-10 transition-all bg-gray-100 duration-500 rounded-xl p-1 gap-2 ${focused ? 'hover:ring-2 hover:ring-gray-800' : 'hover:ring-4 hover:ring-gray-200 hover:bg-gray-50'}`}>
                        <BsFilter className="w-5 h-5"/> <input ref={inputRef} onChange={onFilter} onFocus={()=> setFocused(true)} onBlur={()=> setFocused(false)} className={`h-8 ${focused? 'w-56' :'w-10 bg-transparent placeholder:text-gray-700'} transition-all duration-500 outline-none bg-transparent`}  placeholder={focused?"Type something to filter" : "Filter"}/>
                        </div>
                        <span className="h-10 bg-black text-white hover:bg-gray-900 transition-all cursor-pointer duration-500 hover:ring-4 hover:ring-gray-400 rounded-xl px-2 flex items-center" onClick={()=>setShowForm(d => d = !d)}><BsPlus className="w-6 h-6"/>Create</span>
                    </div>
                </div>
            </div>
           <div className="flex w-full gap-3">
            <div className={`${showForm ? 'w-8/12' : 'w-full'} transition-all duration-500 mt-3 rounded-xl bg-white p-4`}>
                    <div className="flex items-center bg-gray-100 p-2 rounded-xl w-full">
                    <div className="w-1/12">#</div>
                        <div className="font-semibold text-ellipsis overflow-hidden line-clamp-1 w-3/12">Name</div>
                        <div className="w-3/12 text-sm text-ellipsis overflow-hidden line-clamp-1">Equivalent</div>
                        <div className="w-3/12 text-sm text-ellipsis overflow-hidden line-clamp-1">Categorization</div>
                        <div className="w-2/12 text-sm">Alert stock</div>
                        <div className="w-2/12 text-black font-semibold">Quantity</div>
                        <div className="w-2/12 text-sm text-ellipsis overflow-hidden line-clamp-1">Last update</div>
                    </div>
                    {prods.length > 0 && prods.map((u,i) => <Link href={'/sudo/prods/'+u.id} className="flex items-center hover:bg-gray-50 hover:ring-4 hover:ring-gray-200 my-3 transition-all duration-500 hover:text-base text-gray-700  p-2  rounded-xl" key={u.name}>
                        <div className="w-1/12">{i+1}</div>
                        <div className="font-semibold text-ellipsis overflow-hidden line-clamp-1 w-3/12">{u.name}</div>
                        <div className="w-3/12 text-sm text-ellipsis overflow-hidden line-clamp-1">{u.equivalent || 'Not specified'}</div>
                        <div className="w-3/12 text-sm text-ellipsis overflow-hidden line-clamp-1">{u.category.name}</div>
                        <div className="w-2/12 text-sm">{u.alertStock} pcs</div>
                        <div className={`w-2/12  font-semibold ${Number(u.quantity) <= Number(u.alertStock) ? ' text-red-600' : 'text-green-600'}`}>{u.quantity} pcs</div>
                        <div className="w-2/12 text-sm text-ellipsis overflow-hidden line-clamp-1">{formatToAgo(u.updatedAt)}</div>
                    </Link>)}
                </div>
                <div className={`${showForm ? 'flex' : 'hidden'} flex-col w-4/12 mt-3 rounded-xl bg-white p-4`}>
                    <p className="text-lg">Create a new product</p>
                    <small className="mb-5 text-gray-500">Enter following data to identify the product.</small>
                    <TextInput  placeholder="Full name. Ex: Display KC8" value={name} onChange={handleChange}  name='name'/>
                    <TextInput  placeholder="Alert Stock" value={alert_stock} onChange={handleChange}  name='alert_stock'/>
                    <TextInput  placeholder="Equivalent (Optional)" value={equivalent} onChange={handleChange}  name='equivalent'/>
                    <select className="h-10 outline-none text-gray-700 focus:ring-2 focus:ring-black transition-all duration-500 mt-2 bg-gray-100 rounded-xl border px-2"  onChange={(e)=>setCid(e.target.value)}  name='description'>
                        <option defaultChecked className="text-gray-700">Choose categorization</option>
                    {categories.length > 0 && categories.map(c => <option value={c.id}  className="p-2 rounded-xl  hover:ring-gray-200 text-gray-700 cursor-pointer transition-all duration-500 hover:bg-gray-50" key={c.name}>
                            {c.name}
                        </option>)}
                    </select>
                    <PrimaryButton className="mt-3" onClick={onCreateProd}>Create a product</PrimaryButton>
                </div>
           </div>
        </div>
    </div>
}