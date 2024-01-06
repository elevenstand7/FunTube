import React, { useEffect, useState }  from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import "./VideoUploadModal.css"

const VideoUploadModal = ()=>{

    return (
        <>
            <Modal
                // show={uploadVideoModal}
                onHide={() => setDeleteCommentModal(false)}
                className="upload-video-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload videos</Modal.Title>
                    {/* <button onClick={handleUploadVideo} className="btn upload-video-modal-btn">Upload</button> */}
                </Modal.Header>
                <Modal.Body>
                    <div>Drag and drop video files to upload</div>
                    <button className="btn">SELECT FILES</button>
                </Modal.Body>


            </Modal>

        </>
    )

}

export default VideoUploadModal;
