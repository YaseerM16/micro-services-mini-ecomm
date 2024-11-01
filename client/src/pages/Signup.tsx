import axios from 'axios';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
interface SignUpFormInputs {
    name: string;
    email: string;
    password: string;
    phone: string;
}

const SignUp: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>();

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
        try {
            const result: any = await axios.post("http://localhost:5000/api/user-service/signup", data)
            // const result = await JSON.parse(request)
            console.log("resulte Data :", result.data)
            if (result.data.registered) {
                Swal.fire({
                    title: 'Success!',
                    text: 'You have signed up successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    localStorage.setItem("logged", JSON.stringify(true))
                    localStorage.setItem("UserDet", result.data.userDet)
                    navigate("/")
                })
            } else if (result.data.userExist) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Email is already in use !! Try Login.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

        } catch (error) {
            console.log("Error in the Signup form :", error);
            Swal.fire({
                title: 'Error!',
                text: 'Signup failed, please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-lg shadow-md w-96 space-y-6"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-700">Sign Up</h2>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Name is required' })}
                        className="mt-1 border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', { required: 'Email is required' })}
                        className="mt-1 border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', { required: 'Password is required' })}
                        className="mt-1 border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        {...register('phone', { required: 'Phone is required' })}
                        className="mt-1 border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
                >
                    Sign Up
                </button>
                {/* Login Button */}
                <button
                    type="button"
                    onClick={() => navigate('/')} // Navigate to Login page
                    className="w-full bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400 focus:outline-none transition duration-200"
                >
                    Already have an account? Log In
                </button>
            </form>
        </div>
    );
};

export default SignUp;
