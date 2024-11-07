import { Link, useLocation } from 'react-router-dom';
import brandLogo from '/src/assets/Brand-Logo.png';

function Navbar() {
    // Get the current route using useLocation
    const location = useLocation();

    return (
        <header className='navbar-expand-lg py-3'>
            <div className="container">
                <div className="navbar d-flex align-items-center">
                    <Link to="/" className='navbar-brand d-flex align-items-center gap-2'>
                        <img src={brandLogo} alt="Brand Logo" height="42" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse">
                        <div className="d-flex ms-auto gap-4 fw-normal fs-6">
                            <Link
                                to="/"
                                className={`nav-link ${location.pathname === '/' ? 'text-primary' : ''}`}
                            >
                                <i className="bx bxs-home me-1 fs-6"></i> Home
                            </Link>
                            <Link
                                to="/search"
                                className={`nav-link ${location.pathname === '/search' ? 'text-primary' : ''}`}
                            >
                                <i className="bx bxs-download me-1 fs-6"></i> Download
                            </Link>
                            <Link
                                to="/contact"
                                className={`nav-link ${location.pathname === '/contact' ? 'text-primary' : ''}`}
                            >
                                <i className="bx bxs-envelope me-1 fs-6"></i> Contact
                            </Link>
                            <Link
                                to="/login"
                                className={`nav-link ${location.pathname === '/login' ? 'text-primary' : ''}`}
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
