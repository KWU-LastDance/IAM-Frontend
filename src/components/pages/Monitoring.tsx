import { useEffect, useState } from 'react'
import styled from 'styled-components';

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
const Text = styled.p`
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 60px;
    `;

export function Monitoring() {
    return (
        <Container>
                <Title>모니터링</Title>

        </Container>
    )
}