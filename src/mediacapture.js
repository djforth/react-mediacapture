
// This is adapted from https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos

const React = require('react/addons');

const _     = require('lodash');

var mediaStream;
var width = 1280;
var height = 0;

const Camera = React.createClass({
  componentDidMount(){
    this.canvas = document.getElementById(this.props.canvasID);
    this.video = document.getElementById(this.props.videoID);
  },

  getInitialState(){
    return {
      has_camera: true,
      photo_src: '',
      streaming: false
    };
  },

  closeCamera(e) {
    e.preventDefault();

    mediaStream.stop();
    this.setState({
      streaming: false
    });
  },

  openCamera(e) {
    e.preventDefault();

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        this.setState({
          has_camera: true
        });

        if (navigator.mozGetUserMedia) {
          this.video.mozSrcObject = stream;
        } else {
          let vendorURL = window.URL || window.webkitURL;
          this.video.src = vendorURL.createObjectURL(stream);
        }
        mediaStream = stream;
        this.video.play();
      }.bind(this),
      function(err) {
        this.error = err;
        this.setState({
          has_camera: false
        });
        // console.log('An error occured! ' + err);
      }.bind(this)
    );

    this.video.addEventListener('canplay', function(ev){
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
    }.bind(this), false);
  },

  takePicture(e) {
    e.preventDefault();

    let context = this.canvas.getContext('2d');

    if (width && height) {
      this.canvas.width = width;
      this.canvas.height = height;
      context.drawImage(this.video, 0, 0, width, height);

      let data = this.canvas.toDataURL('image/png');
      this.setState({
        photo_src: data
      });
    }
  },

  render() {
    let controls;
    let submit;

    if(!_.isEmpty(this.state.photo_src)) {
      submit =
      <input type='submit' name='commit' value='Save photo' className='btn btn-primary'></input>;
    }

    if(this.state.streaming) {
      controls =
      <div>
        <button className='btn btn-info' onClick={this.closeCamera}>Stop camera</button>
        <button className='btn btn-info' onClick={this.takePicture}>Take photo</button>
      </div>;
    } else {
      if(this.state.has_camera) {
        controls =
        <div>
          <button className='btn btn-info' onClick={this.openCamera}>Start camera</button>
        </div>;
      } else {
        controls =
        <div>
          <p>Your machine does not appear to have a camera attached. Please use the form to upload an image.</p>
        </div>;
      }
    }

    return (
      <div className='camera'>
        <div className='col-md-6'>
          <div className='media-container'>
            <video id={this.props.videoID}>
              Video stream not available.
            </video>
          </div>
        </div>
        <div className='form-group hidden'>
          <input className='hidden form-control' type='hidden' value={this.state.photo_src} name={this.props.fieldName} />
        </div>
        <div className='col-md-6'>
          <div className='media-container'>
            <img src={this.state.photo_src} />
          </div>
        </div>
        <div className='controls col-md-6'>
          <div className='button-container'>
            {controls}
          </div>
          {submit}
        </div>
      </div>
    );
  }
});

const Canvas = React.createClass({
  render() {
    return (
      <canvas id={this.props.canvasID}>
      </canvas>
    );
  }
});

const MediaCapture = React.createClass({
  componentDidMount(){
    navigator.getMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );

    this.setState({
      supported: (navigator.getMedia) ? true : false
    });
  },

  getInitialState(){
    return {
      supported: false
    };
  },

  render() {
    let container;

    if(this.state.supported){
      container =
      <div className='media-capture row'>
        <Camera canvasID={this.props.canvasID} fieldName={this.props.fieldName} videoID={this.props.videoID} key={_.uniqueId()} />
        <Canvas canvasID={this.props.canvasID} key={_.uniqueId()} />
      </div>;

    } else {
      container =
      <div>
        <p>Your browser or device is not capable of using media capture. Please use the form to upload an image.</p>
      </div>;
    }

    return (
      <div>
        {container}
      </div>
    );
  }
});

module.exports = MediaCapture;
