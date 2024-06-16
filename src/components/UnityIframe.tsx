import React, { useEffect, useRef } from 'react';
import { useUnity } from './UnityContext';

export const UnityIframe = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { setIsUnityLoaded } = useUnity();

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        setIsUnityLoaded(true);
      };
      iframe.src = '../../index.html';
    }
  }, [setIsUnityLoaded]);

  return (
    <iframe
      ref={iframeRef}
      style={{ width: '0', height: '0', border: 'none', position: 'absolute', visibility: 'hidden' }}
      title="Unity Iframe"
    />
  );
};
