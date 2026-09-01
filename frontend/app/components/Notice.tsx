import React, { useState, useEffect } from 'react';

interface ConstructionWarningProps {
  /**
   * The message to display in the warning banner.
   * @default "🚧 This portfolio is currently under construction. Some information displayed may be dummy or placeholder data."
   */
  message?: string;
  /**
   * The severity level of the warning, which changes the color scheme.
   * @default "warning"
   */
  severity?: 'info' | 'warning' | 'error';
  /**
   * If true, the warning can be dismissed by the user.
   * @default true
   */
  dismissible?: boolean;
  /**
   * Additional CSS class names to apply to the container.
   */
  className?: string;
}

const ConstructionWarning: React.FC<ConstructionWarningProps> = ({
  message = '🚧 This portfolio is currently under construction. Some information displayed may be dummy or placeholder data.',
  severity = 'warning',
  dismissible = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Check if the user has previously dismissed this warning (session only)
  useEffect(() => {
    const dismissed = sessionStorage.getItem('portfolioWarningDismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('portfolioWarningDismissed', 'true');
  };

  if (!isVisible) return null;

  // Color schemes based on severity
  const severityStyles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      text: 'text-blue-800',
      icon: 'text-blue-400',
      button: 'text-blue-400 hover:text-blue-600',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-400',
      text: 'text-yellow-800',
      icon: 'text-yellow-400',
      button: 'text-yellow-400 hover:text-yellow-600',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-800',
      icon: 'text-red-400',
      button: 'text-red-400 hover:text-red-600',
    },
  };

  const styles = severityStyles[severity];

  return (
    <div
      className={`${styles.bg} border-l-4 ${styles.border} p-4 rounded-md shadow-sm ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {/* Warning icon */}
          <svg
            className={`h-5 w-5 ${styles.icon}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm ${styles.text} font-medium`}>{message}</p>
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.button}`}
              onClick={handleDismiss}
              aria-label="Dismiss warning"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConstructionWarning;