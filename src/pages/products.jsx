import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 

    const getProducts = () => {
        axios.get("https://dummyjson.com/products")
            .then((response) => {
                if (response?.status === 200) {
                    setData(response?.data?.products || []);
                }
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getProducts();
    }, []); 

    return (
        <div className="w-[90%] md:w-[90%] mx-auto my-12">
            <h2 className="text-3xl font-bold text-center mb-8">Products</h2>
            {loading ? ( 
                <h1 className="text-center text-xl font-semibold">Loading...</h1>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {data?.map((product) => (  
                        <div key={product.id} className="shadow-lg border border-gray-200 rounded-lg overflow-hidden p-5 bg-white hover:shadow-xl transition duration-300">
                            <div className="w-full h-48">
                                <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover rounded-lg" />
                            </div>
                            <div className="mt-4">
                                <Link to={`/product-info/${product.id}`} className="text-lg font-semibold hover:text-indigo-600 transition">
                                    {product.title}
                                </Link>
                                <p className="text-gray-600 font-medium">${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
