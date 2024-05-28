import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomer, getCustomers } from '../redux/reducers/customerReducers'
import { useNavigate } from 'react-router-dom'



const AllCustomers = () => {

    const {customers, loading} = useSelector(state => state.customers);
    const dispatch = useDispatch();
    const navigation = useNavigate()

    const custDetails = (id) => {
      dispatch(addCustomer(id));
      navigation('/transaction')
    }


    if(loading) return <div className='h-screen w-full flex items-center justify-center'>
      <p>Loading...</p>
      </div>

  return (
    <div className="bg-white py-24 sm:py-32 mx-28">
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {customers.map((person) => (
            <li key={person.id} onClick={() => custDetails(person.id)}>
              <div className="flex items-center gap-x-6 p-5 shadow-lg rounded-md cursor-pointer hover:bg-slate-100">
                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{person.email}</p>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{person.mobile}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default AllCustomers
