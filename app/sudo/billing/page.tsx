"use client"
import { BsArrow90DegDown, BsCheck2All, BsFilter, BsPlus, BsReceipt, BsUpload } from "react-icons/bs";
import GoBack from "../components/GoBack";
import { useEffect, useRef, useState } from "react";
import TextInput from "@/components/TextInput";
import useForm from "@/hooks/useForm";
import PrimaryButton from "@/components/PrimaryButton";
import { InvioceItemInfo, ProductInfo, Arrival as tArr } from "@/types";
import Reload from "../components/Reload";
import Link from "next/link";
import {formatToAgo, formatToReadableDate} from "@/utils/format-dates";
import { Hey, Ok, Oups } from "@/utils/emitter";
import Product from "@/services/Product";
import Sell from "@/services/Sell";
import { generate } from "randomstring";

export default function BillingPage(){
    const [sells, setSells] =  useState<tArr[]>([])
    const [items, setItems] =  useState<InvioceItemInfo[]>([])
    const [generalTotal, setGeneralTotal] = useState(0)
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
    const [{quantity,price,unit,date,prod}, handleChange] = useForm({price:'',quantity:'',prod:'',unit:'',date:new Date().toISOString().split('T')[0]})
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
    const onAddItem = () =>{
        const itms = [...items]
        const match = items.filter(o => o.prod == prod) 
        if(match[0]){
            Hey(prod.toString().split("_")[1]+' is already on the invoice')
            return
        }else if(prod == ''){
            Hey("You even did'nt pick a product !!")
            return
        }else if(quantity == '' || price == ''){
            Oups("Price and quantity are required !!")
            return
        }
        let newItem : InvioceItemInfo = {
            prod : prod as string,
            quantity : Number(quantity),
            price : Number(price),
            total : Number(quantity) * Number(price),
            unit : unit as string || "pcs",
            id: generate(6)
        }
        setGeneralTotal(t => t+Number(quantity) * Number(price))
        itms.push(newItem)
        setItems(itms)
    }
    useEffect(()=>{
        //getSells()
        getProducts()
    },[])
    return <div className="w-[97.5%] mx-auto p-3 rounded-lg h-full">
        <div className="w-[95%] mx-auto h-full">
            <div className="w-full mx-auto rounded-xl p-4 bg-white">
                <div className="flex w-full justify-between">
                    <div className="flex  items-center gap-3">
                    <GoBack/>
                        <span className="h-8 border-l">  </span>
                        <span className="w-10 h-10 rounded-xl border grid place-items-center"><BsReceipt className="w-6 h-6"/></span> 
                        <h2 className="text-xl">Billing</h2>
                    </div>
                    <div className="w-5/12 flex gap-3 items-center justify-end">
                        <Reload onClick={getSells}/>
                        <div onClick={onClickFilter} className={`flex cursor-pointer items-center border h-10 transition-all bg-gray-100 duration-500 rounded-xl p-1 gap-2 ${focused ? 'hover:ring-2 hover:ring-gray-800' : 'hover:ring-4 hover:ring-gray-200 hover:bg-gray-50'}`}>
                        <BsFilter className="w-5 h-5"/> <input ref={inputRef}  onFocus={()=> setFocused(true)} onBlur={()=> setFocused(false)} className={`h-8 ${focused? 'w-56' :'w-10 bg-transparent placeholder:text-gray-700'} transition-all duration-500 outline-none bg-transparent`}  placeholder={focused?"Type something to filter" : "Filter"}/>
                        </div>
                        <span className="h-10 bg-black text-white hover:bg-gray-900 transition-all cursor-pointer duration-500 hover:ring-4 hover:ring-gray-400 rounded-xl px-2 flex items-center" onClick={()=>setShowForm(d => d = !d)}><BsPlus className="w-6 h-6"/>Make invoice</span>
                    </div>
                </div>
            </div>
            <div className="w-full border grid grid-cols-12">
                <div className="flex col-span-9 gap-3">
                    <div className="w-8/12  transition-all duration-500 mt-5 rounded-xl bg-white p-4">
                        <div className="flex  rounded-xl p-2 items-center bg-gray-100 w-full">
                                <div className="w-4/12">Product</div>
                                <div className="w-2/12">Unit</div>
                                <div className="w-2/12">Quantity</div>
                                <div className="w-2/12">Price</div>
                                <div className="w-2/12  text-indigo-600">Total</div>
                            </div>
                        <div className="flex items-center flex-col ">
                            {items && items.map(i => <div className="flex text-sm rounded-xl p-2 items-center text-gray-700 w-full" key={i.id}>
                                <div className="w-4/12">{i.prod.split("_")[1]}</div>
                                <div className="w-2/12">{i.unit}</div>
                                <div className="w-2/12">{i.quantity}</div>
                                <div className="w-2/12">{i.price}$</div>
                                <div className="w-2/12  text-indigo-600">{i.total}$</div>
                            </div>)}
                        </div>
                        {generalTotal !== 0 && <div className="flex rounded-xl p-2 items-center bg-gray-100 w-full">
                                <div className="w-10/12"></div>
                                <div className="w-2/12 font-semibold text-indigo-600">{generalTotal}$</div>
                        </div>}
                    </div>
                    <div className="w-4/12 h-fit mt-5 rounded-xl bg-white p-4">
                        <p className="text-lg">Add something sold</p>
                        <small className="mb-5 text-gray-500">Fill the form bellow to tell what is sold and how.</small>
                        <select className="h-10 outline-none text-gray-700 focus:ring-2 focus:ring-black transition-all duration-500 mt-2 bg-gray-100 rounded-xl border w-full px-2"  onChange={handleChange}  name='prod'>
                            <option defaultChecked className="text-gray-700">Choose product</option>
                        {products?.length > 0 && products.map(c => <option value={c.id+"_"+c.name}  className="p-2 rounded-xl  hover:ring-gray-200 text-gray-700 cursor-pointer transition-all duration-500 hover:bg-gray-50" key={c.name}>
                                {c.name}
                            </option>)}
                        </select>
                        <div className="flex gap-3">
                            <TextInput  placeholder="Price" value={price} onChange={handleChange} name='price'/>
                            <TextInput  placeholder="Quantity" value={quantity} onChange={handleChange} name='quantity'/>
                            <TextInput  placeholder="unit" value={unit} onChange={handleChange} name='unit'/>
                        </div>
                        {/* <TextInput  value={date} type="date" onChange={handleChange} name='date'/> */}
                        <PrimaryButton className="mt-3 mb-3" onClick={onAddItem}>Add item</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
}