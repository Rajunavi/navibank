import React,{ useState, Fragment} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomerDetails from './CustomerDetails';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../utils/axiosInstance';
import { addCustomer, updateCustomer } from '../redux/reducers/customerReducers';
import { debounce } from '../utils/debounce';

function Transaction() {
    const {customer, customers} = useSelector(state => state.customers);
    const [searchCust, setSearchCust] = useState([]);
    const dispatch = useDispatch()

    

    const searchAcc = async(accNo) => {
        try {
            const res = await axiosInstance.get(`search?accNo=${accNo}`)
            const data = await res.data;
            setSearchCust(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    



    const handleChange = debounce(text => {
        searchAcc(Number(text))
    },1000)
  return (
    <div className='h-screen'>
        {customer ? <CustomerDetails /> : 
        <div className='h-screen w-full flex flex-col items-center pt-24'>
            <div className='flex items-center'>
            <p className='text-black mr-3 font-semibold'>Ac No: </p>
            <input type='search' id='accNo' onChange={(e) => handleChange(e.target.value)}  placeholder='Search' className='border-2 border-stone-700 rounded-lg px-2 py-1 w-64' />
            </div>
           {searchCust.length > 0 && <div className='bg-slate-300 w-80 mt-2 py-2 overflow-y-scroll'>
            {searchCust.map((item) => (<div onClick={() => dispatch(addCustomer(item.id))} className='mx-auto w-[95%] my-1 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 hover:bg-indigo-600'>
            <span className="flex items-center">
                <img src={`http://localhost:8086/api/bank/account/profileImage/${item.id}`} alt="" className="h-8 w-8 flex-shrink-0 rounded-full" />
                <span className="ml-3 block truncate font-semibold">{`${item.firstName} ${item.lastName}`}</span>
              </span>
            </div>))}
            </div>}
            
          
        </div>
        }
    </div>
  )
}

export default Transaction