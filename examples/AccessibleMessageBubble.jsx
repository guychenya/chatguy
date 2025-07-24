import React from 'react';
import PropTypes from 'prop-types';
import { formatRelative } from 'date-fns';
import { SafeIcon } from '../components/common/SafeIcon';
import { User, Bot } from 'react-feather';

/**
 * AccessibleMessageBubble - An accessible component for displaying chat messages
 * 
 * This component follows accessibility best practices:
 * - Uses semantic HTML elements
 * - Provides appropriate ARIA attributes
 * - Ensures sufficient color contrast
 * - Supports keyboard navigation
 * - Works well with screen readers
 */
const AccessibleMessageBubble = ({
  message,
  isUserMessage,
  timestamp,
  isLoading,
  hasError,
}) => {
  // Format the timestamp in a human-readable format
  const formattedTime = formatRelative(new Date(timestamp), new Date());
  
  // Determine the appropriate role for screen readers
  const ariaRole = isLoading ? 'status' : 'listitem';
  
  // Set the appropriate aria-live attribute for dynamic content
  const ariaLive = isLoading ? 'polite' : 'off';
  
  return (
    <div 
      className={`message-bubble ${isUserMessage ? 'user-message' : 'ai-message'}`}
      role={ariaRole}
      aria-live={ariaLive}
    >
      <div className="message-header">
        <div className="message-avatar" aria-hidden="true">
          {isUserMessage ? (
            <SafeIcon icon={<User />} fallback="👤" />
          ) : (
            <SafeIcon icon={<Bot />} fallback="🤖" />
          )}
        </div>
        <div className="message-sender">
          <span className="sr-only">Message from </span>
          <strong>{isUserMessage ? 'You' : 'AI Assistant'}</strong>
        </div>
        <time 
          dateTime={new Date(timestamp).toISOString()}
          className="message-time"
          title={new Date(timestamp).toLocaleString()}
        >
          {formattedTime}
        </time>
      </div>
      
      <div className="message-content">
        {hasError ? (
          <div className="message-error" role="alert">
            <span className="sr-only">Error: </span>
            There was an error processing this message. Please try again.
          </div>
        ) : isLoading ? (
          <div className="message-loading">
            <span className="loading-indicator" aria-hidden="true">...</span>
            <span className="sr-only">Message is loading</span>
          </div>
        ) : (
          <div className="message-text">{message}</div>
        )}
      </div>
      
      {/* Message actions with keyboard support */}
      <div className="message-actions">
        <button 
          className="action-button"
          aria-label="Copy message to clipboard"
          onClick={() => navigator.clipboard.writeText(message)}
        >
          <SafeIcon icon={<ClipboardIcon />} fallback="📋" />
        </button>
        
        <button 
          className="action-button"
          aria-label={`${isUserMessage ? 'Edit' : 'Regenerate'} message`}
          onClick={() => {/* Handle edit/regenerate */}}
        >
          <SafeIcon icon={isUserMessage ? <EditIcon /> : <RefreshIcon />} fallback={isUserMessage ? "✏️" : "🔄"} />
        </button>
      </div>
    </div>
  );
};

// Define prop types for better documentation and type checking
AccessibleMessageBubble.propTypes = {
  message: PropTypes.string.isRequired,
  isUserMessage: PropTypes.bool.isRequired,
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
};

AccessibleMessageBubble.defaultProps = {
  isLoading: false,
  hasError: false,
};

export default AccessibleMessageBubble;

// Mock icons for the example
const ClipboardIcon = () => <div>Copy</div>;
const EditIcon = () => <div>Edit</div>;
const RefreshIcon = () => <div>Refresh</div>;