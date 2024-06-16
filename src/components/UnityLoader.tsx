import React, { useEffect } from 'react';
import { useUnity } from './UnityContext';
import { useUnityContext } from 'react-unity-webgl';

export const UnityLoader = () => {
  const { unityProvider, setUnityProvider } = useUnity();

  const { unityProvider: newUnityProvider } = useUnityContext({
    loaderUrl: "Build/Unity_build_2.loader.js",
    dataUrl: "Build/Unity_build_2.data",
    frameworkUrl: "Build/Unity_build_2.framework.js",
    codeUrl: "Build/Unity_build_2.wasm",
  });

  useEffect(() => {
    if (!unityProvider && newUnityProvider) {
      setUnityProvider(newUnityProvider);
    }
  }, [unityProvider, newUnityProvider, setUnityProvider]);

  return null;
};
