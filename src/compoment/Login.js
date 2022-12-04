import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { Input, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import * as request from "../Until/request";
import "../assets/css/menu/Menu.css"
const Login = () => {
    const navigate = useNavigate();
    const [userCode, setUserCode] = useState();
    const [pass, setPass] = useState();
    const submitLogin = async () => {
        try {
            console.log(String(userCode))
            console.log(String(pass))
            const loginForm = {
                username: userCode,
                password: pass
            }
            let res = await request.postAPI("Login/CreateTokenStudent", loginForm)
            const data = res.data;
            console.log(res)
            localStorage.setItem('tokenICE', data.token)
            if (res.status== 200) {
                navigate('/test');
            } else {
                window.alert("Nhập sai tên và mật khẩu")
            }
        } catch (e) {
            console.log(e)
            window.alert("nhập sai tên và mật khẩu")
            navigate('/');
        }
    }
    return (
        <Fragment  >
            <div className="row no-gutters align-items-center">
                {/* <div className="row no-gutters slider-text align-items-center"> */}
                <div className="col-lg-6 mt-3   mt-5 pt-5">
                    <div className="text mt-5 pt-5 aos-init aos-animate" data-aos="fade-up" data-aos-delay="300" >
                        <div className="card border-0 shadow rounded-3 my-6">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Đăng nhập</h5>
                                <form>
                                    <div className="form-floating mb-3">
                                        <Input type="text" className="form-control" id="floatingInput"
                                            value={userCode || ""}
                                            onChange={e => {
                                                setUserCode(e.target.value)
                                            }}
                                        />
                                        <Label className="form-label" for="floatingInput">Mã thí sinh</Label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <Input type="password" className="form-control" id="floatingPassword"
                                            value={pass || ""}
                                            onChange={e => {
                                                setPass(e.target.value)
                                            }}
                                        />
                                        <Label for="floatingPassword">Mật khẩu</Label>
                                    </div>
                                    <div className="d-grid">
                                        <button className="btn btn-primary btn-login text-uppercase fw-bold" onClick={(e) => {
                                            e.preventDefault()
                                            submitLogin()
                                        }}>Đăng nhập</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Login;