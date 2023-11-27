import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IoCloseCircleOutline } from "react-icons/io5";

import css from './Modal.module.css';

class Modal extends Component {
  static propTypes = {
    currentImageUrl: PropTypes.string.isRequired,
    currentImageDescription: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.clickEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.clickEsc);
  }

  clickBackdrop = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  clickEsc = (event) => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { currentImageUrl, onClose, currentImageDescription } = this.props;

    return (
      <div className={css.overlay} onClick={this.clickBackdrop}>
        <div className={css.modal}>
          <IoCloseCircleOutline className={css.button} type="button" onClick={onClose} />
          <img src={currentImageUrl} alt={currentImageDescription} />
        </div>
      </div>
    );
  }
}

export default Modal;