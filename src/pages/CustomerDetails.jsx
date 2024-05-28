import React, {useState, Fragment, createRef} from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import toastr, { error, success } from 'toastr'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../utils/axiosInstance'
import { data } from 'autoprefixer'
import { toastMessage } from '../utils/toastMessage'
import { getCustomers, updateCustomer } from '../redux/reducers/customerReducers'


  

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

function CustomerDetails() {
    const {customer} = useSelector(state => state.customers);
    const [transaction, setTransaction]=useState(null);
    const dispatch = useDispatch()
    const ref = createRef()
   
    const handleTransaction = async(amount) => {
        const body = {
            amt:Number(amount),
            typeOfOp:transaction
        }
        
        
        try {
            const response = await axiosInstance.put(`transaction/${customer?.id}`, body)
            const data = await response?.data
            console.log('response', data.message)
            toastMessage(data.message,"success")
            const accBal = data?.message.slice(data?.message.indexOf(".")+1)
            let timeout = setTimeout(()=>{
                dispatch(updateCustomer(Number(accBal)));
                clearTimeout(timeout);
            },5000)
            
        } catch (error) {
            toastMessage(error?.response.data.error,"error")
        }finally{
            ref.current.value=""
        }


    }
    const transactionfn=(val)=>{
        setTransaction(val)
        
    }
  return (
    <>
    
    <div className='h-screen w-full flex items-center justify-center'>
        <div className='flex w-[80%] h-[60%]'>
        <img src={customer.imageUrl} alt="" className='object-cover object-center shadow-xl rounded-md' />
        <div className='py-10 px-14 w-[90%]'>
            <div className='shadow-lg pl-4 py-6 pr-44 rounded-lg'>
            <h3 className="font-semibold leading-7 tracking-tight text-gray-900 text-3xl">{customer.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600 my-2">{customer.email}</p>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">+91 {customer.mobile}</p>
            </div>
                <div className='pt-7'>

                  <p className='text-slate-400 text-lg font-semibold'><span className='text-black'>Account No: </span>{customer.accNo}</p>
                  <p className='text-slate-400 text-lg font-semibold'><span className='text-black'>Balance: </span>Rs.{customer.accBalance}</p>
                  <div className='flex w-[30%] justify-between my-4'>
                    <p className='underline text-indigo-500 hover:text-indigo-700 hover:font-semibold cursor-pointer' onClick={()=>transactionfn("Deposit")}>Deposit</p>
                    <p className='underline text-indigo-500 hover:text-indigo-700 hover:font-semibold cursor-pointer' onClick={()=>transactionfn("Withdraw")}>Withdraw</p>
                  </div>
                 {!!transaction &&  <div className='' >
                    <input ref={ref} type='text' placeholder='Rs.' className='border-2 px-3 py-1 rounded-md mr-2'/>
                    <button onClick={() => handleTransaction(ref.current?.value ? ref.current?.value : 0)} type='button' className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{transaction}</button>
                  </div>}
                </div>
        </div>
        </div>
    </div>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Bounce}
/></>
  )
}

export default CustomerDetails