import { LoaderCircle, Lock, Mail } from 'lucide-react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { loginAccount } from '../lib/appwrite/auth';
import { useAuth } from '../context/AuthContextProvider';

function Login() {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    async function onSubmit(e) {
        e.preventDefault();
        try {
            setIsLoading(true)
            const formData = new FormData(e.target)
            const data = Object.fromEntries(formData.entries())
            const isAccountCreated = await loginAccount(data);

            if (isAccountCreated) {
                navigate('/')
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className='px-5 py-4 rounded w-full sm:border sm:shadow bg-white'>
            <h3 className='font-bold text-xl text-gray-500'>
                Login Account
            </h3>

            <div className='mt-5 space-y-4'>
                <div className='bg-white border border-indigo-200 rounded flex items-center p-2 gap-4'>
                    <label>
                        <Mail className='text-indigo-300' strokeWidth={1.5} />
                    </label>

                    <input
                        placeholder='Enter email'
                        className='w-full outline-none text-gray-500'
                        type="text"
                        name='email'
                    />
                </div>

                <div className='bg-white border border-indigo-200 rounded flex items-center p-2 gap-4'>
                    <label>
                        <Lock className='text-indigo-300' strokeWidth={1.5} />
                    </label>

                    <input
                        placeholder='Enter password'
                        className='w-full outline-none text-gray-500'
                        type="password"
                        name='password'
                    />
                </div>

                <button disabled={isLoading} className="p-2.5 bg-indigo-500 active:bg-indigo-600 text-gray-200 w-full rounded font-bold flex items-center justify-center gap-4 disabled:bg-gray-700">
                    {
                        isLoading && <LoaderCircle className='animate-spin' />
                    }
                    Login
                </button>
            </div>

            <p className='text-sm mt-4 text-gray-500'>
                Don&apos;t have an account ?{' '}
                <Link to={'/auth/signup'} className='font-bold text-indigo-600'>
                    Create Account
                </Link>
            </p>
        </form>
    )
}

export default Login