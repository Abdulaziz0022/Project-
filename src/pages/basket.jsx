import { useContext } from "react";
import { CartContext } from "../assets/cart.jsx"; 
import { MdDelete } from "react-icons/md";

export default function Basket() {
  const { cart, increase, decrease, removeFromCart, clearCart } = useContext(CartContext);

  if (cart.length === 0) {
    return <p className="text-center mb-12 text-xl font-bold text-blue-800">🛒 Your basket is empty.</p>;
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-6 text-center">Basket</h1>

      <div className="flex justify-end mb-4">
      </div>

      <div className="flex flex-col gap-y-4 px-4 md:w-[75%] lg:w-[50%] mx-auto">
        {cart.map((product) => (
          <div 
            key={product.id} 
            className="grid grid-cols-3 items-center bg-white shadow-md p-4 rounded-lg border border-gray-200 gap-6"
          >
            <div className="col-span-1 flex justify-center">
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="w-35 h-30 object-cover rounded-md"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <p className="text-lg font-semibold">{product.title}</p>

              <div className="flex items-center space-x-4">
                <button 
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 disabled:opacity-50" 
                  onClick={() => decrease(product.id)}
                >
                  -
                </button>
                <span className="text-lg font-medium">{product.quantity}</span>
                <button 
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300" 
                  onClick={() => increase(product.id)}
                >
                  +
                </button>
              </div>

              <p className="text-gray-600">{product.category}</p>
              <div className="flex justify-between items-center">
                <p className="text-indigo-600 font-semibold">${(product.price * product.quantity).toFixed(2)}</p>
                <button 
                  className="text-red-600 hover:text-red-800 text-2xl"
                  onClick={() => removeFromCart(product.id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
 <div className="items-center text-center">
 <button 
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition w-[300px]"
          onClick={clearCart}
        >
          Delete All <MdDelete className="inline ml-2 font-bold text-xl" />
        </button>
 </div>
        <div className="text-center mt-6">
          <p className="text-lg font-semibold">Total: <span className="text-indigo-600">${totalPrice.toFixed(2)}</span></p>
        </div>
      </div>
    </div>
  );
}
