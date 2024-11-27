import { LoaderCircle, Lock, Mail, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createAccount } from '../lib/appwrite/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    async function onSubmit(e) {
        e.preventDefault();
        try {
            setIsLoading(true)
            const formData = new FormData(e.target)
            const data = Object.fromEntries(formData.entries())
            const isAccountCreated = await createAccount(data);

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
        <form onSubmit={onSubmit} className="px-5 py-4 rounded w-full sm:border sm:shadow bg-white">
            <h3 className="font-bold text-xl text-gray-500">
                Create Account
            </h3>

            <div className="mt-5 space-y-4">
                {/* Full Name */}
                <div className="bg-white border border-indigo-200 rounded flex items-center p-2 gap-4">
                    <label>
                        <User className="text-indigo-300" strokeWidth={1.5} />
                    </label>

                    <input
                        placeholder="Enter full name"
                        className="w-full outline-none text-gray-500"
                        type="text"
                        name='name'
                        required
                    />
                </div>

                {/* Username */}
                <div className="bg-white border border-indigo-200 rounded flex items-center p-2 gap-4">
                    <label>
                        <User className="text-indigo-300" strokeWidth={1.5} />
                    </label>

                    <input
                        placeholder="Enter username"
                        className="w-full outline-none text-gray-500"
                        type="text"
                        name='username'
                        required
                    />
                </div>

                {/* Email */}
                <div className="bg-white border border-indigo-200 rounded flex items-center p-2 gap-4">
                    <label>
                        <Mail className="text-indigo-300" strokeWidth={1.5} />
                    </label>

                    <input
                        placeholder="Enter email"
                        className="w-full outline-none text-gray-500"
                        type="email"
                        name='email'
                        required
                    />
                </div>

                {/* Password */}
                <div className="bg-white border border-indigo-200 rounded flex items-center p-2 gap-4">
                    <label>
                        <Lock className="text-indigo-300" strokeWidth={1.5} />
                    </label>

                    <input
                        placeholder="Enter password"
                        className="w-full outline-none text-gray-500"
                        type="password"
                        name='password'
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type='submit' disabled={isLoading} className="p-2.5 bg-indigo-500 active:bg-indigo-600 text-gray-200 w-full rounded font-bold flex items-center justify-center gap-4 disabled:bg-gray-700">
                    {
                        isLoading && <LoaderCircle className='animate-spin' />
                    }
                    Sign Up
                </button>
            </div>

            {/* Login Link */}
            <p className="text-sm mt-4 text-gray-500">
                Already have an account?{' '}
                <Link to={'/auth/login'} className="font-bold text-indigo-600">
                    Login
                </Link>
            </p>
        </form>
    );
}

export default Signup;
