import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '/src/assets/top-10-facebook-video-templates.webp'

export default function Search() {
    const [fburl, setFburl] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle input changes
    const handleFbUrlChange = (e) => {
        setFburl(e.target.value);
    };

    // Form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate URL
        if (!isValidFbUrl(fburl)) {
            setError('Please enter a valid URL.');
            return;
        }
        setError('');

        const url = `/download?url=${encodeURIComponent(fburl)}`;

        navigate(url);
    };

    return (
        <div className="row g-0 gap-5">
            <div className="col-6 d-md-block d-none">
                <img src={heroImg} alt="Facebook Video" className='w-100 rounded-3' />
            </div>
            <div className="col">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="fburl" className="form-label h3">
                            Enter Facebook Video Url:
                        </label>
                        <input
                            type="text"
                            className="form-control bg-light mt-2 border-0"
                            id="fburl"
                            value={fburl}
                            onChange={handleFbUrlChange}
                            placeholder="Example: https://facebook.com/yourvideo"
                            autoFocus
                            style={{ height: "45px" }}
                        />
                        {error && <div className="text-danger mt-2"><i className='bx bxs-error' ></i> {error}</div>}
                    </div>

                    <button type="submit" className="btn btn-dark px-5 btn-lg w-100">
                        <i class='bx bxs-search h5 m-0 me-2'></i>
                        Find Video
                    </button>
                </form>
            </div>
        </div>
    );
}

export function isValidFbUrl(url) {
    const regex = /^(https?:\/\/)?(www\.)?facebook\.com\/(watch\/\?v=\d+|[a-zA-Z0-9\.\/_-]+)$/i;
    return regex.test(url);
}
