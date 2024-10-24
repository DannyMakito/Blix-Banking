'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';




const Authform = ({type}:{type:string}) => {
 const [user, setUser] = useState(null);
 const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
 
  


 const formSchema = authFormSchema(type);

   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
setisLoading(true)

try {
  //sign up with appwrite & create plaid token
  if(type === 'sign-up'){
    const newUser = await signUp(data);

    setUser(newUser);
  }


  if(type === 'sign-in'){
    const response = await signIn({
    email: data.email,
    password : data.password,

   })

   if(response) router.push('/')
  }
  

} catch (error) {
  console.log(error);
}
finally{
  
setisLoading(false);
}

  }

  return (
   <section className='auth-form'>
        <header className='flex flex-col'>
        <Link href='/'
                className='flex
                cursor-pointer
                items-center gap-1'
                >
                <Image src="/icons/logo.svg"
                width={34}
                height={34} 
                alt='blix logo'
            />

            <h1 className=' text-26 font-ibm-plex-serif font-bold text-black-1'>Blix Banking app</h1>
                </Link>

                
          <div className='flex flex-col gap-1 md:gap-3'>
              <h1 className='text-24 lg:text-36 font-semibold text-gray-950'>
               {user
               ? 'Link Account'
              : type==='sign-in'
              ? 'Sign in'
              :'sign Up'}
              </h1>

              <p className='text-16 font-normal text-gray-600'>
                  {user 
                  ?'Link your account to get started'
                :'Please enter your details'}
              </p>
          </div>

              
        </header>
        {user
        ?(
          <div className='flex flex-col gap-4'>
            {/*Plaid Link*/}


          </div>
        ) :(
          <>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/*uternry opperator to check type of form */}
                  {type==='sign-up'&&(
                    <>
                  
                 <div className='flex gap-4'>
                 <CustomInput 
                  control={form.control}
                  name="firstName"
                  label='First name'
                  placeholder='eg max'
                  />
                  <CustomInput 
                  control={form.control}
                  name="lastName"
                  label='Last name'
                  placeholder='eg Deo'
                  />
                    
                 </div>
                  <CustomInput 
                  control={form.control}
                  name="address1"
                  label='Address'
                  placeholder='Enter your specific address'
                  />
                  <CustomInput 
                  control={form.control}
                  name="city"
                  label='City'
                  placeholder='Enter your city'
                  />
                 <div className='flex gap-4'>
                 <CustomInput 
                  control={form.control}
                  name="state"
                  label='State'
                  placeholder='First name'
                  />
                  <CustomInput 
                  control={form.control}
                  name="postalcode"
                  label='Postal Code'
                  placeholder='eg 1234'
                  />
                 </div>

                      <div >
                          
                  <CustomInput 
                  control={form.control}
                  name="dateOfBirth"
                  label='Date of Birth'
                  placeholder='yyyy-mm-dd'
                  />
                  <CustomInput 
                  control={form.control}
                  name="ssn"
                  label='SSN'
                  placeholder='eg 1234'
                  />
                      </div>
          
                   
                    
                    </>
                  )}


                  <CustomInput 
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder='Enter your Email'
                  />

                  <CustomInput 
                  control={form.control}
                  name="password"
                  label='Password'
                  placeholder='Enter your password'
                  />
                  <div className='flex flex-col gap-4'>
                  <Button className='form-btn'  type="submit" disabled={isLoading}>
                    {
                      isLoading
                      ?(
                        <>
                        <Loader size={20} className='animate-spin' /> &nbsp;Laoding.... 
                        </>
                      ): type=== 'sign-in' ? 'sign in ': 'sign up'
                    }
                  </Button>

                  </div>
                </form>
    </Form>

    <footer className='flex justify-center gap-1'>
      <p className='text-14 font-normal text-gray-600 '>
        
        {type ==='sign-in'
        ?"Dont have an account?"
        :"Already have an account?"
      }
      <Link className='form-link' href={type==='sign-in' ? '/sign-up'  : '/sign-in' }>
       {type==='sign-in' ? ' Sign up'  : 'Sign in' }
      </Link>

      </p>

    </footer>
          </>
        )
      }
                    

   </section>
  )
}

export default Authform