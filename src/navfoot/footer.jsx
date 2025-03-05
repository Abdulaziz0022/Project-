import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="container px-5 py-10 mx-auto flex flex-wrap justify-around text-center md:text-left">

        <div className="w-full md:w-1/4 px-4">
          <h2 className="font-medium text-gray-900 tracking-widest text-sm mb-3">Shop Categories</h2>
          <nav className="list-none space-y-2">
            <li><Link to="/electronics" className="hover:text-gray-800">Electronics</Link></li>
            <li><Link to="/clothing" className="hover:text-gray-800">Clothing</Link></li>
            <li><Link to="/home-kitchen" className="hover:text-gray-800">Home & Kitchen</Link></li>
            <li><Link to="/beauty" className="hover:text-gray-800">Beauty Products</Link></li>
          </nav>
        </div>

        <div className="w-full md:w-1/4 px-4">
          <h2 className="font-medium text-gray-900 tracking-widest text-sm mb-3">Customer Service</h2>
          <nav className="list-none space-y-2">
            <li><Link to="/contact" className="hover:text-gray-800">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-gray-800">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-gray-800">Return Policy</Link></li>
            <li><Link to="/shipping" className="hover:text-gray-800">Shipping Info</Link></li>
          </nav>
        </div>

        <div className="w-full md:w-1/4 px-4">
          <h2 className="font-medium text-gray-900 tracking-widest text-sm mb-3">About Us</h2>
          <p className="text-sm leading-relaxed">
            We are committed to providing high-quality products and excellent customer service.
          </p>
        </div>

        <div className="w-full md:w-1/4 px-4">
          <h2 className="font-medium text-gray-900 tracking-widest text-sm mb-3">Subscribe</h2>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white border border-gray-300 rounded py-2 px-3 focus:outline-none"
            />
            <button className="mt-2 md:mt-0 md:ml-2 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
          <p className="text-sm">© 2025 Online Market Shop. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-gray-800">Facebook</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Twitter</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
