import React, { Fragment } from 'react';
import FormFieldError from './skeleton/error.skeleton';

interface IErrorBoundaryProp {
  children?: React.ReactNode;
}
export class ErrorBoundary extends React.Component<
  IErrorBoundaryProp,
  { hasError: boolean }
> {
  constructor(props: IErrorBoundaryProp) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <FormFieldError message="Something went wrong display checkout. Please try again." />
      );
    }

    return <Fragment>{this.props.children}</Fragment>;
  }
}
