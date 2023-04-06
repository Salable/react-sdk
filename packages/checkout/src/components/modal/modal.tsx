import React, { FC, Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';

export interface IModalContainer {
  children?: React.ReactNode;
  showPayment?: boolean;
  onClose: () => void;
  zIndex?: number;
}

const ModalContainer: FC<IModalContainer> = ({ children, showPayment, onClose }) => {
  if (!showPayment) {
    return null;
  }
  return (
    <div className={styles.modal__container} role="dialog" aria-modal="true" aria-live="assertive">
      <div className={styles.modal__mask} onClick={onClose} />
      <div className={styles.modal__content}>
        <Fragment>{children}</Fragment>
      </div>
    </div>
  );
};

let ModalNode = typeof window !== 'undefined' && document.getElementById('helper-portal');

if (typeof window !== 'undefined' && !ModalNode) {
  ModalNode = document.createElement('div');
  ModalNode.id = 'helper-portal';
}
export const ModalComponent: FC<IModalContainer> = (props) => {
  useEffect(() => {
    // Add Modal Root Node when component mounts
    if (ModalNode) {
      document.body.appendChild(ModalNode);
    }
  }, []);
  if (ModalNode) {
    return ReactDOM.createPortal(<ModalContainer {...props} />, ModalNode);
  }
  return null;
};
