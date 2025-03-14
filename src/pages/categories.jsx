import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navfoot/navbar";
import Footer from "../navfoot/footer";
import { CartContext } from "../assets/cart";

const Products = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [pages, setPages] = useState([]);
    const [skip, setSkip] = useState(1);

    const {pushCard} = useContext(CartContext)

    const getProducts = async () => {
        setLoading(true);

        const url = category
            ? `https://dummyjson.com/products/category/${category.slug}?limit=18&skip=${(skip - 1) * 18}`
            : `https://dummyjson.com/products?limit=18&skip=${(skip - 1) * 18}`;

        try {
            const { data } = await axios.get(url);
            setData(data.products || []);
            let pagelist = [];
            for (let i = 1; i <= Math.ceil(data.total / 18); i++) {
                pagelist.push(i);
            }
            setPages(pagelist);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get("https://dummyjson.com/products/categories");
            if (response.status === 200) {
                setCategories(response.data || []);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, [category, skip]);

    useEffect(() => {
        getCategories();
    }, []);

    const searchProd = async (search) => {
        if (search.length > 2) {
            try {
                let response = await axios.get(`https://dummyjson.com/products/search?q=${search}`);
                if (response.status === 200) {
                    setData(response.data.products);
                    let pagelist = [];
                    for (let i = 1; i <= Math.ceil(response.data.total / 18); i++) {
                        pagelist.push(i);
                    }
                    setPages(pagelist);
                }
            } catch (error) {
                console.error("Error searching products:", error);
            }
        }
    };


    return (
        <>
            <Navbar />
            <div className="w-[90%] md:w-[80%] mx-auto my-12">
                <div>
                    <ul className="flex gap-20 justify-center">
                        <li className="list-none ml-20">
                            <h2 className="text-3xl font-bold text-center mb-8">Products</h2>
                        </li>
                        <li className="list-none gap-5">
                            <input
                                type="text"
                                onChange={(val) => {
                                    searchProd(val.target.value);
                                }}
                                placeholder="Enter product"
                                className="border py-2 px-4 rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400 mr-[20px]"
                            />
                            <button
                                onClick={() => {
                                    searchProd();
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow-md transition hover:bg-blue-600"
                            >
                                Search
                            </button>
                        </li>
                    </ul>
                </div>
                {loading ? (
                    <h1 className="text-center text-xl font-semibold">Loading...</h1>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="hidden md:block col-span-1">
                            <div className="border p-4 rounded-lg shadow-lg bg-gray-50 sticky top-5">
                                <h3 className="text-xl font-semibold mb-4 text-center">Categories</h3>
                                <ul className="space-y-2">
                                    <li
                                        onClick={() => setCategory(null)}
                                        className={`py-2 px-4 border rounded-lg mt-2 cursor-pointer transition ${
                                            category === null ? "bg-amber-500 text-white font-bold" : "hover:bg-gray-200"
                                        }`}
                                    >
                                        All Products
                                    </li>
                                    {categories.map((cat) => (
                                        <li
                                            key={cat}
                                            onClick={() => setCategory(cat)}
                                            className={`py-2 px-4 border rounded-lg cursor-pointer transition ${
                                                category === cat ? "bg-amber-500 text-white font-bold" : "hover:bg-gray-200"
                                            }`}
                                        >
                                            {cat.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {data.length > 0 ? (
   data.map((product) => (
    <div
      key={product.id}
      className="shadow-md border border-gray-300 rounded-lg overflow-hidden p-5 bg-white hover:shadow-xl transition duration-300 flex flex-col h-[380px]"
    >
      <div className="w-full h-52">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="mt-4 flex flex-col flex-grow">
        <Link
          to={`/product-info/${product.id}`}
          className="text-lg font-semibold hover:text-indigo-600 transition line-clamp-2"
        >
          {product.title}
        </Link>
        <p className="text-gray-700 font-medium text-lg">${product.price}</p>
  
        <div className="mt-[20px]">
          <button
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg active:bg-indigo-700 transition"
            onClick={() => pushCard(product)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  ))
  
  ) : (
    <h1 className="text-center text-xl font-semibold col-span-full">
      No products found.
    </h1>
  )}
</div>
                          <div>
                            {
                                pages?.map ((item) => {
                                    return <button 
                                    className={ `border py-1 px-3 gap-5 mt-10 ${skip == item && "bg-amber-600"}`}
                                    onClick={()=>{
                                        console.log(item);
                                        setSkip(item)
                                    }}
                                    key={item}>
                                        {item}
                                    </button>
                                })
                            }
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Products;
