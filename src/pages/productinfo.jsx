import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const ProductInfo = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://dummyjson.com/products/${id}`);
            setProduct(response?.data);
        } catch (error) {
            console.error("Error fetching product:", error);
            setError("Failed to load product details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getProduct();
        }
    }, [id]);

    if (loading) return <h1 className="text-center text-xl font-semibold">Loading...</h1>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="w-[80%] mx-auto p-6 border rounded-lg shadow-lg mb-[100px] flex flex-col md:flex-row gap-[50px]">
            <div className="md:w-[50%]">
                <img 
                    src={product.thumbnail} 
                    alt={product.title || "Product Image"} 
                    className="w-full h-[550px] object-cover mt-4 rounded-lg"
                />
            </div>
            <div className="md:w-[50%] mt-[70px] mr-[30px]">
                <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-lg font-semibold text-indigo-600">Price: ${product.price}</p>
                <p>Category: {product.category?.replace(/^./, (c) => c.toUpperCase())}</p>
                <button 
                    className="mt-5 w-full md:w-auto px-6 py-3 bg-indigo-5~00 text-white font-semibold rounded-lg shadow-md active:bg-indigo-800 transition duration-300"
                >
                    Buy Now
                </button>
                {product.reviews?.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
                        <Swiper pagination={{ clickable: true }} modules={[Pagination]} className="mySwiper">
                            {[...product.reviews].sort((a, b) => b.rating - a.rating).map((review, index) => (
                                <SwiperSlide key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
                                    <p className="text-lg font-semibold">⭐ {review.rating}/5</p>
                                    <p className="italic text-gray-700">{review.comment}</p>
                                    <p className="text-sm text-gray-500 mt-2">- {review.reviewerName}</p>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductInfo;
