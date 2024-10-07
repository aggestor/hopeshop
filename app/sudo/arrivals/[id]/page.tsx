"use client"
import { BsArrow90DegDown, BsAt, BsBoxes, BsCalendar2, BsCheck, BsChevronDown, BsClockHistory, BsInfoCircle, BsListStars, BsPeople, BsPhone, BsPlus, BsToggleOff, BsToggleOn, BsUpload } from "react-icons/bs";
import GoBack from "../../components/GoBack";
import { useEffect, useState } from "react";
import TextInput from "@/components/TextInput";
import useForm from "@/hooks/useForm";
import PrimaryButton from "@/components/PrimaryButton";
import User from "@/services/User";
import { Arrival as tArr,ProductInfo } from "@/types";
import Reload from "../../components/Reload";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Ok, Oups } from "@/utils/emitter";
import DeleteBtn from "../../components/DeleteBtn";
import Arrival from "@/services/Arrival";
import { formatToAgo, formatToReadableDate } from "@/utils/format-dates";
import { FaTruckLoading, FaWeight } from "react-icons/fa";
import Product from "@/services/Product";

export default function ArrivalPage(){
    const [arrival, setArrrival] =  useState<tArr>()
    const [products, setProducts] = useState<ProductInfo[]>([])
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showInfos, setShowInfos] = useState(false)
    const [deletePopup,setDeletePopup] = useState(false)
    const [isDelete,setIsDelete] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [{name,kg,cbm,box,description,date}, handleChange,setDefault] = useForm({name:'',description:'',kg:'',cbm:'',box:'',date:new Date().toISOString().split('T')[0]})
    const [{quantity,selling,purchase,display,obs,unit,prod}, onChange] = useForm({obs:'',quantity:'',selling:'',purchase:'',display:'', unit:'',prod:''})
    const params = useParams()
    const router = useRouter()
    const onUpdate = async() =>{
        const result = await Arrival.update(params.id as string,{name,kg,cbm,box,description,date})
        if(result.status == 201){
            Ok(result.data.message)
            setArrrival(result.data.arrival)
            const ar :tArr = result.data.arrival
            setAr(ar)
        }else if(result.response?.status == 400){

        }
    }
    const onCreate = async () =>{
        const result = await Arrival.addItem(params.id as string, {quantity,selling,purchase,display,obs,unit,prod})
        if(result.status == 201){
            Ok("Item added successfully !!")
            getItems()
        }else if(result.response?.status == 400){

        }
    }
    const setAr = (ar : Record<string,any>) =>{
        setDefault({
            name : ar.name,
            description : ar.description,
            date: ar.loadedAt.split("T")[0],
            cbm: ar.volume,
            kg:ar.weight,
            box:ar.boxes,
        })
    }
    const getArrival = async () =>{
        const u = await Arrival.get(params.id as string)
        if(u.status == 200){
            setArrrival(u.data.arrival)
            const ar :tArr = u.data.arrival
            setAr(ar)
        }
        setLoading(false)
    }
    const getProducts = async () =>{
        const result = await Product.get()
        if(result.status == 200){
            setProducts(result.data.prods)
        }
    }
    const getItems = async () =>{
        const result = await Arrival.getItems(params.id as string)
        if(result.status == 200){
            setItems(result.data.items)
        }
    }
    const blockArrival =  async () =>{
        const rs = await Arrival.block(params.id as string)
        if(rs.status == 201){
            getArrival()
            Ok("Arrival blocked successfully")
        }else{
            Oups("Something went wrong ")
        }
    }
    const unBlockArrival =  async () =>{
        const rs = await Arrival.unblock(params.id as string)
        if(rs.status == 201){
            getArrival()
            Ok("Arrival unblocked successfully")
        }else{
            Oups("Something went wrong ")
        }
    }
    const deleteUser =  async () =>{
        const rs = await User.delete(params.id as string)
        if(rs.status == 201){
            Ok("Arrival deleted successfully")
            router.push('/sudo/arrivals')
        }else{
            Oups("Something went wrong ")
        }
    }
    useEffect(()=>{
        getArrival().then(()=>getProducts().then(()=>getItems()))
    },[])
    return <div className="w-[97.5%] mx-auto p-3 rounded-lg h-full">
        <div className="w-[95%] mx-auto h-full">
            <div className="w-full mx-auto rounded-xl relative p-4 bg-white">
                <div className="flex w-full justify-between">
                    <div className="flex  items-center gap-3">
                    <GoBack/>
                        <span className="h-8 border-l">  </span>
                        <span className="w-10 h-10 rounded-xl border grid place-items-center"><BsArrow90DegDown className="w-6 h-6"/></span> 
                        <h2 onClick={()=> setShowInfos(d => d = !d)} className="text-xl flex gap-5 items-center">{arrival?.name || "Wait, Loading..."} <span className="text-sm flex items-center gap-2 p-2 bg-gray-100 cursor-pointer hover:bg-gray-50 transition-all duration-500 hover:ring-4 hover:ring-gray-300 rounded-xl border">Show more <BsChevronDown className={`w-4 h-4${showInfos && 'transform rotate-180'} transition-all duration-500`}/></span></h2>
                    </div>
                    <div className="w-5/12 flex gap-3  items-center justify-end">
                        <Reload onClick={getArrival}/>
                        <DeleteBtn onBlur={()=> !isDelete && setDeletePopup(false)}  onClick={()=>setDeletePopup(d => d = !d)}/>
                        <span  className="h-10 bg-black text-white hover:bg-gray-900 transition-all cursor-pointer duration-500 hover:ring-4 hover:ring-gray-400 rounded-xl px-2 flex items-center" onClick={()=>setShowForm(d => d = !d)}><BsPlus className="w-6 h-6"/>Add Product</span>
                        {deletePopup && <div tabIndex={0} data-aos='fade-in' data-aos-duration='500' className="w-[400px] p-3 h-48 bg-white ring-4 ring-red-300 rounded-xl absolute top-20 shadow-xl right-0">
                            <p className="text-xl">Really ?</p>
                            <p className="text-gray-700 my-2 text-sm">Deleting arrival <b>{arrival?.name}</b> will completely erase all its information and will be classified as deleted user. This means not cant search anything based on his informations.</p>
                            <div className="w-full flex items-center gap-3 h-fit mt-2">
                                <span onClick={()=> setDeletePopup(false)} className="rounded-xl p-1.5 border hover:bg-gray-50 hover:ring-4 hover:ring-gray-100 transition-all duration-500 cursor-pointer bg-gray-100">Cancel</span>
                                <span onMouseEnter={()=>setIsDelete(true)} onMouseLeave={()=>setIsDelete(false)} onClick={deleteUser} className="rounded-xl p-1.5 hover:ring-4 hover:ring-red-300 transition-all duration-500 cursor-pointer hover:bg-red-700 text-white bg-red-600">Yes, Delete</span>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
           {showInfos && <div data-aos='fade-in' data-aos-duration='1500' className="flex w-full gap-3">
            <div className="w-8/12   h-fit transition-all duration-500 mt-5 rounded-xl bg-white p-4">
                    <div className="grid grid-cols-12 gap-3">
                        <div className=" col-span-7 mb-4 mt-1">
                            <h2 className="text-xl flex text-indigo-600 items-center"><span className="flex items-center justify-center h-8 w-8 border rounded-lg bg-gray-100  mr-4"><BsUpload/></span>Loaded on {formatToReadableDate(arrival?.loadedAt)}</h2>
                            <p className="flex items-center my-2"><span className="flex items-center justify-center h-8 w-8 border rounded-lg bg-gray-100 mr-4"><BsBoxes/></span><span className="text-gray-600">Packed in :  {arrival?.boxes} boxes</span></p>
                            <p className="flex items-center my-2"><span className="flex items-center justify-center h-8 w-8 border rounded-lg bg-gray-100 mr-4"><FaTruckLoading/></span><span className="text-gray-600">Volume of  {arrival?.volume}</span></p>
                            <p className="flex items-center my-2"><span className="flex items-center justify-center h-8 w-8 border rounded-lg bg-gray-100 mr-4"><FaWeight/></span><span className="text-gray-600">Weight of  {arrival?.weight}</span></p>
                            {arrival?.status == 1 ? <p className="flex items-center my-2"><span onClick={blockArrival} className="flex cursor-pointer hover:ring-4 hover:ring-green-300 transition-all duration-500 items-center justify-center h-8 w-8 border border-green-400 rounded-lg bg-green-100 text-green-600 mr-4"><BsToggleOn  className="h-5 w-5"/></span><span className="text-green-600 font-semibold">Active</span></p> : 
                            <p className="flex items-center my-2"><span onClick={unBlockArrival} className="flex cursor-pointer hover:ring-4 hover:ring-red-300 transition-all duration-500 items-center justify-center h-8 w-8 border border-red-400 rounded-lg bg-red-100 text-red-600 mr-4"><BsToggleOff className="w-5 h-5" /></span><span className="text-red-600 font-semibold">Banned</span></p> }
                            <p className="flex items-center my-2"><span className="flex items-center justify-center h-8 w-8 border rounded-lg bg-gray-100 mr-4"><BsCalendar2/></span><span className="text-gray-600">Last update :  {formatToAgo(arrival?.updatedAt)}</span></p>
                            <p className="flex items-center my-2"><span className="flex items-center justify-center h-8 w-8 border rounded-lg bg-gray-100 mr-4"><BsClockHistory/></span><span className="text-gray-600">Createed {formatToAgo(arrival?.createdAt)}</span></p>
                            <p className="flex items-center my-2"><span className="flex items-center justify-center h-8 w-8 border rounded-lg bg-gray-100 mr-4"><BsInfoCircle/></span><span className="text-gray-600">{arrival?.description}</span></p>
                        </div>
                        <div className="col-span-5 grid place-items-center h-full">
                            <div className="w-72 rounded-xl overflow-hidden h-72">
                                <Image className="bg-contain w-full h-full" src={'/images/loading.webp'} width={400} height={100} alt={"A guy just loading goods"}/>
                            </div>
                        </div>
    
                    </div>
                </div>
                <div className="flex flex-col w-4/12 h-fit mt-5 rounded-xl bg-white p-4">
                    <p className="text-lg">Update  {arrival?.name}</p>
                    <small className="mb-2 text-gray-500">Change the infos in the fields below to update an arrival.</small>
                    <TextInput  placeholder="Full name" value={name} onChange={handleChange}  name='name'/>
                    <div className="flex gap-3">
                        <TextInput  placeholder="Weight" value={kg} onChange={handleChange} name='kg'/>
                        <TextInput  placeholder="Volume" value={cbm} onChange={handleChange} name='cbm'/>
                        <TextInput  placeholder="Boxes" value={box} onChange={handleChange} name='box'/>
                    </div>
                    <TextInput  placeholder="Short description" value={description} onChange={handleChange} name='description'/>
                    <TextInput  value={date} type="date" onChange={handleChange} name='date'/>
                    <PrimaryButton className="mt-3" onClick={onUpdate}>Update arrival</PrimaryButton>
                </div>
           </div>}
           <div className="w-full mt-3 flex gap-3">
                <div className={`${showForm ? 'flex' : 'hidden'} flex-col w-4/12 h-fit mt-3 rounded-xl bg-white p-4`}>
                    <p className="text-lg">Add products on   {arrival?.name}</p>
                    <small className="mb-2 text-gray-500">Fill the form bellow to add a new product to this arrival</small>
                    <select className="h-10 outline-none text-gray-700 focus:ring-2 focus:ring-black transition-all duration-500 mt-2 bg-gray-100 rounded-xl border px-2"  onChange={onChange}  name='prod'>
                        <option defaultChecked className="text-gray-700">Choose product</option>
                    {products?.length > 0 && products.map(c => <option value={c.id}  className="p-2 rounded-xl  hover:ring-gray-200 text-gray-700 cursor-pointer transition-all duration-500 hover:bg-gray-50" key={c.name}>
                            {c.name}
                        </option>)}
                    </select>
                    <div className="flex gap-3">
                        <TextInput  placeholder="Purchase" value={purchase} onChange={onChange} name='purchase'/>
                        <TextInput  placeholder="Sellind" value={selling} onChange={onChange} name='selling'/>
                        <TextInput  placeholder="Display" value={display} onChange={onChange} name='display'/>
                    </div>
                    <div className="flex gap-3">
                        <TextInput  placeholder="Quantity" value={quantity} onChange={onChange} name='quantity'/>
                        <TextInput  placeholder="Units" value={unit} onChange={onChange} name='unit'/>
                    </div>
                    <TextInput  placeholder="Observration" value={obs} onChange={onChange} name='obs'/>
                    <PrimaryButton className="mt-3" onClick={onCreate}>Add item</PrimaryButton>
                </div>
                <div className={`${showForm ? 'w-8/12' : 'w-full'} transition-all duration-500 mt-3 rounded-xl bg-white p-4`}>
                    <div className="flex items-center bg-gray-100 p-2 rounded-xl w-full">
                    <div className="w-1/12">#</div>
                        <div className="text-sm text-ellipsis overflow-hidden line-clamp-1 w-3/12">Prod</div>
                        <div className="w-2/12 font-semibold text-ellipsis overflow-hidden line-clamp-1">Prices</div>
                        <div className="w-1/12 text-sm">Qty</div>
                        <div className="w-3/12 font-semibold">Math</div>
                        <div className="w-2/12 text-sm text-ellipsis overflow-hidden line-clamp-1">Last update</div>
                    </div>
                    {items.length > 0 && items.map((u,i) => <Link href={'/sudo/arrivals/'+params.id+'/items/'+u.id} className="flex items-center hover:bg-gray-50 hover:ring-4 hover:ring-gray-200 my-3 transition-all duration-500 hover:text-base text-gray-700  p-2  rounded-xl" key={u.name}>
                        <div className="w-1/12">{i+1}</div>
                        <div className="text-ellipsis text-sm overflow-hidden line-clamp-1 w-3/12">{u.product.name}</div>
                        <div className="w-2/12 font-semibold  text-ellipsis overflow-hidden line-clamp-1"> {u.purchasePrice}$ | <span className="text-indigo-600">{u.sellingPrice + '$ - '+u.displayPrice}$</span></div>
                        <div className="w-1/12 text-sm">{u.quantity} pcs</div>
                        <div className="w-3/12 font-semibold">{Number(u.purchasePrice) * Number(u.quantity)}$ | <span className="text-indigo-600">{Number(u.sellingPrice) * Number(u.quantity) + '$ ~ '+Number(u.displayPrice) * Number(u.quantity)}$</span></div>
                        <div className="w-2/12 text-sm text-ellipsis overflow-hidden line-clamp-1">{formatToAgo(u.updatedAt)}</div>
                    </Link>)}
                </div>
           </div>
        </div>
    </div>
}