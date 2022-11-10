import React, { Fragment } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import background from '../assets/img/xbg_1.jpg'
import Login from '../compoment/Login';
import SubmitFileCard from '../compoment/SubmitFileCard';
import logoCtu from '../assets/img/LogoCTU.png'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
const Home = () => {

    return (
        <Fragment  >
            <div className="top-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-md col-xl-5 d-flex align-items-center">
                            <img style={{height: "63px"}} src={logoCtu}></img>
                            <a style={{fontWeight: "400",fontSize:"18px",color:"#fff"}} className="navbar-brand align-items-center font-weight-bold"
                                href="">
                                Trung Tâm điệm tử tin học
                                <span>Đại Học Cần Thơ</span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg  ftco-navbar-light position-absolute">
                <div className="container-xl">

                    <span className="btn-custom order-lg-last">Thi tự luận</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="fa fa-bars"></span> Menu
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item "><Link className="nav-link active"
                                to="/">Home</Link></li>

                        </ul>
                    </div>
                </div>
            </nav>
            <section className="hero-wrap" style={{ backgroundImage: `url(${background})`, minHeight: "700px" }}>
                <div className="overlay"></div>
                <div className="container">
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/test' element={<SubmitFileCard />} />
                    </Routes>

                </div>


            </section>
        </Fragment>
    )
}
export default Home;