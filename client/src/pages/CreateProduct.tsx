import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

interface ProductFormInputs {
    title: string;
    price: number;
    stock: number;
}

const CreateProduct: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ProductFormInputs>();

    const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
        try {
            console.log(data);

            const response = await axios.post("http://localhost:5000/api/product-service/create-product", data);
            console.log("Response from ProdService :", response);

            // Show success message
            if (response.data.created) {
                Swal.fire({
                    title: 'Product Created Successfully',
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
            } else if (response.data.exist) {
                console.log("Error creating product:");
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to create product. Product Exists!! Try New Product.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.log("Error creating product:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to create product. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Create Product</h2>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        id="title"
                        {...register('title', { required: 'Title is required' })}
                        className="border p-2 w-full rounded-md"
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium">Price</label>
                    <input
                        type="number"
                        id="price"
                        {...register('price', { required: 'Price is required', min: 0 })}
                        className="border p-2 w-full rounded-md"
                    />
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                </div>

                <div>
                    <label htmlFor="stock" className="block text-sm font-medium">Stock</label>
                    <input
                        type="number"
                        id="stock"
                        {...register('stock', { required: 'Stock is required', min: 0 })}
                        className="border p-2 w-full rounded-md"
                    />
                    {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
                >
                    Save Product
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
