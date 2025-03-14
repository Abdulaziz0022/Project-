import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; 

    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`
            );
            if (response?.status === 200) {
                setData(response.data.products || []);
            }
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to load products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, [currentPage]); 

    return (
        <div className="w-[90%] mx-auto my-12">
            <h2 className="text-3xl font-bold text-center mb-8">Products</h2>

            {loading ? (
                <h1 className="text-center text-xl font-semibold">Loading...</h1>
            ) : error ? (
                <h1 className="text-center text-red-500 font-semibold">{error}</h1>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {data.map((product) => (
                            <div
                                key={product.id}
                                className="shadow-lg border border-gray-200 rounded-lg overflow-hidden p-5 bg-white hover:shadow-xl transition duration-300"
                            >
                                <div className="w-full h-48">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="w-full h-full object-cover rounded-lg"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="mt-4">
                                    <Link
                                        to={`/product-info/${product.id}`}
                                        className="text-lg font-semibold hover:text-indigo-600 transition"
                                    >
                                        {product.title}
                                    </Link>
                                    <p className="text-gray-600 font-medium">${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-8 space-x-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                currentPage === 1
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                            }`}
                        >
                            Previous
                        </button>

                        <span className="text-lg font-semibold pt-[5px]">{currentPage}</span>

                        <button
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Products;
