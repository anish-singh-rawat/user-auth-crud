'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { CircularProgress } from '@mui/material';
import axiosInstance from '../../../axiosInstance/Instance';
import { useRouter } from 'next/navigation';

const ForgetPassword = () => {
    const router = useRouter()
    const [loader, setLoader] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<any>({});
    const [loginState, setLoginState] = useState<any>({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoader(true)

        try {
            await signupSchema.validate(loginState, { abortEarly: false });
            const res = await axiosInstance.put("/api/forgetPassword", loginState)
            const response = res.data;
            if (response.status === 200) {
                toast.success("Successfully Update your password Login Now!")
                setValidationErrors({})
                setLoginState({
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
                router.push('/')
                setTimeout(()=>{
                    setLoader(false)
                },500) 
                return;
            }
            if (response.status === 404) {
                setValidationErrors({})
                toast.error("Email does not exist !")
                setLoader(false)
                return;
            }
        }
        catch (error) {
            setLoader(false)
            if (error instanceof Yup.ValidationError) {
                const errors: any = {};
                error.inner.forEach((e: any) => {
                    errors[e.path] = e.message;
                });
                setValidationErrors(errors);
            }
        }
    }

    const signupSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("email cannot be empty!"),
        password: Yup.string()
            .required("password cannot be empty!"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords & confirm password must match")
            .required("confirm password cannot be empty!"),
    });
    return (
        <>
            <ToastContainer />
            <div className="min-h-screen  bg-slate-200 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
                <div className="parent-div  py-3 sm:max-w-xl mx-auto text-center">
                    <div className="relative mt-4 bg-slate-400 shadow-md sm:rounded-lg text-left w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto">
                        <div className="text-center p-2 bg-indigo-500 rounded-t-md">
                            <span className="text-2xl font-bold text-white">
                                Forget Password
                            </span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="py-6 px-8">
                                <label className="block font-semibold">User Email</label>
                                <input type="text" placeholder="Email" className="border w-full h-10 px-3 py-2 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md" value={loginState.email} onChange={(e) => setLoginState({ ...loginState, email: e.target.value })} />
                                {validationErrors.email && (
                                    <span className="text-red-700 text-sm">{validationErrors.email}</span>
                                )}

                                <label className="block mt-3 font-semibold">Password</label>
                                <input type="password" placeholder="Password" className="border w-full h-10 px-3 py-2 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                                    value={loginState.password} onChange={(e) => setLoginState({ ...loginState, password: e.target.value })}
                                />
                                  {validationErrors.password && (
                                    <span className="text-red-700 text-sm">{validationErrors.password}</span>
                                )}




                               <label className="block mt-3 font-semibold">
                                confirmPassword</label>
                                <input type="password" placeholder="Password" className="border w-full h-10 px-3 py-2 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                                    value={loginState.confirmPassword} onChange={(e) => setLoginState({ ...loginState, confirmPassword: e.target.value })}
                                />

                                {validationErrors.confirmPassword && (
                                    <span className="text-red-700 text-sm">{validationErrors.confirmPassword}</span>
                                )}


                                <div className="flex justify-between items-baseline">
                                    {
                                        loader ? <CircularProgress className='mt-4' /> :
                                            <button className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600">
                                                submit</button>
                                    }

                                    <Link href="/" className="text-sm ">
                                        Go back to Hoe
                                    </Link>
                                </div>

                                <div className='mt-3 text-sky-800 flex justify-center max-sm:mt-4 max-sm:flex-col max-sm:text-center'> don't have an account ?
                                    <Link href="/SignUp" className='mx-2'>Register now</Link>
                                </div>
                            </div>
                        </form >

                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword
