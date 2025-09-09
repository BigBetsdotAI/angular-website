import React, { useState, useEffect, useRef } from 'react';

const TypeWriter = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = '', 
  onComplete = null,
  cursor = true,
  cursorChar = '|',
  cursorBlinkSpeed = 530
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const timeoutRef = useRef(null);
  const cursorIntervalRef = useRef(null);

  useEffect(() => {
    // Reset everything when text changes
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
    setHasStarted(false);
    setShowCursor(false);
    
    // Clear any existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
  }, [text]);

  useEffect(() => {
    // Start the typing animation after delay
    timeoutRef.current = setTimeout(() => {
      setHasStarted(true);
      setShowCursor(cursor);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay, cursor, text]);

  useEffect(() => {
    if (!hasStarted) return;

    if (currentIndex < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) onComplete();
      
      // Hide cursor after completion
      if (cursor) {
        setTimeout(() => setShowCursor(false), 1000);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, text, speed, onComplete, cursor, isComplete, hasStarted]);

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor) return;
    
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => {
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, [cursorBlinkSpeed]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, []);

  return (
    <span className={className}>
      {displayText}
      {cursor && showCursor && (
        <span style={{ 
          opacity: showCursor ? 1 : 0,
          transition: 'opacity 0.1s ease-in-out',
          color: '#ff4747',
          fontWeight: 'bold'
        }}>
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default TypeWriter;
