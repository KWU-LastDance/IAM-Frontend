import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import {Home} from './components/pages/Home'
import {InAndOut} from './components/pages/InAndOut'
import { History } from './components/pages/History'
import {Monitoring} from './components/pages/Monitoring'
import {Dashboard} from './components/pages/Dashboard'
import { Sidebar } from './components/Sidebar'
import { UnityProvider, useUnity } from './components/UnityContext';
import { useUnityContext } from 'react-unity-webgl';
import { useEffect, useRef } from 'react';

const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const { unityProvider, setUnityProvider } = useUnity();

  const { unityProvider: newUnityProvider } = useUnityContext({
    loaderUrl: "Build/Unity_build_2.loader.js",
    dataUrl: "Build/Unity_build_2.data",
    frameworkUrl: "Build/Unity_build_2.framework.js",
    codeUrl: "Build/Unity_build_2.wasm",
  });


  useEffect(() => {
    if (newUnityProvider) {
      setUnityProvider(newUnityProvider);
    }
  }, [newUnityProvider, setUnityProvider]);

  useEffect(() => {
    if (iframeRef.current && location.pathname === "/monitoring") {
      iframeRef.current.style.display = "block";
    } else if (iframeRef.current) {
      iframeRef.current.style.display = "none";
    }
  }, [location]);

  return (
    <>
    <iframe
        ref={iframeRef}
        src={'./public/index.html'}
        style={{ display: 'none', width: '100%', height: '500px', border: 'none',marginTop:'100px'}}
        title="Unity Loader"
      />
      {!isHome && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/in-and-out" element={<InAndOut />} />
        <Route path="/history" element={<History />} />
        <Route path="/monitoring" element={<div style={{ border: 'none', width:"100%", height:"100%" }} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </>
  );
};

function App() {
  return (
    <UnityProvider>
    <Router>
      <AppContent />
    </Router>
    </UnityProvider>
  );
}

export default App
