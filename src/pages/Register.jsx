import React from 'react'
import logo from "../assets/bank_logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { classNames } from '../utils/classNames'
import { axiosInstance } from '../utils/axiosInstance'
import { Bounce, ToastContainer } from 'react-toastify'
import { toastMessage } from '../utils/toastMessage'

const Register = () => {

    const {register, getValues, handleSubmit, setError, control, reset, formState:{errors}} = useForm({
        defaultValues:{
            username:"",
            email:"",
            role:"",
            password:"",
            confirm_password:""
        }
    });

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const {confirm_password, role, ...rest} = data;
        rest.role = [role.toLowerCase()];

        try {
            const response = await axiosInstance.post('signup', rest);
            const data = await response.data;
            toastMessage(data.message, 'success');

            const timeout = setTimeout(() => {
                navigate('/login')
                reset()
                clearTimeout(timeout)
            },5000)
        } catch (error) {
            const errorData = await error.response?.data;
            console.log('errorData', errorData)
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
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-14 w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
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
          <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
                <input
                  id="name"
                  type="text"
                  {...register("username", {required:"shouldn't be blank"})}
                  placeholder='User Name'
                  className="block w-full rounded-t-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.username && <span className='err'>{errors.username.message}</span>}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="">
                <input
                  id="email"
                  type="email"
                  {...register("email", {required:"shouldn't be blank"})}
                  placeholder='Email'
                  className="block w-full border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <span className='err'>{errors.email.message}</span>}
              </div>
            </div>
            <div>
            <label htmlFor="mySelect" className='sr-only'>Role:</label>
            <Controller
                name="role"
                control={control}
                defaultValue=""
                render={({ field }) => (
                        <select {...field} id="role"
                        {...register('role', {required:"shouldn't be blank"})}
                        className={classNames(!!field?.value ? "" : "text-slate-400", "block w-full border-0 py-1.5 px-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6")}
                        onChange={field.onChange}
                        >
                            <option value=""  disabled>ROLE</option>
                            {["ADMIN","USER","MODERATOR"].map((x) => {
                                return <option key={x} value={x} className='text-gray-900'>{x}</option>
                            })}
                        </select>
                    )}
            />
            {errors.role && <span className='err'>{errors.role.message}</span>}
            </div>

            <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
              
              </div>
                <input
                  id="password"
                  {...register("password", { required: 'Password is required', pattern:'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$' })}
                  placeholder='Password'
                  type="password"
                  className="block w-full  border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <span className='err'>{errors.password.message}</span>}
            <div>
                <label htmlFor="password" className="sr-only">
                 Confirm Password
                </label>
              </div>
                <input
                  id="confirm-password"
                  {...register("confirm_password", {
                    required: 'Confirm Password is required',
                    validate: value => value === getValues('password') || 'Passwords do not match'        
                })}
                  type="password"
                  placeholder='Confirm-Password'
                  className="block w-full rounded-b-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirm_password && <span className='err'>{errors.confirm_password.message}</span>}

            <div>
              <button
                type="submit"
                className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            already register?{' '}
            <Link to={"/login"} replace href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
  )
}

export default Register
