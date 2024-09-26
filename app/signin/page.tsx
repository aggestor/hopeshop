"use client"

import GoBack from "@/components/GoBack"
import LightLink from "@/components/LightLink"
import PrimaryButton from "@/components/PrimaryButton"
import TextInput from "@/components/TextInput"
import useForm from "@/hooks/useForm"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SingIn(){
    const [{email,password}, handleChange] = useForm({email:'', password : ''})
    return <div className="h-[75%] w-[90%]">
        <div className="w-full">
            <GoBack/>
        </div>
        <h1 className="mt-3 text-3xl font-semibold"><span className="text-cyan-600">Welcome back to Butik</span>, Sign in to your account.</h1>
        <form  className="mt-8 w-full">
                <TextInput label="Email" placeholder="Email" value={email} onChange={handleChange} name='email'/>
                <TextInput label="Password" placeholder="Password" value={password} type="password"  onChange={handleChange} name='email'/>
                <p>Forgot password ? <Link className="text-cyan-600" href={'/forgot-password'}>Reset password</Link></p>
                <PrimaryButton className="mt-3" full>
                    Sign in
                </PrimaryButton>
                <fieldset className="border-t my-3">
                    <legend className="mx-auto px-2">or</legend>
                </fieldset>
                <LightLink href="/signup" className="mt-3" full>
                    Sign up
                </LightLink>
        </form>
    </div>
}