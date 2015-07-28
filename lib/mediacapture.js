
// This is adapted from https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos

'use strict';

React = require('react/addons');

var _ = require('lodash');

var mediaStream;
var width = 1280;
var height = 0;

var Camera = React.createClass({
  displayName: 'Camera',

  componentDidMount: function componentDidMount() {
    this.canvas = document.getElementById(this.props.canvasID);
    this.video = document.getElementById(this.props.videoID);
  },

  getInitialState: function getInitialState() {
    return {
      has_camera: true,
      photo_src: '',
      streaming: false
    };
  },

  closeCamera: function closeCamera(e) {
    e.preventDefault();

    mediaStream.stop();
    this.setState({
      streaming: false
    });
  },

  openCamera: function openCamera(e) {
    e.preventDefault();

    navigator.getMedia({
      video: true,
      audio: false
    }, (function (stream) {
      this.setState({
        has_camera: true
      });

      if (navigator.mozGetUserMedia) {
        this.video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        this.video.src = vendorURL.createObjectURL(stream);
      }
      mediaStream = stream;
      this.video.play();
    }).bind(this), (function (err) {
      this.error = err;
      this.setState({
        has_camera: false
      });
      // console.log('An error occured! ' + err);
    }).bind(this));

    this.video.addEventListener('canplay', (function (ev) {
      if (!this.state.streaming) {
        height = this.video.videoHeight / (this.video.videoWidth / width);

        if (isNaN(height)) {
          height = width / (4 / 3);
        }

        this.video.setAttribute('width', width);
        this.video.setAttribute('height', height);
        this.canvas.setAttribute('width', width);
        this.canvas.setAttribute('height', height);
        this.setState({
          streaming: true
        });
      }
    }).bind(this), false);
  },

  takePicture: function takePicture(e) {
    e.preventDefault();

    var context = this.canvas.getContext('2d');

    if (width && height) {
      this.canvas.width = width;
      this.canvas.height = height;
      context.drawImage(this.video, 0, 0, width, height);

      var data = this.canvas.toDataURL('image/png');
      this.setState({
        photo_src: data
      });
    }
  },

  render: function render() {
    var controls = undefined;
    var submit = undefined;

    if (!_.isEmpty(this.state.photo_src)) {
      submit = React.createElement('input', { type: 'submit', name: 'commit', value: 'Save photo', className: 'btn btn-primary' });
    }

    if (this.state.streaming) {
      controls = React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { className: 'btn btn-info', onClick: this.closeCamera },
          'Stop camera'
        ),
        React.createElement(
          'button',
          { className: 'btn btn-info', onClick: this.takePicture },
          'Take photo'
        )
      );
    } else {
      if (this.state.has_camera) {
        controls = React.createElement(
          'div',
          null,
          React.createElement(
            'button',
            { className: 'btn btn-info', onClick: this.openCamera },
            'Start camera'
          )
        );
      } else {
        controls = React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            null,
            'Your machine does not appear to have a camera attached. Please use the form to upload an image.'
          )
        );
      }
    }

    return React.createElement(
      'div',
      { className: 'camera' },
      React.createElement(
        'div',
        { className: 'col-md-6' },
        React.createElement(
          'div',
          { className: 'media-container' },
          React.createElement(
            'video',
            { id: this.props.videoID },
            'Video stream not available.'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'form-group hidden' },
        React.createElement('input', { className: 'hidden form-control', type: 'hidden', value: this.state.photo_src, name: this.props.fieldName })
      ),
      React.createElement(
        'div',
        { className: 'col-md-6' },
        React.createElement(
          'div',
          { className: 'media-container' },
          React.createElement('img', { src: this.state.photo_src })
        )
      ),
      React.createElement(
        'div',
        { className: 'controls col-md-6' },
        React.createElement(
          'div',
          { className: 'button-container' },
          controls
        ),
        submit
      )
    );
  }
});

var Canvas = React.createClass({
  displayName: 'Canvas',

  render: function render() {
    return React.createElement('canvas', { id: this.props.canvasID });
  }
});

var MediaCapture = React.createClass({
  displayName: 'MediaCapture',

  componentDidMount: function componentDidMount() {
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    this.setState({
      supported: navigator.getMedia ? true : false
    });
  },

  getInitialState: function getInitialState() {
    return {
      supported: false
    };
  },

  render: function render() {
    var container = undefined;

    if (this.state.supported) {
      container = React.createElement(
        'div',
        { className: 'media-capture row' },
        React.createElement(Camera, { canvasID: this.props.canvasID, fieldName: this.props.fieldName, videoID: this.props.videoID, key: _.uniqueId() }),
        React.createElement(Canvas, { canvasID: this.props.canvasID, key: _.uniqueId() })
      );
    } else {
      container = React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          null,
          'Your browser or device is not capable of using media capture. Please use the form to upload an image.'
        )
      );
    }

    return React.createElement(
      'div',
      null,
      container
    );
  }
});

module.exports = MediaCapture;
//# sourceMappingURL=mediacapture.js.map