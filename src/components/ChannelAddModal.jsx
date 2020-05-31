import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { getSelector } from '../redux';
import connect from '../connect';
import Modal from './Modal';

const ChannelAddModal = ({
  createChannel,
}) => {
  const modalState = useSelector(getSelector('modalState'));
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values, { resetForm }) => {
      const { name } = values;
      const data = {
        data: {
          attributes: {
            name,
          },
        },
      };
      createChannel(data, resetForm);
    },
  });
  return (
    <Modal title="Add Channel">
      <form
        onSubmit={formik.handleSubmit}
        className="w-100 p-3 position-relative"
      >
        <label htmlFor="name">New channel</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          disabled={modalState === 'fetching'}
        />
      </form>
    </Modal>
  );
};

ChannelAddModal.propTypes = {
  createChannel: PropTypes.func.isRequired,
};

export default connect()(ChannelAddModal);
