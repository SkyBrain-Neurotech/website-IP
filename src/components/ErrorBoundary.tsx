import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service (e.g., Sentry)
      // logErrorToService(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 glass-container rounded-xl m-4">
          <AlertCircle className="h-12 w-12 text-neural-blue mb-4" />
          <h2 className="text-xl font-semibold text-ghost-white mb-2">
            {this.props.componentName ? `${this.props.componentName} Error` : 'Something went wrong'}
          </h2>
          <p className="text-neural-gray text-center mb-4">
            The animation component encountered an error and has been disabled.
          </p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-neural-blue/20 hover:bg-neural-blue/30 text-neural-blue rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;