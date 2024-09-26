"use client"

import GoBack from "@/components/GoBack"
import LightLink from "@/components/LightLink"
import PrimaryButton from "@/components/PrimaryButton"
import TextInput from "@/components/TextInput"
import useForm from "@/hooks/useForm"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ForgotPassword(){
    const [{email}, handleChange] = useForm({email:''})
    return <div className="h-[75%] w-[90%]">
        <div className="w-full">
            <GoBack/>
        </div>
        <h1 className="mt-3 text-3xl text-cyan-600 font-semibold">Your forgot your Butik password</h1>
        <h2 className="mt-1 mb-4 text-xl">Provide us the email linked to your account to send you a link to reset yor password</h2>
        <form  className="mt-8 w-full">
                <TextInput label="Email" placeholder="Your linked email account" value={email} onChange={handleChange} name='email'/>
                <p>Dont have an account ? <Link className="text-cyan-600" href={'/signup'}>Create an account</Link></p>
                <PrimaryButton className="mt-3" full>
                    Send Reset Password Link
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