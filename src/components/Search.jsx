import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [fburl, setFburl] = useState('');
    const [error, setError] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
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

        addToRecentSearches(fburl);

        const url = `/download?url=${encodeURIComponent(fburl)}`;
        navigate(url);
    };

    useEffect(() => {
        setRecentSearches(getRecentSearches());
    }, []);

    return (
        <div className="row g-0 gap-5">
            <div className="col-md-7 mx-auto pt-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="fburl" className="form-label h4">
                            Enter Facebook Video Url:
                        </label>
                        <input
                            type="text"
                            className="form-control mt-2 border-1 border-secondary"
                            id="fburl"
                            value={fburl}
                            onChange={handleFbUrlChange}
                            placeholder="Example: https://facebook.com/yourvideo"
                            autoFocus
                            style={{ height: "45px" }}
                        />
                        {error && <div className="text-danger mt-2"><i className='bx bxs-error text-danger' ></i> {error}</div>}
                    </div>

                    {recentSearches && recentSearches.length ? <h5>Recent Searches:</h5> : ''}
                    <div className="list-group overflow-auto mb-3" style={{ maxHeight: "160px" }}>
                        {recentSearches.map((searchUrl, index) => (
                            <button
                                key={index}
                                type="button"
                                className="list-group-item list-group-item-action d-flex align-items-center bg-light"
                                onClick={() => setFburl(searchUrl)}>
                                <span>{searchUrl}</span>
                                <div className="ms-auto">
                                    <i className='bx bx-link-external'></i>
                                </div>
                            </button>
                        ))}
                    </div>

                    <button type="submit" className="btn btn-dark px-5 btn-lg w-100">
                        <i className='bx bxs-search h5 m-0 me-2'></i>
                        Find Video
                    </button>
                </form>
            </div>
        </div>
    );
}

export function isValidFbUrl(url) {
    const regex = /^(https?:\/\/)?(www\.)?(facebook\.com\/watch\/\?v=[\w-]+|fb\.watch\/[\w-]+)$/i;
    return regex.test(url);
}

function getRecentSearches() {
    return JSON.parse(localStorage.getItem('fbhd-searches')) || []
}

function addToRecentSearches(url) {
    let recentUrls = getRecentSearches();

    if (!recentUrls.includes(url)) {
        recentUrls.unshift(url);
    }

    if (recentUrls.length > 10) {
        recentUrls = recentUrls.slice(0, 10)
    }

    localStorage.setItem('fbhd-searches', JSON.stringify(recentUrls));
};