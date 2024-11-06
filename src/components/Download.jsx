import { useEffect, useState } from "react";
import { isValidFbUrl } from "./Search";
import Error from "./Error";
import Loader from "./Loader";
import { Link } from "react-router-dom";

export default function Download() {
    const [isLoading, updateLoading] = useState(true);
    const [videoDetails, setVideoDetails] = useState({});
    const [error, setError] = useState(null);
    const [sdSize, setSdSize] = useState(null);
    const [hdSize, setHdSize] = useState(null);
    const [videoDuration, setDuration] = useState(0);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const url = queryParams.get('url');

        // Validate URL
        if (!url || !isValidFbUrl(url)) {
            setError('Invalid Facebook Video URL, please provide a valid video URL!');
            updateLoading(false);
            return;
        }

        async function fetchVideoData() {
            try {
                const response = await fetch(`https://61e6-2401-4900-7c05-c072-d13a-7a6f-1138-f16d.ngrok-free.app/fb/?url=${encodeURIComponent(url)}`,
                    {
                        headers: {
                            "ngrok-skip-browser-warning":true
                        }
                    });
                const data = await response.json();

                if (data.success) {
                    setVideoDetails(data);
                } else {
                    setError(data.message || 'Something went wrong, please try again.');
                }
            } catch (err) {
                setError('Failed to fetch video. Please try again later.');
            } finally {
                updateLoading(false);
            }
        }

        fetchVideoData();
    }, []);

    // Function to fetch the file size of a given URL (SD or HD)
    const fetchFileSize = async (url) => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const contentLength = response.headers.get('Content-Length');
            return contentLength ? parseInt(contentLength, 10) : 0;
        } catch (err) {
            console.error("Error fetching file size:", err);
            return 0;
        }
    };

    // Convert file size from bytes to a human-readable format
    const formatFileSize = (sizeInBytes) => {
        if (sizeInBytes === 0) return 'Size not available';
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = (Number)(sizeInBytes);
        let i = 0;
        while (size >= 1024 && i < units.length - 1) {
            size /= 1024;
            i++;
        }
        return `${size?.toFixed(2)} ${units[i]}`;
    };

    const { title, duration, links } = videoDetails;
    const { sd, hd } = links || {};

    useEffect(() => {
        const getSize = async () => {
            if (sd) {
                const sdFileSize = await fetchFileSize(sd);
                setSdSize(sdFileSize);
            }
            if (hd) {
                const hdFileSize = await fetchFileSize(hd);
                setHdSize(hdFileSize);
            }
        };

        getSize();
    }, [sd, hd]);

    const formatDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error err={error} />;
    }

    return (
        <>
            <div className="row row-gap-3 pb-5">
                <div className="col-md-6">
                    <video
                        alt="Facebook Video"
                        className="rounded-3 d-block mx-auto w-100 shadow shadow-xl"
                        style={{ maxHeight: "420px" }}
                        controls
                        src={hd || sd}
                        onLoadedMetadata={(e) => setDuration(e.target.duration)}
                    />
                </div>
                <div className="col-md-6">
                    <h2>Your video is ready:</h2>
                    <div className="bg-light rounded-3 p-3">
                        <p>{title || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, consequatur.'}</p>
                        <p className="m-0">{videoDuration ? formatDuration(duration) : 'Duration not available'}</p>
                    </div>
                    <h3 className="mt-4">Download Links:</h3>
                    <div className="d-flex flex-wrap gap-3">
                        {sd && (
                            <a href={sd} download className="btn py-2 btn-outline-dark px-3 rounded-5 flex-grow-1 fw-bold">
                                <i className="bx bxs-video"></i> Download HD -- [{formatFileSize(sdSize)}]
                            </a>
                        )}
                        {hd && (
                            <a href={hd} download className="btn py-2 btn-dark px-3 rounded-5 flex-grow-1 fw-bold">
                                <i className="bx bxs-tv"></i> Download Full HD -- [{formatFileSize(hdSize)}]
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
