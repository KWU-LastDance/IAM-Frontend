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
const Text = styled.p`
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 60px;
    `;


export function Dashboard() {
    return (
        <Container>
            <Sidebar />
            <Body>
                <h1>대시보드</h1>
                    <Text>Manage your inventory with ease</Text>

            </Body>
        </Container>
    )
}