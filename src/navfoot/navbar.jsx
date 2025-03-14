import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../assets/cart.jsx"; 

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const location = useLocation();

  return (
    <header className="text-gray-600 body-font shadow-md bg-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-around">

        <Link to="/" className="flex title-font font-medium items-center text-gray-900">
          <span className="ml-3 text-xl font-bold">Aliexpress</span>
        </Link>

        <nav className="flex flex-wrap items-center text-base space-x-6">
          {["/", "/shop", "/categories", "/contact"].map((path, index) => (
            <Link 
              key={index} 
              to={path} 
              className={`${location.pathname === path ? "text-blue-800 font-bold" : "hover:text-gray-900"}`}
            >
              {path === "/" ? "Home" : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/basket" className="relative flex items-center bg-gray-100 py-2 px-4 rounded-md hover:bg-gray-200">
            Cart
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M3 3h2l1 4h13l1-4h2M5 7l2 10h10l2-10M9 20a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"></path>
            </svg>
            {cart.length >= 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          <Link to="/login" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
