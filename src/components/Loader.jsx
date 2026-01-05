import React, { useState, useEffect, useRef } from 'react';

const greetings = [
  { language: 'English', message: 'Hello!' },
  { language: 'Spanish', message: '¡Hola!' },
  { language: 'French', message: 'Bonjour!' },
  { language: 'German', message: 'Hallo!' },
  { language: 'Chinese', message: '你好!' },
  { language: 'Japanese', message: 'こんにちは!' },
  { language: 'Korean', message: '안녕하세요!' },
  { language: 'Hindi', message: 'नमस्ते!' },
];

const GREETING_INTERVAL = 50; // ms, fast like your HTML
const FINAL_DELAY = 1000; // ms, after last greeting before onFinish

const Loader = ({ onFinish, slideUp }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flash, setFlash] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    setFlash(true); // Always start with flash
    if (currentIndex < greetings.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setFlash(false);
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setFlash(true);
        }, 80); // duration of quickFlash scale only, no opacity
      }, GREETING_INTERVAL);
    } else {
      // Last greeting: wait, then call onFinish
      timeoutRef.current = setTimeout(() => {
        if (onFinish) onFinish();
      }, FINAL_DELAY);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, onFinish]);

  const greeting = greetings[currentIndex];

  return (
    <div
      style={{
        ...styles.container,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        width: '100vw',
        height: '100vh',
        transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1)',
        transform: slideUp ? 'translateY(-100%)' : 'translateY(0)',
        pointerEvents: slideUp ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          ...styles.greeting,
          color: '#fff',
          background: 'none',
          WebkitBackgroundClip: 'initial',
          WebkitTextFillColor: '#fff',
          transform: flash ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.15s',
        }}
      >
        {greeting.message}
        <div style={styles.language}>{greeting.language}</div>
      </div>
      <style>{`body { background: #000 !important; }`}</style>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    background: '#ff9800', // TEMP: orange for testing
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  greeting: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    position: 'relative',
    textAlign: 'center',
    minWidth: '200px',
    minHeight: '80px',
    letterSpacing: '2px',
    userSelect: 'none',
  },
  language: {
    fontSize: '1.1rem',
    color: '#ffffff',
    marginTop: '10px',
    fontWeight: 200,
    letterSpacing: '1px',
    WebkitTextFillColor: '#ffffff',
    WebkitBackgroundClip: 'initial',
  },
};

export default Loader; 