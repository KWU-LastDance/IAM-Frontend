import React from 'react';
import { useUnity } from '../UnityContext';
import { Unity } from 'react-unity-webgl';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    margin-top: 20px;
    margin-left: 250px;
`;

const Title = styled.p`
    font-size: 30px;
    font-weight: 700;
`;

const UnityDiv = styled.div`
    display: flex;
    margin-top: 10px;
    margin-left: -200px;
    height: 560px;
`;

export const Monitoring = () => {
    const { unityProvider } = useUnity();
  
    return (
      <Container>
        <Title>모니터링</Title>
        <UnityDiv>
        {unityProvider && (
          <iframe
            src={'../../../index.html'}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Unity Iframe"
          />
        )}
        </UnityDiv>
      </Container>
    );
  };

/*
export function Monitoring() {
    const { unityProvider} = useUnityContext({
        loaderUrl: "Build/Unity_build_2.loader.js",
        dataUrl: "Build/Unity_build_2.data",
        frameworkUrl: "Build/Unity_build_2.framework.js",
        codeUrl: "Build/Unity_build_2.wasm",
    });

    return (
        <Container>
            <Title>모니터링</Title>
            <UnityDiv>
                <Unity unityProvider={unityProvider} style={{width:1050}} />
            </UnityDiv>
        </Container>
    );
}

*/