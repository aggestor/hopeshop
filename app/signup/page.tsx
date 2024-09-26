"use client"

import GoBack from "@/components/GoBack"
import LightLink from "@/components/LightLink"
import PrimaryButton from "@/components/PrimaryButton"
import TextInput from "@/components/TextInput"
import useForm from "@/hooks/useForm"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignUp(){
    const [{name,email,whatsapp,password}, handleChange] = useForm({email:'', password : '',name : "", whatsapp: ""})
    return <div className="h-[80%] w-[90%]">
        <div className="w-full">
            <GoBack/>
        </div>
        <h1 className="mt-3 text-3xl text-cyan-600 font-semibold">Welcom to Butik</h1>
        <h2 className="mt-1 mb-4 text-xl">Create an account to get started</h2>
        <form className="mt-8 w-full">
                <TextInput label="Name" placeholder="Your name" value={name} onChange={handleChange} name='name'/>
                <TextInput label="Whatsapp" placeholder="Your Whatsapp" value={whatsapp} onChange={handleChange} name='whatsapp'/>
                <TextInput label="Email" placeholder="Email" value={email} onChange={handleChange} name='email'/>
                <TextInput label="Password" placeholder="Password" value={password} type="password"  onChange={handleChange} name='email'/>
                <small>By proceeding, you  agree with <Link href='/terms' className="text-cyan-600">our terms of use and privacy policy</Link>, you also consent to get calls, WhatsApp or SMS messages, including by automated means, from Butik and its affiliates to the number provided. </small>
                <PrimaryButton className="mt-3" full>
                    Create account
                </PrimaryButton>
                <fieldset className="border-t my-3">
                    <legend className="mx-auto px-2">or</legend>
                </fieldset>
                <LightLink href="/signin" className="mt-3" full>
                    Sign in
                </LightLink>
        </form>
    </div>
}