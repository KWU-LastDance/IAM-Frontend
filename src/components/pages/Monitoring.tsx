import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Sidebar } from '../Sidebar';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 250px;
    font-size: 20px;
    `;

const Body = styled.div`
    `;


export function Monitoring() {
    return (
        <Container>
            <Sidebar />
            <Body>
                <h1>모니터링</h1>

            </Body>
        </Container>
    )
}