import { Link, useLocation } from 'react-router-dom';
import brandLogo from '/src/assets/Brand-Logo.png';
import { useState } from 'react';

function Navbar() {
    // Get the current route using useLocation
    const location = useLocation();
    const [collapse, showMenu] = useState('collapse');

    return (
        <header className='navbar navbar-expand-lg py-3'>
            <div className="container">
                <div className="navbar d-flex align-items-center w-100">
                    <Link to="/" className='navbar-brand d-flex align-items-center gap-2'>
                        <img src={brandLogo} alt="Brand Logo" height="42" />
                    </Link>

                    <button className="navbar-toggler ms-auto" type="button" onClick={() => showMenu(collapse ? '' : 'collapse')}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`navbar-collapse ${collapse}`}>
                        <div className="d-flex ms-auto gap-4 fw-normal fs-6 flex-md-row flex-column p-md-0 pt-4">
                            <Link
                                to="/"
                                className={`nav-link ${location.pathname === '/' ? 'text-primary' : ''}`} onClick={() => showMenu(collapse ? '' : 'collapse')}
                            >
                                <i className="bx bxs-home me-1 fs-6"></i> Home
                            </Link>
                            <Link
                                to="/search"
                                className={`nav-link ${location.pathname === '/search' ? 'text-primary' : ''}`} onClick={() => showMenu(collapse ? '' : 'collapse')}
                            >
                                <i className="bx bxs-download me-1 fs-6"></i> Download
                            </Link>
                            <Link
                                to="/contact"
                                className={`nav-link ${location.pathname === '/contact' ? 'text-primary' : ''}`} onClick={() => showMenu(collapse ? '' : 'collapse')}
                            >
                                <i className="bx bxs-envelope me-1 fs-6"></i> Contact
                            </Link>
                            <Link
                                to="/login"
                                className={`nav-link ${location.pathname === '/login' ? 'text-primary' : ''}`} onClick={() => showMenu(collapse ? '' : 'collapse')}
                            >
                                <i className="bx bxs-log-in me-1 fs-6"></i> Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
