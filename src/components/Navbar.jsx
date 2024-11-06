// Navbar.js
import { Link } from 'react-router-dom';
import brandLogo from '/src/assets/facebook-logo-png-image-300x297.png';

function Navbar() {
    return (
        <header className='navbar-expand-lg py-3'>
            <div className="container">
                <div className="navbar d-flex align-items-center">
                    <Link to="/" className='navbar-brand d-flex align-items-center gap-2'>
                        <img src={brandLogo} alt="#" height="45px"/>
                        <h5 className='fw-bolder text-primary'>Facebook Video <br /> Downloader</h5>
                    </Link>

                    <button className='btn btn-navbar-toggler'></button>
                    <div className="navbar-collapse collapse">
                        <div className="d-flex ms-auto gap-3 fw-normal">
                            <Link to="/" className='nav-link'>Home</Link>
                            <Link to="/search" className='nav-link'>Download</Link>
                            <Link to="/contact" className='nav-link'>Contact</Link>
                            <Link to="/login" className='nav-link'>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
