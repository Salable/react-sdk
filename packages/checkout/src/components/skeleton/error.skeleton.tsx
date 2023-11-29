import React from 'react';
import styles from './skeleton.module.css';
import classNames from 'classnames';

const InputLabelSkeleton = () => {
  return (
    <div className={styles.skeleton__label}>
      <span className={styles.skeleton__discernable_text}>Error</span>
    </div>
  );
};

export const InputSkeleton = () => {
  return (
    <div className={classNames(styles.skeleton__input_wrapper, styles.skeleton__cursor_error)}>
      <InputLabelSkeleton />
      <div className={styles.skeleton__input}>
        <span className={styles.skeleton__discernable_text}>Error</span>
      </div>
    </div>
  );
};

export const FormFieldError = ({ message }: { message: string }) => {
  return (
    <div className={styles.addressFormFieldsBox}>
      {Array.from({ length: 3 }, (_, index) => {
        return <InputSkeleton key={`address-form-field-${index}`} />;
      })}
      <div className={styles.errorBox}>
        <div className={styles.errorBox__container}>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default FormFieldError;
