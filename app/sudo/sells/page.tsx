"use client"
import { BsArrow90DegDown, BsCheck2All, BsFilter, BsPlus, BsUpload } from "react-icons/bs";
import GoBack from "../components/GoBack";
import { useEffect, useRef, useState } from "react";
import TextInput from "@/components/TextInput";
import useForm from "@/hooks/useForm";
import PrimaryButton from "@/components/PrimaryButton";
import { ProductInfo, Arrival as tArr } from "@/types";
import Reload from "../components/Reload";
import Link from "next/link";
import {formatToAgo, formatToReadableDate} from "@/utils/format-dates";
import { Ok } from "@/utils/emitter";
import Arrival from "@/services/Arrival";
import Product from "@/services/Product";
import Sell from "@/services/Sell";

export default function Sells(){
    const [sells, setSells] =  useState<tArr[]>([])
    const [copyArr, setCopyArr] =  useState([])
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<ProductInfo[]>([])
    const [showForm, setShowForm] = useState(true)
    const [focused, setFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const getProducts = async () =>{
        const result = await Product.get()
        if(result.status == 200){
            setProducts(result.data.prods)
        }
    }
    const onClickFilter = () => inputRef.current && inputRef.current.focus()
    const [{quantity,price,date,prod}, handleChange] = useForm({price:'',quantity:'',prod:'',date:new Date().toISOString().split('T')[0]})
    const onCreate = async() =>{
        const result = await Sell.add({quantity,price,prod,date})
        if(result.status == 201){
            Ok(result.data.message)
            getSells()
        }else if(result.response?.status == 400){

        }
    }
    const getSells = async () =>{
        const u = await Sell.get()
        if(u.status == 200){
            setSells(u.data.sells)
            setCopyArr(u.data.sells)
        }
        setLoading(false)
    }
    useEffect(()=>{
        getSells()
        getProducts()
    },[])
    return <div className="w-[97.5%] mx-auto p-3 rounded-lg h-full">
        <div className="w-[95%] mx-auto h-full">
            <div className="w-full mx-auto rounded-xl p-4 bg-white">
                <div className="flex w-full justify-between">
                    <div className="flex  items-center gap-3">
                    <GoBack/>
                        <span className="h-8 border-l">  </span>
                        <span className="w-10 h-10 rounded-xl border grid place-items-center"><BsCheck2All className="w-6 h-6"/></span> 
                        <h2 className="text-xl">Sells</h2>
                    </div>
                    <div className="w-5/12 flex gap-3 items-center justify-end">
                        <Reload onClick={getSells}/>
                        <div onClick={onClickFilter} className={`flex cursor-pointer items-center border h-10 transition-all bg-gray-100 duration-500 rounded-xl p-1 gap-2 ${focused ? 'hover:ring-2 hover:ring-gray-800' : 'hover:ring-4 hover:ring-gray-200 hover:bg-gray-50'}`}>
                        <BsFilter className="w-5 h-5"/> <input ref={inputRef}  onFocus={()=> setFocused(true)} onBlur={()=> setFocused(false)} className={`h-8 ${focused? 'w-56' :'w-10 bg-transparent placeholder:text-gray-700'} transition-all duration-500 outline-none bg-transparent`}  placeholder={focused?"Type something to filter" : "Filter"}/>
                        </div>
                        <span className="h-10 bg-black text-white hover:bg-gray-900 transition-all cursor-pointer duration-500 hover:ring-4 hover:ring-gray-400 rounded-xl px-2 flex items-center" onClick={()=>setShowForm(d => d = !d)}><BsPlus className="w-6 h-6"/>Add</span>
                    </div>
                </div>
            </div>
           <div className="flex w-full gap-3">
            <div className={`${showForm ? 'w-9/12' : 'w-full'} transition-all duration-500 mt-5 rounded-xl bg-white p-4`}>
                    <div>

                    </div>
                    {sells.length > 0 && sells.map((u,i) => <Link href={'/sudo/arrivals/'+u.id} className="flex items-center hover:bg-gray-50 hover:ring-4 hover:ring-gray-200 my-3 transition-all duration-500 hover:text-base text-gray-700  p-2 odd:bg-gray-100 rounded-xl" key={u.name}>
                        <div className="w-1/12">{i+1}</div>
                        <div className="font-semibold w-3/12">{u.name}</div>
                        <div className="w-1/12 text-sm">{u.weight}</div>
                        <div className="w-1/12 text-sm">{u.volume}</div>
                        <div className="w-1/12 text-sm">{u.boxes}ctn</div>
                        <div className="w-2/12 flex items-center gap-1 text-indigo-600 text-sm"><BsUpload className="w-4 h-4"/>{formatToReadableDate(u.loadedAt)}</div>
                        <div className="w-3/12 text-sm">
                        <p className="w-full line-clamp-1 text-ellipsis overflow-hidden">{u.description}</p>
                        </div>

                    </Link>)}
                </div>
                <div className={`${showForm ? 'flex' : 'hidden'} flex-col w-3/12 h-fit mt-5 rounded-xl bg-white p-4`}>
                    <p className="text-lg">Add something sold</p>
                    <small className="mb-5 text-gray-500">Fill the form bellow to tell what is sold and how.</small>
                    <select className="h-10 outline-none text-gray-700 focus:ring-2 focus:ring-black transition-all duration-500 mt-2 bg-gray-100 rounded-xl border px-2"  onChange={handleChange}  name='prod'>
                        <option defaultChecked className="text-gray-700">Choose product</option>
                    {products?.length > 0 && products.map(c => <option value={c.id}  className="p-2 rounded-xl  hover:ring-gray-200 text-gray-700 cursor-pointer transition-all duration-500 hover:bg-gray-50" key={c.name}>
                            {c.name}
                        </option>)}
                    </select>
                    <div className="flex gap-3">
                        <TextInput  placeholder="Price" value={price} onChange={handleChange} name='price'/>
                        <TextInput  placeholder="Quantity" value={quantity} onChange={handleChange} name='quantity'/>
                    </div>
                    <TextInput  value={date} type="date" onChange={handleChange} name='date'/>
                    <PrimaryButton className="mt-3 mb-3" onClick={onCreate}>Add sell</PrimaryButton>
                </div>
           </div>
        </div>
    </div>
}