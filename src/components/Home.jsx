import { Link } from "react-router-dom";
import heroImg from '/src/assets/9798f8d36ceb13c024595c2c0410158a_fgraphic.png'

export default function Home() {
    return (
        <>
            <div className="position-relative vh-75 mb-4  rounded-5 overflow-hidden">
                <div className="h-100 w-100">
                    <img src={heroImg} alt="#" className="h-100 w-100" />
                </div>
                <div className="hero-text position-absolute top-0 left-0 pt-5 h-100 w-100">
                    <div className="mx-auto text-light pt-5" style={{ maxWidth: "480px" }}>
                        <h1>Welcome to facebook video downloader</h1>
                        <p className="text-light">download high quality videos for free at high speed download links</p>
                        <Link to="/search" className="btn btn-warning px-5 btn-lg w-100">
                            <i className='bx bxs-search h5 m-0 me-2'></i>
                            Download Video
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}