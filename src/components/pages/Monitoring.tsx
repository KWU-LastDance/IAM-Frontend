import styled from 'styled-components';
import { Unity, useUnityContext } from 'react-unity-webgl';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 250px;
    font-size: 20px;
    margin-top: 20px;
`;

const Title = styled.p`
    font-size: 30px;
    font-weight: 700;
`;

const UnityDiv = styled.div`
    display: flex;
    margin-top: 20px;
    margin-left: 20px;
`;

export function Monitoring() {
    const { unityProvider} = useUnityContext({
        loaderUrl: "Build/유니티 빌드.loader.js",
        dataUrl: "Build/유니티 빌드.data",
        frameworkUrl: "Build/유니티 빌드.framework.js",
        codeUrl: "Build/유니티 빌드.wasm",
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
