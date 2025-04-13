import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logo.png';

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
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="FASSER Networks Logo" className="h-10 w-auto" />
            <span className="text-xl font-semibold"></span>
          </Link>
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

      {/* Black Box Section */}
      <div className="bg-neutral text-neutral-content py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Services Section */}
            <div className="card bg-neutral">
              <div className="card-body">
                <h3 className="card-title">FASSER Networks Services</h3>
                <p>
                  FASSER Networks memberikan garansi resmi 2 tahun, produk berkualitas dan lengkap sesuai dengan kebutuhan anda.
                </p>
              </div>
            </div>

            {/* Help & Contact Section */}
            <div className="card bg-neutral">
              <div className="card-body">
                <h3 className="card-title">Help & Contact</h3>
                <div className="space-y-2">
                  <p className="font-semibold">WhatsApp:</p>
                  <div className="space-y-1">
                    <a href="tel:0813-2262-2658" className="link link-hover block">0813-2262-2658</a>
                    <a href="tel:0822-2999-7768" className="link link-hover block">0822-2999-7768</a>
                    <a href="tel:0812-8001-9996" className="link link-hover block">0812-8001-9996</a>
                  </div>
                  <p className="font-semibold mt-4">Email:</p>
                  <a href="mailto:cs@alaskaputraperdana.com" className="link link-hover">
                    cs@alaskaputraperdana.com
                  </a>
                </div>
              </div>
            </div>

            {/* Product Category */}
            <div className="card bg-neutral">
              <div className="card-body">
                <h3 className="card-title">Product Category</h3>
                <ul className="menu">
                  <li><a className="link link-hover">Patch Cord</a></li>
                  <li><a className="link link-hover">Fiber Optic Tool</a></li>
                  <li><a className="link link-hover">Fiber Optic Equipment</a></li>
                  <li><a className="link link-hover">Fiber Optic Accessory</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

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