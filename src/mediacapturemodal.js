
React      = require('react/addons');

// React-bootstrap: http://react-bootstrap.github.io/
const bootstrap  = require('react-bootstrap');
const MediaCapture = require('../media-capture/mediacapture.es6.js');
const Modal = bootstrap.Modal;

const MediaCaptureModal = React.createClass({
  getInitialState() {
    return {
      showModal: false
    };
  },

  close(e) {
    e.preventDefault();

    this.setState({
      showModal: false
    });
  },

  open(e) {
    e.preventDefault();

    this.setState({
      showModal: true
    });
  },

  // log(e) {
  //   e.preventDefault();

  //   console.log(this.refs.parent.refs.camera_ref);
  // },

  render() {
    return (
      <div>
        <button className='btn btn-info' onClick={this.open}>
          Add photo
        </button>
        <Modal bsSize='large' show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You can attach an image either by clicking "Choose File" or, if you have a webcam, clicking "Start camera" below.</p>
            <form action={this.props.formAction} id={this.props.formObjectID} noValidate='novalidate' method='patch' acceptCharset='UTF-8'>
              <div className='form-group file optional sample_asset_attachment'>
                <label className='file optional control-label' htmlFor={this.props.fileID}>
                  Asset attachment
                </label>
                <input accept='image/*' className='file optional' type='file' name={this.props.fileName} id={this.props.fileID} />
                <p className='help-block'>Images should be under 1MB</p>
              </div>
              <div className='form-group'>
                <input type='submit' name='commit' value='Submit' className='btn btn-primary'></input>
              </div>
              <label>Media capture</label>
              <MediaCapture canvasID={this.props.canvasID} fieldName={this.props.fieldName} videoID={this.props.videoID} />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-primary' onClick={this.close}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = MediaCaptureModal;
