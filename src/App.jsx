import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Profile from './pages/Profile';
import Catagory from './components/Catagory';
import CategoryDetail from './pages/CategoryDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="bg-white text-gray-800" >
        <Navbar />
        <Routes>
          <Route path="/category" element={<Catagory />} />
            <Route path="/category/:name" element={<CategoryDetail />} /> {/* dynamic route */}

          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />

        </Routes>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;