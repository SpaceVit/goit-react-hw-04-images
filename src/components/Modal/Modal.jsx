import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, StyledModal } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ togleModal, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code !== 'Escape') return;
      togleModal();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      return window.removeEventListener('keydown', handleKeyDown);
    };
  }, [togleModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      togleModal();
    }
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <StyledModal>{children}</StyledModal>
    </Backdrop>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};
