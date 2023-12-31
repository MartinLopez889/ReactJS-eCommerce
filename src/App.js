import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemList/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetail/ItemDetailContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import CartDetails from "./components/Cart/CartDetails";
import Checkout from "./components/Checkout/checkout";
import Footer from "./pages/footer/footer";

function App() {
  return (
    <>
      <div className="home-container">
        <CartProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={ <ItemListContainer greeting="¡Bienvenidos!" titulo="Productos Disponibles: 6" />} />
              <Route path="/detail/:id" element={<ItemDetailContainer />} />
              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              <Route path="/cart" element={<CartDetails />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </div>
      <Footer />
    </>
  );
}

export default App;
