import { Outlet } from "react-router-dom";
import Navbar from "./navfoot/navbar";
import Footer from "./navfoot/footer";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-center text-3xl font-bold my-6">Welcome to My Shop</h1>
        <Outlet /> 
      </div>
      <Footer />
    </>
  );
};

export default App;
