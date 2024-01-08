import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import button from 'bootstrap';
import { useSelector } from 'react-redux';
import UserProfile from '../UserProfile';
import './NaviBar.css';
import VideoUploadModal from '../VideoUploadModal';
import Modal from 'react-bootstrap/Modal';
// import 'bootstrap/dist/css/bootstrap.min.css';


function NaviBar() {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const [uploadModal, setUploadModal] = useState(false);

  const changeRoute = ()=>{
    history.push(`/login`);
  }

  const openUploadModal = ()=>{
    console.log("upload btn click!");
    setUploadModal(true);
  }
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='userContainer'>
        <div className='upload-btn clickable' onClick={openUploadModal}>
          <i className="fa-solid fa-upload fa-xl "></i>
        </div>
        <UserProfile user={sessionUser} />
      </div>

    );
  } else {
    sessionLinks = (
      <>
        <button onClick={changeRoute} type="button" className="user-btn btn btn-outline-primary clickable">
          <i className="fa-solid fa-user"></i>
          <div className='btn-content'>LogIn</div>
        </button>
        <Modal
                show={uploadModal}
                onHide={() => setUploadModal(false)}
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
    );
  }

  return (
    <>
      <div className='navi-btn'>
        {sessionLinks}
      </div>

    </>

  );
}

export default NaviBar;



