import { useEffect, useState } from "react";
import { isValidFbUrl } from "./Search";
import Error from "./Error";
import Loader from "./Loader";

let endpoint = '/api',
    options = {}

if (location.hostname !== 'localhost') {
    endpoint = 'https://fbhd.rf.gd/fb/'
    options = {
        headers: {
            "ngrok-skip-browser-warning": true
        }
    }
}

export default function Download() {
    const [isLoading, updateLoading] = useState(true);
    const [videoDetails, setVideoDetails] = useState({});
    const [error, setError] = useState(null);
    const [sdSize, setSdSize] = useState(null);
    const [hdSize, setHdSize] = useState(null);
    const [videoDuration, setDuration] = useState(null);

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
                const response = await fetch(`${endpoint}?url=${encodeURIComponent(url)}`, options);
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

    const handleMetadataLoaded = (e) => {
        const videoDuration = e.target.duration;
        if (!isNaN(videoDuration)) {
            setDuration(videoDuration);
        }
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
                        onLoadedMetadata={handleMetadataLoaded}
                    />
                </div>
                <div className="col-md-6">
                    <h2>Your video is ready:</h2>
                    <div className="bg-light rounded-3 p-3">
                        <p>{title || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, consequatur.'}</p>
                        <p className="m-0">Duration: {videoDuration ? formatDuration(Number(videoDuration)) : 'Duration not available'}</p>
                    </div>
                    <h3 className="mt-4">Download Links:</h3>
                    <div className="d-flex flex-wrap gap-3">
                        {sd && (
                            <a href={sd} download className="btn py-2 btn-outline-dark px-3 rounded-5 flex-grow-1 fw-bold">
                                <i className="bx bxs-video"></i> Download HD -- [{getFormattedBytes(sdSize)}]
                            </a>
                        )}
                        {hd && (
                            <a href={hd} download className="btn py-2 btn-dark px-3 rounded-5 flex-grow-1 fw-bold">
                                <i className="bx bxs-tv"></i> Download Full HD -- [{getFormattedBytes(hdSize)}]
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

function getFormattedBytes(bytes, decimals = 2) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'],
        i = Math.floor(Math.log(bytes) / Math.log(1024)),
        formattedSize = (bytes / Math.pow(1024, i)).toFixed(decimals);

    return `${formattedSize} ${sizes[i]}`;
}

function formatDuration(duration) {
    if (isNaN(duration) || duration <= 0) {
        return "00:00"; // Return fallback if duration is invalid
    }

    const minutes = Math.floor(duration / 60),
        seconds = Math.floor(duration % 60);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
