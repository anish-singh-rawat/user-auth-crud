'use client'
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

const SignUp = () => {
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [loader, setLoader] = useState<boolean>(false);
  const [signUpState, setSignUpStatus] = useState<any>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNo: '',
    address: '',
    course: '',
    role: 'user'
  })
  const submitForm = async (e: any) => {
    e.preventDefault();
    setLoader(true)
    try {
      await signupSchema.validate(signUpState, { abortEarly: false });
      const res = await axios.post("/api/userAuth/Register", signUpState)
      const response = res.data;
      if (response.status === 201) {
        toast.success("Successfully registered !")
        setValidationErrors({})
        setSignUpStatus({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          contactNo: '',
          address: '',
          course: null,
          role: 'user'
        })
        setLoader(false)
        return;
      }
      if (response.status === 400) {
        setValidationErrors({})
        toast.error("User already exit choose diffrent email !")
        setLoader(false)
        return;
      }
      if (response.status === 402) {
        toast.error("Please select any Course !")
        setLoader(false)
        return;
      }
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
    address: Yup.string()
      .min(4, "minimum 8 character should be there !")
      .required("address cannot be empty!"),
    contactNo: Yup.string()
      .min(10, "minimum 10 character should be there !")
      .max(15, "maximum 15 character should be there !")
      .required("password cannot be empty!"),
  });
  const fieldNames =
    ['name', 'email', 'password', 'confirmPassword', 'contactNo', 'address'];

  return (
    <>
      <ToastContainer />
      <div className="parent-div  py-1 sm:max-w-xl mx-auto text-center">
        <div className="relative mt-4 bg-slate-700 shadow-md sm:rounded-lg text-left w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto">
          <div className="text-center bg-slate-600 p-2 rounded-t-md">
            <span className="text-2xl font-bold bg-slate-600">
              Add Users Here
            </span>
          </div>

          <form onSubmit={submitForm} >
            <div className="grid p-3 grid-cols-1 sm:grid-cols-2 gap-4">
              {fieldNames.map((fieldName) => (
                <div key={fieldName} className="py-2 px-2">
                  <label className="mt-1 text-white block font-semibold">
                    {fieldName === 'confirmPassword' ? 'Confirm Password' : `User ${fieldName}`}
                  </label>
                  <input
                    type={(fieldName.includes('password') || fieldName === 'confirmPassword') ? 'password' : 'text'}
                    placeholder={fieldName === 'confirmPassword' ? 'Confirm Password' : fieldName}
                    className="border w-full h-10 bg-slate-600 px-2 py-2 mt-1 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                    value={signUpState[fieldName]}
                    onChange={(e) => setSignUpStatus({ ...signUpState, [fieldName]: e.target.value })}
                  />
                  {validationErrors[fieldName] && <p className="text-red-700 mt-1">{validationErrors[fieldName]}</p>}
                </div>
              ))}
            </div>
            <div className="col-span-2 mt-2">
              <Box sx={{ minWidth: 10, marginRight: '30px' }}>
                <FormControl fullWidth className='bg-slate-600 mx-3'>
                  <InputLabel className='bg-slate-600'
                    id="demo-simple-select-label">Course</InputLabel>
                  <Select labelId="demo-simple-select-label"
                    id="demo-simple-select" required={true}
                    defaultValue={''}
                    label="Course" 
                    value={signUpState.course}
                    onChange={(e) =>
                      setSignUpStatus({
                        ...signUpState,
                        course: e.target.value
                      })
                    } >
                    <MenuItem value={'MERN'}>MERN</MenuItem>
                    <MenuItem value={'MEAN'}>MEAN</MenuItem>
                    <MenuItem value={'NEXT JS'}>NEXT</MenuItem>
                    <MenuItem value={'JAVA'}>JAVA</MenuItem>
                    <MenuItem value={'PYTHON'}>PYTHON</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="sm:col-span-2 p-3 flex justify-center items-baseline">
              {loader ? (
                <CircularProgress className='mt-4' />
              ) : (
                <button className="mt-4 bg-slate-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600" type="submit">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default SignUp