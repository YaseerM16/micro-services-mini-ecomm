import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserDetails } from '../pages/Home'

// Retrieve user details from local storage
const userDetString = localStorage.getItem("userDet");

// Check if the item exists and parse it, or set userDets to null
const userDets: UserDetails | null = userDetString ? JSON.parse(userDetString) : null;

// Optionally, check if userDets is not null before using it
if (userDets) {
    // Use userDets safely here
    console.log(userDets.name); // Example usage
} else {
    console.log("No user details found in local storage.");
}
console.log("User Details in ProductList   :", userDets);

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(9); // Number of products to show per page

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/product-service/get-products");
                console.log("REsponse of product-List :", response.data);

                setProducts(response.data.products); // Assuming response.data contains the products array
            } catch (error) {
                console.error("Error fetching products:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch products. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        };

        fetchProducts();
    }, []);

    // Calculate total pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Order function
    const handleOrder = async (productTitle: string) => {
        try {
            const email = userDets?.email
            console.log(userDets);
            console.log("Email :", email);
            console.log("Prodtitle :", productTitle);
            const result: any = await axios.post("http://localhost:5000/api/order-service/order-product", { productTitle, email });
            console.log(result.data);
            Swal.fire({
                title: 'Order Placed!',
                text: `You have ordered: ${productTitle}`,
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.log("Error While Handle the Order Placement :", error);
        }
    };

    return (
        <div className="product-list">
            <h2 className="text-2xl font-bold mb-4">Product List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentProducts.map((product) => (
                    <div key={product.id} className="border p-4 rounded shadow-md">
                        <h3 className="text-lg font-semibold">{product.title}</h3>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <button
                            onClick={() => handleOrder(product.title)}
                            className="mt-2 w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-200"
                        >
                            Order
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
