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
        loaderUrl: "Build/Unity_build.loader.js",
        dataUrl: "Build/Unity_build.data",
        frameworkUrl: "Build/Unity_build.framework.js",
        codeUrl: "Build/Unity_build.wasm",
    });

    return (
        <Container>
            <Title>모니터링</Title>
            <UnityDiv>
            </UnityDiv>
        </Container>
    );
}
