import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserDetails } from '../pages/Home';

// Retrieve user details from local storage
const userDetString = localStorage.getItem("userDet");

// Check if the item exists and parse it, or set userDets to null
const userDets: UserDetails | null = userDetString ? JSON.parse(userDetString) : null;

const OrderList: React.FC<{ toggleProductList: React.Dispatch<React.SetStateAction<boolean>> }> = ({ toggleProductList }) => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userDets) {
                Swal.fire({
                    title: 'Error!',
                    text: 'User  details not found. Please log in again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }

            try {
                const email = userDets.email;
                const response = await axios.get(`http://localhost:5000/api/order-service/get-orders/${email}`);
                console.log("OrderDetails :", response.data.orders);

                setOrders(response.data.orders); // Assuming response.data contains the orders array
            } catch (error) {
                console.error("Error fetching orders:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch orders. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or skeleton UI
    }

    return (
        <div className="order-list p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6">Order List</h2>
            {orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div key={order._id} className="border border-gray-300 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                            <h3 className="text-lg font-semibold mb-2">Product: {order.productId.title}</h3>
                            <p className="text-gray-700">Price: <span className="font-bold">${order.totalPrice.toFixed(2)}</span></p>
                            <p className="text-gray-700">Customer Name: <span className="font-bold">{order.userId.name}</span></p>
                            <p className="text-gray-700">Customer Phone: <span className="font-bold">{order.userId.phone}</span></p>
                            <p className="text-gray-700">Customer Email: <span className="font-bold">{order.userId.email}</span></p>
                        </div>
                    ))}
                </div>
            )}
            <button
                onClick={() => toggleProductList(false)}
                className="mt-6 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-200 mb-4"
            >
                Back to Products
            </button>
        </div>
    );
};

export default OrderList;