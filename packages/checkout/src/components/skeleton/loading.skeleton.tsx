import React from 'react';
import classNames from 'classnames';

import styles from './skeleton.module.css';

const InputLabelSkeleton = () => {
  return (
    <div className={styles.skeleton__label}>
      <span className={styles.skeleton__discernable_text}>Loading</span>
    </div>
  );
};

export const InputSkeleton = () => {
  return (
    <div className={classNames(styles.skeleton__input_wrapper, styles.skeleton__cursor_loading)}>
      <InputLabelSkeleton />
      <div className={styles.skeleton__input}>
        <span className={styles.skeleton__discernable_text}>Loading</span>
      </div>
    </div>
  );
};

export const FormFieldLoading = () => {
  return (
    <div className={styles.addressFormFieldsBox}>
      {Array.from({ length: 3 }, (_, index) => {
        return <InputSkeleton key={`address-form-field-${index}`} />;
      })}
    </div>
  );
};

export default FormFieldLoading;
