import React, {useEffect, useState} from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Switch } from '@headlessui/react'
import { useForm } from 'react-hook-form';
import AlertModule from '../component/alertModule';
import { apiRequest } from '../utils/apiRequest';
import clsx from 'clsx';
import axios from 'axios';
import { axiosInstance } from '../utils/axiosInstance';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function CreateAccout() {
    const [agreed, setAgreed] = useState(false);

    const { register, handleSubmit, setError, formState:{errors}, reset } = useForm({
        defaultValues:{
            firstName:"",
            lastName:"",
            accBalance:"",
            mobileNo:"",
            email:"",
            address:''
        }
    });
    const [flag, setFlag] = useState(false);
    const[imagePreview, setImagePreview] = useState(null);
    const[imageData, setImageData] = useState(null);
       const formData = new FormData();

    const handleSelectImg = (event) => {
       let file = event.target.files[0]  
       setImagePreview(URL.createObjectURL(file));
       setImageData(file);
    }
    
    const onSubmit = async(data) => {
        const {address, ...rest} = data;
        rest.accBalance = Number(data.accBalance);
        Object.keys(rest).forEach((key) => {
            formData.append(key,rest[key])
        });

        formData.append('image', imageData)
       try {
        const res = await axiosInstance.post('addaccount', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
        const d = await res.data;
        setFlag(true)
            reset();
            setImagePreview(null)
       } catch (error) {
        const errorData = await error.response?.data;
        if(errorData){
            Object.keys(errorData).forEach((fieldName) => {
                setError(fieldName, {
                  type: 'server',
                  message: errorData[fieldName]
                });
              });
        }
        console.log('error', error)
       }
        
        
    }


    return (
        <>
   
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create New Account</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Aute magna irure deserunt veniam aliqua magna enim voluptate.
          </p>
        </div>
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  {...register('firstName')}
                  id="firstName"
                  className={classNames(
                    errors?.firstName ? "ring-red-600 ring-2" : "",
                    "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6")}
                />
              </div>
              {errors?.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  id="lastName"
                  {...register('lastName')}
                  className={classNames(
                    errors?.lastName ? "ring-red-600 ring-2" : "",
                    "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6")}
                />
              </div>
              {errors?.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                Deposite Amount
              </label>
              <div className="mt-2.5">
                <input
                  type="number"
                  id="accBalance"
                  placeholder='Rs.'
                 {...register('accBalance')}
                  className={classNames(
                    errors?.accBalance ? "ring-2 ring-red-500":"",
                    "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  )}
                />
              </div>
              {errors?.accBalance && <p className='text-red-500'>{errors.accBalance.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                mobile No
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  id="mobileNo"
                  placeholder='+91'
                  {...register('mobileNo')}
                  className={classNames(
                    errors?.mobileNo ? "ring-red-600 ring-2" : "",
                    "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  )}
                />
              </div>
              {errors?.mobileNo && <p className='text-red-500'>{errors.mobileNo.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={classNames(
                    errors?.email ? "ring-2 ring-red-500" : "",
                    "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  )}
                />
              </div>
              {errors?.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2.5 flex gap-x-3">
              <img className="h-14 w-14 rounded-full" src={imagePreview != null? imagePreview : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" />
                <input
                // accept='im'
                  type="file"
                  id="image"
                  onChange={handleSelectImg}
                  name='image'
                //   {...register('image')}
                  className={classNames(
                    errors?.photo ? "ring-2 ring-red-500" : "",
                    "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  )}
                />
              </div>
              {errors?.photo && <p className='text-red-500'>{errors.photo.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2.5">
                <textarea
                  
                  id="address"
                  {...register('address')}
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>
            <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className={classNames(
                    agreed ? 'bg-indigo-600' : 'bg-gray-200',
                    'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  )}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      agreed ? 'translate-x-3.5' : 'translate-x-0',
                      'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </div>
              <Switch.Label className="text-sm leading-6 text-gray-600">
                By selecting this, you agree to our{' '}
                <a href="#" className="font-semibold text-indigo-600">
                  privacy&nbsp;policy
                </a>
                .
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <AlertModule open={flag} setOpen={setFlag}/>
      </>
    )
}

export default CreateAccout