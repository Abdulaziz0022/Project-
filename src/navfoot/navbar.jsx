import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font shadow-md bg-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-around">
        <Link to="/" className="flex title-font font-medium items-center text-gray-900">
          <span className="ml-3 text-xl font-bold">Uzum Market</span>
        </Link>

        <nav className="flex flex-wrap items-center text-base space-x-6">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <Link to="/shop" className="hover:text-gray-900">Shop</Link>
          <Link to="/categories" className="hover:text-gray-900">Categories</Link>
          <Link to="/contact" className="hover:text-gray-900">Contact</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="flex items-center bg-gray-100 py-2 px-4 rounded-md hover:bg-gray-200">
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
          </button>

          <Link to="/login" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
