import React from 'react';
import PropTypes from 'prop-types';
import connect from '../connect';

const Modal = ({ title, hideModal, children }) => (
  <div className="modal fade show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" onClick={() => hideModal()} className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default connect()(Modal);
