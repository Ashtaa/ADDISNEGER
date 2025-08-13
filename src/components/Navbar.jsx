import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import { FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { user, logout } = useContext(AuthContext);

  const profileImage = user?.profileImage || '/default-user.jpeg';

  // Load cart count from localStorage and listen to changes
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo on left */}
        <Link to="/" className="text-2xl font-bold text-blue-600">ShopNow</Link>

        {/* Center links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/shop" className="hover:text-blue-500">Shop</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
        </div>

        {/* Right icons */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/cart" className="relative hover:text-blue-500">
            <FaShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/profile">
                <img
                  src={profileImage}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-400"
                />
              </Link>
              <button
                onClick={logout}
                className="ml-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:text-blue-500">Login</Link>
              <Link to="/signup" className="text-sm hover:text-blue-500">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block hover:text-blue-500">Home</Link>
          <Link to="/shop" className="block hover:text-blue-500">Shop</Link>
          <Link to="/about" className="block hover:text-blue-500">About</Link>
          <Link to="/contact" className="block hover:text-blue-500">Contact</Link>
          <Link to="/cart" className="flex items-center gap-2 hover:text-blue-500">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="text-red-600 text-sm">({cartCount})</span>
            )}
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="flex items-center space-x-2">
                <img
                  src={profileImage}
                  alt="profile"
                  className="w-7 h-7 rounded-full border"
                />
                <span className="text-sm font-medium">{user.name || 'User'}</span>
              </Link>
              <button
                onClick={logout}
                className="text-sm bg-red-500 text-white px-3 py-1 mt-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-blue-500">Login</Link>
              <Link to="/signup" className="block hover:text-blue-500">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
