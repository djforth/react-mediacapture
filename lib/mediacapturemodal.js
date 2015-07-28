'use strict';

React = require('react/addons');

// React-bootstrap: http://react-bootstrap.github.io/
var bootstrap = require('react-bootstrap');
var MediaCapture = require('../media-capture/mediacapture.es6.js');
var Modal = bootstrap.Modal;

var MediaCaptureModal = React.createClass({
  displayName: 'MediaCaptureModal',

  getInitialState: function getInitialState() {
    return {
      showModal: false
    };
  },

  close: function close(e) {
    e.preventDefault();

    this.setState({
      showModal: false
    });
  },

  open: function open(e) {
    e.preventDefault();

    this.setState({
      showModal: true
    });
  },

  // log(e) {
  //   e.preventDefault();

  //   console.log(this.refs.parent.refs.camera_ref);
  // },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'button',
        { className: 'btn btn-info', onClick: this.open },
        'Add photo'
      ),
      React.createElement(
        Modal,
        { bsSize: 'large', show: this.state.showModal, onHide: this.close },
        React.createElement(
          Modal.Header,
          { closeButton: true },
          React.createElement(
            Modal.Title,
            null,
            'Add photo'
          )
        ),
        React.createElement(
          Modal.Body,
          null,
          React.createElement(
            'p',
            null,
            'You can attach an image either by clicking "Choose File" or, if you have a webcam, clicking "Start camera" below.'
          ),
          React.createElement(
            'form',
            { action: this.props.formAction, id: this.props.formObjectID, noValidate: 'novalidate', method: 'patch', acceptCharset: 'UTF-8' },
            React.createElement(
              'div',
              { className: 'form-group file optional sample_asset_attachment' },
              React.createElement(
                'label',
                { className: 'file optional control-label', htmlFor: this.props.fileID },
                'Asset attachment'
              ),
              React.createElement('input', { accept: 'image/*', className: 'file optional', type: 'file', name: this.props.fileName, id: this.props.fileID }),
              React.createElement(
                'p',
                { className: 'help-block' },
                'Images should be under 1MB'
              )
            ),
            React.createElement(
              'div',
              { className: 'form-group' },
              React.createElement('input', { type: 'submit', name: 'commit', value: 'Submit', className: 'btn btn-primary' })
            ),
            React.createElement(
              'label',
              null,
              'Media capture'
            ),
            React.createElement(MediaCapture, { canvasID: this.props.canvasID, fieldName: this.props.fieldName, videoID: this.props.videoID })
          )
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            'button',
            { className: 'btn btn-primary', onClick: this.close },
            'Close'
          )
        )
      )
    );
  }
});

module.exports = MediaCaptureModal;
//# sourceMappingURL=mediacapturemodal.js.map