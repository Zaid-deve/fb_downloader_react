import { Link } from "react-router-dom";
import heroImg from '/src/assets/GettyImages-1126502147-ba439830bd324ecaac17826d957e32bc.jpg'

export default function Home() {
    return (
        <>
            <div className="home-row py-4">
                <div className="row">
                    <div className="col-md-7 d-none d-lg-block">
                        <img src={heroImg} alt="#" className="w-100 h-100 rounded-2 shadow shadow-lg"/>
                    </div>
                    <div className="col text-center text-lg-start">
                        <h1 className="display-5">Welcome to facebook video downloader</h1>
                        <p className="text-muted mt-3">Download high quality facebook video for free:</p>
                        <Link to="/search" className="btn py-2 btn-dark px-3 rounded-5 w-100 fw-bold">
                            <i class='bx bxs-download h5 m-0'></i> Download Full HD Videos
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}