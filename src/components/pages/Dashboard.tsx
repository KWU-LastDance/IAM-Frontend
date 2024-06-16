import { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';

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

    const IframeContainer = styled.div`
    width: 97%;
    height: 540px;
    margin-top:10px;
`;

const StyledIframe = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
`;

export function Dashboard() {
    /*
    const getDashboard = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        getDashboard();
    }, [])
    */
    return (
        <Container>
                <Title>대시보드</Title>
                <IframeContainer>
                <StyledIframe src="http://localhost:8501" />
            </IframeContainer>
        </Container>
    )
}