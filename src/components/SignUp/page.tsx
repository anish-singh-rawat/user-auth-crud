'use client'
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

const SignUp = () => {
  const router = useRouter()
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [loader, setLoader] = useState<boolean>(false);
  const [signUpState, setSignUpStatus] = useState<any>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userImage : '',
    role: 'admin'
  })
  const submitForm = async (e: any) => {
    e.preventDefault();
    setLoader(true)
    try {
      await signupSchema.validate(signUpState, { abortEarly: false });
      const res = await axios.post("/api/adminAuth/Register", signUpState)
      const response = res.data;
      if (response.status === 201) {

        toast.success("Successfully registered Login now!")
        setValidationErrors({})
        setSignUpStatus({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          userImage : '',
          role: 'admin'
        })
        setLoader(false)
        router.push('/')
        return
      }
      if (response.status === 400) {
        setValidationErrors({

        })
        toast.error("User already exit choose diffrent email !")
        setSignUpStatus({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          userImage : '',
          role: 'admin'
        })
        setLoader(false)
      }
      setLoader(false)
    } catch (error) {
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
    name: Yup.string()
      .min(4, "minimum 4 character should be there !")
      .required("name cannot be empty!"),
    email: Yup.string()
      .email("Invalid email format")
      .required("email cannot be empty!"),
    password: Yup.string()
      .min(6, "minimum 6 character should be there !")
      .required("password cannot be empty!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("confirm password cannot be empty!"),
  });
  const fieldNames = ['name', 'email', 'password', 'confirmPassword'];

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-slate-200 text-gray-800 antialiased flex flex-col justify-center ">
        <div className="parent-div sm:max-w-xl mx-auto text-center">
          <div className="relative bg-slate-400 shadow-md sm:rounded-lg text-left w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto">
            <div className="text-center bg-indigo-500 p-2 rounded-t-md">
              <span className="text-2xl font-bold text-white">
                Register to your account
              </span>
            </div>
            <form onSubmit={submitForm}>
              <div className="py-6 px-8">
                {fieldNames.map(fieldName => (
                  <div key={fieldName}>
                    <label className="mt-3  block font-semibold">{fieldName === 'confirmPassword' ? 'Confirm Password' : `User ${fieldName}`}</label>
                    <input
                      type={(fieldName.includes('password') || fieldName === 'confirmPassword') ? 'password' : 'text'}
                      placeholder={fieldName === 'confirmPassword' ? 'Confirm Password' : fieldName}
                      className="border w-full h-10 px-3 py-2 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                      value={signUpState[fieldName]}
                      onChange={(e) => setSignUpStatus({ ...signUpState, [fieldName]: e.target.value })} />
                    {validationErrors[fieldName] &&
                      <p className="text-red-700 mt-1">{validationErrors[fieldName]}</p>}
                  </div>
                ))}

                <div>
                   <label className="mt-3  block font-semibold">Image </label>
                   <input
                      type='file'
                      className="border w-full h-10 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                      required={true}
                      onChange={(e) => setSignUpStatus({ ...signUpState, userImage : 
                      e.target.files![0] })} />
                </div>

                </div>
                <div className="flex justify-center items-baseline">
                  {
                    loader ? <CircularProgress className='mt-4' /> :
                      <button className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600" type="submit">Submit</button>
                  }
                </div>
                <div className='mt-3 text-sky-800 flex justify-center max-sm:mt-4 max-sm:flex-col max-sm:text-center'> already have an account ?
                  <Link href="/" className='mx-2'>LogIn now</Link>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default SignUp