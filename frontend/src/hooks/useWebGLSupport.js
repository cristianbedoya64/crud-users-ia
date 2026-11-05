import { useEffect, useState } from 'react';

function canCreateWebGLContext() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

export default function useWebGLSupport() {
  const [webGLSupported, setWebGLSupported] = useState(false);

  useEffect(() => {
    setWebGLSupported(canCreateWebGLContext());
  }, []);

  return webGLSupported;
}
