import { Input } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

interface LoginInputProps {
    email: string | undefined, 
    name: string | undefined, 
    password: string | undefined; 
    errorText: string | undefined; 
    setName: React.Dispatch<React.SetStateAction<string | undefined>>;
    setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
    setErrorText: React.Dispatch<React.SetStateAction<string | undefined>>;
    setPassword: React.Dispatch<React.SetStateAction<string | undefined>>; 
    handleSubmit: () => void;
} 

export default function Form( { email, 
                                name, 
                                password, 
                                setName, 
                                setEmail, 
                                setPassword,
                                errorText, 
                                setErrorText,  
                                handleSubmit}:LoginInputProps) { 
    
    return (
        <section className="bg-gray-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> 
                <div className="w-full bg-white rounded-lg shadow   md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create new account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                                <Input type="text" 
                                name="name" 
                                id="name"  
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                placeholder="Your name..." />
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <Input 
                                type="email" 
                                name="email" 
                                id="email" 
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                placeholder="name@company.com" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <Input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                    <Input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " />
                                    </div>
                                    <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 ">Remember me</label>
                                    </div>
                                </div>
                            </div>
                            {
                                errorText && 
                                <p className="leading-tight tracking-tight text-red-600">
                                    {errorText}
                                </p>
                            }
                            <button 
                                type="submit" 
                                className="w-full text-white bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                onClick={handleSubmit}
                                >
                                    Register
                            </button>
                            <p className="text-sm font-light text-gray-500  ">
                                Already have account ? 
                                <Link
                                    to={{
                                        pathname: "/login", 
                                    }}
                                    className="text-sm font-medium text-orange-600 text-primary-600 hover:underline">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
