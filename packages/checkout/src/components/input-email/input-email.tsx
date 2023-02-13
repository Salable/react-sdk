import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './input-email.module.css';

export interface IInputEmail {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  className?: string;
  label?: string;
  errorMessage?: string;
}

export const InputEmail: FC<IInputEmail> = ({
  label = 'Email',
  onChange,
  onBlur,
  className,
  errorMessage,
  style,
}) => {
  return (
    <div
      data-field="email"
      className={classNames(styles['p-field'], styles['mb-24'], className)}
    >
      <label htmlFor="email-input" className={classNames(styles.label)}>
        {label}
      </label>
      <input
        id="email-input"
        dir="ltr"
        type="email"
        inputMode="email"
        name="email"
        autoComplete="email"
        className={classNames(styles.input)}
        onChange={onChange}
        onBlur={onBlur}
        style={style}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export const ErrorMessage = ({ message }: { message?: string }) => {
  return (
    <div className={classNames(styles.errorMessageBox)}>
      <span className={classNames(styles.errorMessage)}>{message}</span>
    </div>
  );
};
