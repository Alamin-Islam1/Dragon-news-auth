'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
     const [isShowPassword, setIsShowPassword] = useState(false);
    const handleRegisterFunc =async(data)=>{
       console.log(data,'data');
       const {email, name, photo, password}= data;
       console.log(name, photo);
       
const {data: res, error } = await authClient.signUp.email({
    name: name, // required, The name of the user.
    email: email, // required, The email address of the user.
    password: password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
    image: photo, // An optional profile image of the user.
    callbackURL: "/", // An optional URL to redirect to after the user signs up.
});

console.log(res, error);
if(error){
  alert(error.message);
}
if(res){
  alert("Signup successful")
}
}
return (
        <div className='container mx-auto min-h-[80vh] flex justify-center items-center bg-slate-100'>
            <div className='p-4 rounded-xl bg-white'>
           <h2 className='font-bold text-3xl text-center mb-6'>
            Register your account 
           </h2>
           <form className='space-y-4' onSubmit={handleSubmit(handleRegisterFunc)}>
            <fieldset className="fieldset">
  <legend className="fieldset-legend">Name</legend>
  <input type="text" className="input" placeholder="Type you name"  {...register("name",{ required: 'Name field is required'} )}/>
</fieldset>
{errors.name && <p className='text-red-500'>{errors.name.message}</p>}
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Photo Url</legend>
  <input type="text" className="input" placeholder="Type you ptoto url"{...register("photo",{ required: 'photo url field is required'})} />
</fieldset>
{errors.photo && <p className='text-red-500'>{errors.photo.message}</p>}
 <fieldset className="fieldset">
  <legend className="fieldset-legend">Email</legend>
  <input type="email" className="input" placeholder="Type you Email"  {...register("email",{ required: 'email field is required'} )}/>
</fieldset>
{errors.email && <p className='text-red-500'>{errors.email.message}</p>}
  <fieldset className="fieldset relative">
  <legend className="fieldset-legend">Password</legend>
  <input type={isShowPassword ? "text":"password"} className="input" placeholder="Type you Password"{...register("password",{ required: 'password field is required'})} />
  <span className='absolute right-9 top-4 cursor-pointer' onClick={()=>setIsShowPassword(!isShowPassword)}> {isShowPassword ? <FaEye></FaEye>:<FaEyeSlash />}</span>
  
</fieldset>
{errors.password && <p className='text-red-500'>{errors.password.message}</p>}
<button className="btn bg-slate-800 text-white w-full">Register</button>
           </form>
           <p className='mt-4'>Don't have an account? <Link className='text-blue-500' href={'/login'}>Login</Link></p>
            </div>
        </div>
    );
};

export default RegisterPage;