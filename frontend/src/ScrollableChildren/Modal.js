import React from 'react';
import './Modal.css';

function Modal({ show, handleClose, handleSave, title, children }) {
  return (
    <div className={`modal ${show ? 'show' : ''}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
          <button className="close" onClick={handleClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleClose}>Close</button>
          <button className="btn btn-primary" onClick={handleSave}>Save changes</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
