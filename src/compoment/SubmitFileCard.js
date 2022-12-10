import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Label, Form, FormGroup, Card, CardBody, CardTitle } from 'reactstrap';
import background from '../assets/img/xbg_1.jpg';
import SubmitFile from './SubmitFile/SubmitFile';
import ViewPDF from './ViewPDF/ViewPDF';
import * as request from "../Until/request";
const cardStyle = {
    fontFamily: "emoji"
};
const inputSize = {
    height: "auto",
    width: "400px"
};


function SubmitFileCard() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const GetInfoStudent = async () => {
        try {

            let res = await request.getAPI("Student/GetStudentInfoByTokenIdExam")
            const data = res.data;
            setUser(data)
            console.log(res)
        } catch (e) {
            window.alert("Có lỗi trong quá trình Đăng nhập")
            navigate('/');
        }
    }
    const SubmitAndEnd = (e) => {
        e.preventDefault();
        localStorage.removeItem('tokenICE')
        navigate('/');
        console.log("submit")
    }

    useEffect(() => { GetInfoStudent() }, [])




    return (
        <Fragment  >
            <div className="row no-gutters align-items-center justify-content-center">
                {/* <div className="row no-gutters slider-text align-items-center"> */}
                <div className="col-lg-12 mt-3   mt-5 pt-5">
                    <div className="text mt-5 pt-5 aos-init aos-animate" data-aos="fade-up" data-aos-delay="300" >
                        <Card className=" border-0 shadow rounded-3 my-6" style={cardStyle}>
                            <CardBody className="p-4 p-sm-5 text-left">
                                <CardTitle className="text-center mb-5">
                                    <div className='text-end'>
                                        <a href='/Home' onClick={SubmitAndEnd}>Kết thúc</a>
                                    </div>
                                    <h2>Đề thi</h2>
                                </CardTitle>
                                <h5>Họ tên thí sinh: {user.name || ''}</h5>
                                <h5>Ngày sinh: {new Date(user.birthDay).toLocaleDateString() || ""}</h5>
                                <SubmitFile />
                                <ViewPDF />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default SubmitFileCard;