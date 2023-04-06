import React, { Fragment } from 'react';
import { FrameError } from '../util/message-error';
import FormFieldError from './skeleton/error.skeleton';
import { IntegrationWrapper } from './skeleton/integration-wrapper';

interface IErrorBoundaryProp {
  children?: React.ReactNode;
}
export class ErrorBoundary extends React.Component<
  IErrorBoundaryProp,
  { hasError: boolean; message: string | null }
> {
  constructor(props: IErrorBoundaryProp) {
    super(props);
    this.state = { hasError: false, message: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      message: 'Something went wrong. Please try again.',
    };
  }

  componentDidCatch(error: FrameError | Error) {
    // const error: CheckoutError = err;
    // You can also log the error to an error reporting service
    if (error instanceof FrameError && error.receiver === 'client') {
      this.setState({ message: error.message });
    }
    if (error instanceof FrameError && error.receiver === 'developer') {
      // 646576dA is Hexadecimal for dev. Dev is short for developer
      this.setState({
        message: 'E-646576dA: Something went wrong. Please try again.',
      });
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <IntegrationWrapper>
          <FormFieldError
            message={this.state.message || 'Something went wrong. Please try again.'}
          />
        </IntegrationWrapper>
      );
    }

    return <Fragment>{this.props.children}</Fragment>;
  }
}
