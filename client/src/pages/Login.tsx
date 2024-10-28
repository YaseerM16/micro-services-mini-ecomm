import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface LoginFormInputs {
    email: string;
    password: string;
}

const Login: React.FC<{ loginSetter: React.Dispatch<React.SetStateAction<boolean>> }> = ({ loginSetter }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const result: any = await axios.post("http://localhost:5000/api/user-service/login", data);

            if (result.data.logged) {
                localStorage.setItem("logged", JSON.stringify(true));
                console.log("user in result :", result.data.userDet);
                localStorage.setItem("userDet", JSON.stringify(result.data.userDet))
                // console.log(result.data.userDet);

                loginSetter(true);
                // navigate("/");
                Swal.fire({
                    title: 'You have Logged in successfully!',
                    icon: 'success',
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true,
                    background: '#333',
                    color: '#fff',
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                    }
                });
            }
        } catch (error) {
            console.log("Error in the Login form:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Login failed, please try again.',
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
                <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>

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

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
                >
                    Log In
                </button>
                {/* Login Button */}
                <button
                    type="button"
                    onClick={() => navigate('/signup')} // Navigate to Login page
                    className="w-full bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400 focus:outline-none transition duration-200"
                >
                    Dont't have an account? Sign Up
                </button>
            </form>
        </div>
    );
};

export default Login;
