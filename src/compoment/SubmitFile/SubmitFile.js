import React, { Fragment, useEffect } from 'react';
import { Input, Label, Form, FormGroup, Card, CardBody, CardTitle, Button } from 'reactstrap';
import * as reques from "../../Until/request";
import { useState } from "react";
import "./SubmitFile.css"


const inputSize = {
    height: "auto",
    width: "400px"
};


function SubmitFile() {
    const [scheduleId, setScheduleId] = useState()
    const GetInfoIdTheory = async () => {
        try {

            let res = await reques.getAPI("TheoryTest/GetIdScheduleByToken")
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
    const changeHandlerFileExcel = (e) => {
        setFileExcel(e.target.files[0]);
    }
    const changeHandlerFileWord = (e) => {
        setFileWord(e.target.files[0]);
    }
    const changeHandlerFilePowerPoint = (e) => {
        setFilePowerPoint(e.target.files[0]);
    }
    //================upload file============================
    async function uploadMultiFile() {
        try {
            const formDataFileExcel = new FormData();
            const formDataFileWord = new FormData();
            const formDataFilePowerPoint = new FormData();
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
            window.alert("Nộp bài thành công")

        } catch (error) {
            console.log(error);
            window.alert("Có lỗi trong quá trình UploadFile")
        }
    }
    const GetExcelFileService = async () => {
        let res = await reques.getAPI("TheoryTest/DownloadExcelByToken",{responseType: 'blob'})
        console.log(res);
        const type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        const blob = new Blob([res.data], { type: type})
        setUrlExcel(window.URL.createObjectURL(blob))
    }
    useEffect(() => { /*GetInfoIdTheory();*/ GetExcelFileService() }, [])
    //====================================================

    return (
        <div className='text-start'>
            <Label for='fileExcel' className="form-label">File Excel:</Label>
            <Input style={inputSize} className="form-control SubmitFileCompoment" type="file" id="fileExcel" accept=".xlsx"
                onChange={changeHandlerFileExcel}
            />
            <br></br>
            <Label for='fileWord' className="form-label">File Word:</Label>
            <Input style={inputSize} className="form-control SubmitFileCompoment" type="file" id="fileWord" accept=".docx"
                onChange={changeHandlerFileWord}
            />
            <br></br>
            <Label for='filePowerPoint' className="form-label">File PowerPoint:</Label>
            <Input style={inputSize} className="form-control SubmitFileCompoment" type="file" id="filePowerPoint" accept=".pptx"
                onChange={changeHandlerFilePowerPoint}
            />
            <br></br>
            <Button color="success" onClick={uploadMultiFile}>Nộp bài</Button>
            <br></br>
            <br></br>
            <br></br>
            
            <a style={{fontSize:"20px"}} href={urlExcel} download="">File Excel</a>
        </div>
    )
}
export default SubmitFile;