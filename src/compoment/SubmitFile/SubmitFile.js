import React, { Fragment, useEffect } from 'react';
import { Input, Label, Form, FormGroup, Card, CardBody, CardTitle, Button } from 'reactstrap';
import * as reques from "../../Until/request";
import { useState } from "react";
import "./SubmitFile.css"
import { type } from '@testing-library/user-event/dist/type';


const inputSize = {
    height: "auto",
    width: "400px"
};


function SubmitFile() {
    const [scheduleId, setScheduleId] = useState()
    const GetInfoIdTheory = async () => {
        try {

            let res = await reques.getAPI("Student/GetIdScheduleByToken")
            const data = res.data;
            setScheduleId(data)
            console.log(res)
        } catch (e) {
            // window.alert("")
            console.log(e)
        }
    }

    const [urlExcel, setUrlExcel] = useState();
    const [fileExcel, setFileExcel] = useState();
    const [fileWord, setFileWord] = useState();
    const [filePowerPoint, setFilePowerPoint] = useState();
    const [fileWindow, setFileWindow] = useState();

    const [isUploadFileExcel, setIsUploadFileExcel] = useState();
    const [isUploadFileWord, setIsUploadFileWord] = useState();
    const [isUploadFilePowerPoint, setIsUploadFilePowerPoint] = useState();
    const [isUploadFileWindow, setIsUploadFileWindow] = useState();
    const getFileUploaded = async () => {
        let res = await reques.getAPI("Student/GetIdScheduleByToken")
        const data = res.data;
        uploadedExcel(data)
        uploadedZip(data)
        uploadedword(data)
        uploadedPowerPoint(data)
    }
    const uploadedExcel = async (IdSchedule) => {
        try {

            const response = await reques.getAPI(`Student/IsUploadFileExcel?scheduleId=${IdSchedule}`, { responseType: 'blob' })
            console.log(response);
            const type = response.headers['content-type']
            const blob = new Blob([response.data], { type: type, encoding: "UTF-8" })
            const linkHref = window.URL.createObjectURL(blob)
            setIsUploadFileExcel(<a href={linkHref } download = "ExcelSubmit.xlsx">  Tải file đã nộp</a>)

        } catch (error) {
            console.error(error);
        }
    }
    const uploadedZip = async (IdSchedule) => {
        try {

            const response = await reques.getAPI(`Student/IsUploadFileZip?scheduleId=${IdSchedule}`, { responseType: 'blob' })
            console.log(response);
            const type = response.headers['content-type']
            const blob = new Blob([response.data], { type: type, encoding: "UTF-8" })
            const linkHref = window.URL.createObjectURL(blob)
            setIsUploadFileWindow(<a href={linkHref} download = "Zipfile.zip">  Tải file đã nộp</a>)

        } catch (error) {
            console.error(error);
        }
    }
    const uploadedword = async (IdSchedule) => {
        try {

            const response = await reques.getAPI(`Student/IsUploadFileWord?scheduleId=${IdSchedule}`, { responseType: 'blob' })
            console.log(response);
            const type = response.headers['content-type']
            const blob = new Blob([response.data], { type: type, encoding: "UTF-8" })
            const linkHref = window.URL.createObjectURL(blob)
            setIsUploadFileWord(<a href={linkHref} download = "Wordfile.docx">  Tải file đã nộp</a>)

        } catch (error) {
            console.error(error);
        }
    }
    const uploadedPowerPoint = async (IdSchedule) => {
        try {

            const response = await reques.getAPI(`Student/IsUploadFilePowerPoint?scheduleId=${IdSchedule}`, { responseType: 'blob' })
            console.log(response);
            const type = response.headers['content-type']
            const blob = new Blob([response.data], { type: type, encoding: "UTF-8" })
            const linkHref = window.URL.createObjectURL(blob)
            setIsUploadFilePowerPoint(<a href={linkHref} download = "PowerPointfile.pptx">  Tải file đã nộp</a>)

        } catch (error) {
            console.error(error);
        }
    }
    const changeHandlerFileExcel = (e) => {
        setFileExcel(e.target.files[0]);
    }
    const changeHandlerFileWord = (e) => {
        setFileWord(e.target.files[0]);
    }
    const changeHandlerFilePowerPoint = (e) => {
        setFilePowerPoint(e.target.files[0]);
    }
    const changeHandlerFileWindow = (e) => {
        setFileWindow(e.target.files[0]);
    }
    //================upload file============================
    async function uploadMultiFile() {
        try {
            await GetInfoIdTheory()
            const formDataFileExcel = new FormData();
            const formDataFileWord = new FormData();
            const formDataFilePowerPoint = new FormData();
            const formDataFileWindow = new FormData();
            if (fileExcel !== undefined) {
                console.log(fileExcel)
                formDataFileExcel.append("file", fileExcel);
                const response = await reques.postAPI(`TheoryTest/UploadFileExcel?scheduleId=${scheduleId}`, formDataFileExcel, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                console.log(response);
            }
            if (fileWord !== undefined) {
                formDataFileWord.append("file", fileWord);
                const response = await reques.postAPI(`TheoryTest/UploadFileWord?scheduleId=${scheduleId}`, formDataFileWord, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                console.log(response);
            }
            if (filePowerPoint !== undefined) {
                formDataFilePowerPoint.append("file", filePowerPoint);
                const response = await reques.postAPI(`TheoryTest/UploadFilePowerPoint?scheduleId=${scheduleId}`, formDataFilePowerPoint, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                console.log(response);
            }
            if (fileWindow !== undefined) {
                formDataFileWindow.append("file", fileWindow);
                const response = await reques.postAPI(`TheoryTest/UploadFileWindow?scheduleId=${scheduleId}`, formDataFileWindow, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                console.log(response);
            }
            window.alert("Nộp bài thành công")
            getFileUploaded()
        } catch (error) {
            console.log(error);
            if (error.response.data == 'Student locked') {
                window.alert("Tài khoản đã bị khóa")
                window.location = "/"
            } else {
                window.alert("Có lỗi trong quá trình UploadFile")
            }
        }
    }
    const GetExcelFileService = async () => {
        let res = await reques.getAPI("TheoryTest/DownloadExcelByToken", { responseType: 'blob' })
        console.log(res);
        const type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        const blob = new Blob([res.data], { type: type })
        setUrlExcel(window.URL.createObjectURL(blob))
    }
    useEffect(() => {
        const t = async () => {
            await GetInfoIdTheory();
            await GetExcelFileService();
            await getFileUploaded()
        }
        t()
    }, [])
    //====================================================

    return (
        <div className='text-start'>
            <Label for='fileExcel' className="form-label">File Excel:{isUploadFileExcel}</Label>
            <Input style={inputSize} className="form-control SubmitFileCompoment" type="file" id="fileExcel" accept=".xlsx"
                onChange={changeHandlerFileExcel}
            />
            <br></br>
            <Label for='fileWord' className="form-label">File Word:{isUploadFileWord}</Label>
            <Input style={inputSize} className="form-control SubmitFileCompoment" type="file" id="fileWord" accept=".docx"
                onChange={changeHandlerFileWord}
            />
            <br></br>
            <Label for='filePowerPoint' className="form-label">File PowerPoint:{isUploadFilePowerPoint}</Label>
            <Input style={inputSize} className="form-control SubmitFileCompoment" type="file" id="filePowerPoint" accept=".pptx"
                onChange={changeHandlerFilePowerPoint}
            />
            <br></br>
            <Label for='fileWindow' className="form-label">File Window:{isUploadFileWindow}</Label>
            <Input style={inputSize} className="form-control SubmitFileCompoment" type="file" id="fileWindow" accept=".zip"
                onChange={changeHandlerFileWindow}
            />
            <br></br>
            <Button color="success" onClick={uploadMultiFile}>Nộp bài</Button>
            <br></br>
            <br></br>
            <br></br>

            <a style={{ fontSize: "20px" }} href={urlExcel} download="">File Excel</a>
        </div>
    )
}
export default SubmitFile;