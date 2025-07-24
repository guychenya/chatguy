import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeIcon } from '../components/common/SafeIcon';
import { Send, Paperclip, Mic, X } from 'react-feather';

/**
 * AccessibleInputArea - An accessible component for chat input
 * 
 * This component follows accessibility best practices:
 * - Uses semantic HTML elements
 * - Provides appropriate ARIA attributes
 * - Ensures keyboard accessibility
 * - Includes proper labeling
 * - Manages focus appropriately
 * - Provides feedback for screen reader users
 */
const AccessibleInputArea = ({
  onSendMessage,
  onAttachFile,
  onVoiceInput,
  isProcessing,
  placeholder,
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  
  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() || attachedFiles.length > 0) {
      onSendMessage(message, attachedFiles);
      setMessage('');
      setAttachedFiles([]);
      
      // Announce to screen readers that the message was sent
      const announcement = document.getElementById('sr-announcement');
      if (announcement) {
        announcement.textContent = 'Message sent';
      }
      
      // Return focus to the textarea
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };
  
  // Handle file attachment
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setAttachedFiles(prev => [...prev, ...files]);
      
      // Announce to screen readers that files were attached
      const announcement = document.getElementById('sr-announcement');
      if (announcement) {
        announcement.textContent = `${files.length} file${files.length > 1 ? 's' : ''} attached`;
      }
    }
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle file removal
  const handleRemoveFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    
    // Announce to screen readers that a file was removed
    const announcement = document.getElementById('sr-announcement');
    if (announcement) {
      announcement.textContent = 'File removed';
    }
  };
  
  // Handle voice input toggle
  const handleVoiceToggle = () => {
    setIsRecording(prev => !prev);
    onVoiceInput(!isRecording);
    
    // Announce to screen readers that recording started/stopped
    const announcement = document.getElementById('sr-announcement');
    if (announcement) {
      announcement.textContent = isRecording ? 'Voice recording stopped' : 'Voice recording started';
    }
  };
  
  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    // Send message with Ctrl+Enter or Command+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
    
    // Attach file with Ctrl+Shift+A or Command+Shift+A
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'a') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
    
    // Toggle voice input with Ctrl+Shift+V or Command+Shift+V
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'v') {
      e.preventDefault();
      handleVoiceToggle();
    }
  };
  
  return (
    <div className="input-area-container" role="region" aria-label="Message input">
      {/* Screen reader announcement area */}
      <div 
        id="sr-announcement" 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      ></div>
      
      {/* Keyboard shortcuts help */}
      <div className="keyboard-shortcuts">
        <button 
          type="button" 
          className="help-button"
          aria-label="Show keyboard shortcuts"
          onClick={() => {/* Show keyboard shortcuts modal */}}
        >
          <span aria-hidden="true">⌨️</span> Keyboard Shortcuts
        </button>
      </div>
      
      {/* Attached files list */}
      {attachedFiles.length > 0 && (
        <div className="attached-files" role="list" aria-label="Attached files">
          {attachedFiles.map((file, index) => (
            <div 
              key={`${file.name}-${index}`} 
              className="attached-file"
              role="listitem"
            >
              <span className="file-name">{file.name}</span>
              <button
                type="button"
                className="remove-file-button"
                aria-label={`Remove file ${file.name}`}
                onClick={() => handleRemoveFile(index)}
              >
                <SafeIcon icon={<X size={16} />} fallback="✕" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Input form */}
      <form onSubmit={handleSubmit} className="input-form">
        <div className="textarea-container">
          <label htmlFor="message-input" className="sr-only">Type your message</label>
          <textarea
            id="message-input"
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "Type your message..."}
            rows={1}
            aria-multiline="true"
            aria-label="Message input"
            disabled={isProcessing}
          />
        </div>
        
        <div className="input-actions">
          {/* File attachment button */}
          <input
            type="file"
            id="file-input"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
          />
          <button
            type="button"
            className={`action-button ${attachedFiles.length > 0 ? 'has-files' : ''}`}
            aria-label="Attach files"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
          >
            <SafeIcon icon={<Paperclip />} fallback="📎" />
            <span className="sr-only">Attach files</span>
          </button>
          
          {/* Voice input button */}
          <button
            type="button"
            className={`action-button ${isRecording ? 'recording' : ''}`}
            aria-label={isRecording ? "Stop recording" : "Start voice input"}
            aria-pressed={isRecording}
            onClick={handleVoiceToggle}
            disabled={isProcessing}
          >
            <SafeIcon icon={<Mic />} fallback="🎤" />
            <span className="sr-only">{isRecording ? "Stop recording" : "Start voice input"}</span>
          </button>
          
          {/* Send button */}
          <button
            type="submit"
            className="send-button"
            aria-label="Send message"
            disabled={isProcessing || (!message.trim() && attachedFiles.length === 0)}
          >
            <SafeIcon icon={<Send />} fallback="📤" />
            <span className="sr-only">Send</span>
          </button>
        </div>
      </form>
      
      {/* Status indicator for screen readers */}
      {isProcessing && (
        <div className="sr-only" aria-live="polite">
          Processing your message...
        </div>
      )}
      
      {/* Keyboard shortcuts info */}
      <div className="keyboard-shortcuts-info sr-only" aria-hidden="true">
        <ul>
          <li>Ctrl+Enter: Send message</li>
          <li>Ctrl+Shift+A: Attach files</li>
          <li>Ctrl+Shift+V: Toggle voice input</li>
        </ul>
      </div>
    </div>
  );
};

AccessibleInputArea.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  onAttachFile: PropTypes.func,
  onVoiceInput: PropTypes.func,
  isProcessing: PropTypes.bool,
  placeholder: PropTypes.string,
};

AccessibleInputArea.defaultProps = {
  onAttachFile: () => {},
  onVoiceInput: () => {},
  isProcessing: false,
  placeholder: "Type your message...",
};

export default AccessibleInputArea;