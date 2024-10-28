import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../Components/ProductsList';
import OrderList from '../Components/OrderList';

export interface UserDetails {
    id: number;
    name: string;
    email: string;
    // Add other properties as needed
}

// Retrieve user details from local storage
const userDetString = localStorage.getItem("User Det");

// Check if the item exists and parse it, or set userDets to null
const userDets: UserDetails | null = userDetString ? JSON.parse(userDetString) : null;

// Optionally, check if userDets is not null before using it
if (userDets) {
    // Use userDets safely here
    console.log(userDets.name); // Example usage
} else {
    console.log("No user details found in local storage.");
}
console.log("User Details in Home  :", userDets);


const Home: React.FC<{ loginSetter: React.Dispatch<React.SetStateAction<boolean>> }> = ({ loginSetter }) => {
    const navigate = useNavigate();
    const [showOrders, setShowOrders] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("logged");
        loginSetter(false);  // Update the state to trigger re-render and redirect
        navigate("/")
    };

    const toggleOrderList = () => {
        setShowOrders(!showOrders); // Toggle the visibility of OrderList
    };

    const toggleProductList = () => {
        setShowOrders(false); // Show ProductList
    };

    return (
        <div className="flex min-h-screen bg-gray-100 text-center">
            {/* User Details Section */}
            <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 m-4 w-1/4 max-w-md">
                <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page!</h1>
                <p className="text-lg text-gray-600 mb-8">You are now logged in.</p>
                <button
                    onClick={toggleOrderList}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200 mb-4"
                >
                    My Orders
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition duration-200"
                >
                    Logout
                </button>
            </div>

            {/* Product List Section */}
            <div className="flex-1 m-4">
                {!showOrders ? (
                    <ProductList /> // Show ProductList if showOrders is false
                ) : (
                    <OrderList toggleProductList={toggleProductList} /> // Show OrderList if showOrders is true
                )}
            </div>
        </div>
    );
};

export default Home;


