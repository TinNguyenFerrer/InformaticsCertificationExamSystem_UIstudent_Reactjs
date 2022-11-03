import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons'
//import { WorkerURL } from '../../assets/js/pdf.worker.min.js';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import * as request from "../../Until/request";
function ViewPDF() {
  const [url, setUrl] = useState();
  const dowloadTheory = async (id) => {
    try {
      let res = await request.getAPI("TheoryTest/DownloadPdfFileByToken", { responseType: 'blob' })
      console.log(res);
      const type = res.headers['content-type']
      const blob = new Blob([res.data], { type: type, encoding: "UTF-8" })
      setUrl(window.URL.createObjectURL(blob));
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    dowloadTheory(10)
  }, [])
  return (
    <Fragment>
      <div className="text-end">Trang mới: <a href={url} className="h5 text-start" target="_blank"> <FontAwesomeIcon icon={faShare} /></a></div>
      <div style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '800px',
      }}>
        <object data={url} type="application/pdf" width="100%" height="100%">
        </object>
      </div>
    </Fragment>
  );
}

export default ViewPDF;