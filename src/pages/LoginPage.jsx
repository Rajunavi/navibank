import React from 'react'
import logo from "../assets/bank_logo.png"
import { Link, NavLink, useNavigate, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Bounce, ToastContainer } from 'react-toastify'
import { axiosInstance } from '../utils/axiosInstance'
import { toastMessage } from '../utils/toastMessage'
import { useLoacalStorage } from '../utils/useLoacalStorage'

const LoginPage = () => {
    const {register, handleSubmit, formState:{errors}, setError, reset} = useForm({
        defaultValues:{
            username:'',
            password:''
        }
    });
    const navigate = useNavigate()

    const [storedValue, setValue] = useLoacalStorage('token', null)

    const onSubmit = async(data) => {
        console.log('data', data)

        try {
            const response = await axiosInstance.post('signin', data);
            const d = await response.data;
            toastMessage("Successfully login", 'success');
            setValue(d?.accessToken)
            const timeout = setTimeout(() => {
                // navigate('/')
                reset()
                clearTimeout(timeout)
            },5000)
        } catch (error) {
            const errorData = await error.response?.data;
            console.log('errorData', error)
            if(errorData?.message) toastMessage(errorData.message,"error")
        if(errorData){
            Object.keys(errorData).forEach((fieldName) => {
                setError(fieldName, {
                  type: 'server',
                  message: errorData[fieldName]
                });
              });
        }
        } 
    }


    if(storedValue) return <Navigate to={'/'} />
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-14 w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
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
        />
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="sr-only">
                User name
              </label>
              <div>
                <input
                 id='name'
                 {...register('username', {required:"shouldn't be blank"})}
                 placeholder='User Name'
                 type='text'
                  className="block w-full rounded-t-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.username && <span className='err'>{errors.username.message}</span>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
              
              </div>
              <div>
                <input
                  id="password"
                 {...register('password', {required:"shouldn't be blank", pattern:"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",})}
                  type="password"
                  placeholder='Password'
                  className="block w-full rounded-b-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <span className='err'>{errors.password.message}</span>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full mt-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to={"/register"} replace href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
  )
}

export default LoginPage
