import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import button from 'bootstrap';
import { useSelector } from 'react-redux';
import UserProfile from '../UserProfile';
import './NaviBar.css';
import VideoUploadModal from '../VideoUploadModal';
import Modal from 'react-bootstrap/Modal';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./VideoUploadModal.css"


function NaviBar() {
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser.id
  const history = useHistory();
  const [uploadModal, setUploadModal] = useState(false);
  const [photoFile, setPhotoFile] = useState (null);
  const [videoFile, setVideoFile] = useState (null);

  const changeRoute = ()=>{
    history.push(`/login`);
  }

  const openUploadModal = () => {
    if (sessionUser) {
      setUploadModal(true);
    } else {
      changeRoute();
    }
  }

  const toChannelPage = () => {
    if (sessionUser) {
      history.push(`/${sessionUser.id}/channel`);
      setUploadModal(true);
    }
  }


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='userContainer'>
        <div className='upload-btn clickable' onClick={toChannelPage}>
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
      </>
    );
  }

  return (
    <>
      <div className='navi-btn'>
        {sessionLinks}
        <Modal
                show={uploadModal}
                onHide={() => setUploadModal(false)}
                className="upload-video-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload videos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Drag and drop video files to upload</div>
                    <input type="file" />
                </Modal.Body>
            </Modal>
      </div>

    </>

  );
}

export default NaviBar;



