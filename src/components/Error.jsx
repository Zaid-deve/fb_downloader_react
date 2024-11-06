import { Link } from 'react-router-dom';
import errImg from '/src/assets/confused-business-women-sit-at-laptop-at-workplace-with-coffee-cup-burnout-neurosis-stress-error-concept-png.webp';

export default function Error({ err }) {
    return (
        <div className="row row-gap-3 pt-4">
            <div className="col-md-6">
                <img src={errImg} alt="Facebook Video" className='rounded-3 d-block mx-auto' />
            </div>
            <div className="col-md-6">
                <h1>Oops Something Went Wrong</h1>
                <div className="alert alert-danger d-flex gap-2 mt-3">
                    <i className='bx bx-error-circle display-6'></i>
                    <p>{err ? err : 'An Error Occured, please wait some movement or check you internet connection and video url'}</p>
                </div>
                <Link className="btn btn-dark rounded-pill px-5 btn-lg w-100" to="/">Back to Home</Link>
            </div>
        </div>
    )
}