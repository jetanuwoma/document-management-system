/* global $ */
import React from 'react';

class Modal extends React.Component {

  componentDidMount() {
    console.log('okay');
  }

  render() {
    return (
      <div id="modal1" className="modal modal-fixed-footer">
    <div className="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
    </div>
  </div>
    );
  }
}

export default Modal;
