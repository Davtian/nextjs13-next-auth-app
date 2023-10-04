"use client";

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

let validationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(32),
    privacyPolicy: yup.boolean().oneOf([true], 'You must agree to the privacy policy'),

});

const Register = () => {
    const [message, setMessage] = useState(null);
    const { setError, reset, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const handleFormSubmit = async data => {
        setMessage(null);
        if (!data.privacyPolicy) {
            setError('privacyPolicy', {
                message: 'You must agree to the privacy policy',
                type: 'error',
            });
            return;
        }
        const url = process.env.NEXT_PUBLIC_API_URL + '/api/auth/sign-up'
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            setMessage("User registered succesfully.")
            reset()
        } else {
            const response = await res.json();
            setError('email', { message: response?.detail ?? "User Registration Failed", type: "error" })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
                {message && (
                    <div className='text-sm text-green-500'>{message}</div>
                )}
                <div className="mb-2">
                    <label htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                    <input type="text" id="firstName"
                        {...register('firstName')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    {errors['firstName'] ? (
                        <div className='text-sm text-red-500'>{errors['firstName'].message}</div>
                    ) : null}
                </div>
                <div className="mb-2">
                    <label htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                    <input type="text" id="lastName"
                        {...register('lastName')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    {errors['lastName'] ? (
                        <div className='text-sm text-red-500'>{errors['lastName'].message}</div>
                    ) : null}
                </div>
                <div className="mb-2">
                    <label htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                    <input type="email" id="email"
                        {...register('email')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    {errors['email'] ? (
                        <div className='text-sm text-red-500'>{errors['email'].message}</div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password"
                        {...register('password')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    {errors['password'] ? (
                        <div className='text-sm text-red-500'>{errors['password'].message}</div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="privacyPolicy" className="flex items-center">
                        <input
                            type="checkbox"
                            id="privacyPolicy"
                            {...register('privacyPolicy')}
                            className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-900 dark:text-white">
                            I agree to the privacy policy
                        </span>
                    </label>
                    {errors['privacyPolicy'] ? (
                        <div className='text-sm text-red-500'>{errors['privacyPolicy'].message}</div>
                    ) : null}
                </div>
                <button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register
                </button>
            </form>
        </>
    );
}
export default Register;