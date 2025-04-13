import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            {isMenuOpen && (
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
                <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link></li>
                <li><Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link></li>
                <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link></li>
              </ul>
            )}
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">FASSER Networks</Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <div>
          <p className="font-bold text-lg mb-2">FASSER Networks</p>
          <p>Quality Fiber Optic Solutions Since 2022</p>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <p>Phone: 021-5020-2228</p>
            <p>Email: cs@alaskaputraperdana.com</p>
          </div>
        </div>
        <div>
          <p>© 2025 FASSER Networks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;