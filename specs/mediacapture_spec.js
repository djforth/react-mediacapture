const MediaCapture = require("../src/mediacapture");
const React = require("react/addons");
// const Immutable = require('immutable');
const _         = require('lodash');

// Test Helpers
const TestUtils       = React.addons.TestUtils;

describe('mediacapture', function() {
  let mediacapture;
  let props = {
    canvasID:"Phil",
    fieldName:"collins",
    videoID:"Easy_lover"
  };

  beforeEach(()=>{
    mediacapture =  TestUtils.renderIntoDocument(<MediaCapture canvasID={props.canvasID} fieldName={props.fieldName} videoID={props.videoID}/>);
  });

  it("should exist", ()=>{
    expect(mediacapture).toBeDefined();
  });
});