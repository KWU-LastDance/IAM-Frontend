import { useEffect, useState } from 'react'
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import { Incoming } from './Incoming';
import { Outgoing } from './Outgoing';

const Container = styled.div`
    padding: 90px;
    padding-top: 60px;
    margin-left: 160px;
    font-size: 20px;
    `;


    const ChooseDiv = styled.div`
    display: flex;
    font-size: 22px;
    color: #888888;
    `
    const Text = styled.p`
    font-size: 22px;
    margin-top: 0;
    cursor: pointer;
    margin-right: 20px;
    margin-bottom: 15px;
    `
    const IncomingText = styled(Text)`
    color: #3737FF;
    `
    const OutgoingText = styled(Text)`
    color: #FF2416;
    `
    const IncomingLine = styled.div`
    width: 100%;
    background-color: #3737FF;
    border: 1px solid #3737FF;
    margin-bottom: 20px;
    `
    const OutgoingLine = styled.div`
    width: 100%;
    border: 1px solid #FF2416;
    background-color: #FF2416;
    margin-bottom: 20px;
    `

export function InAndOut() {
    const [isIn, setIsIn] = useState(true)
    
    const isIncomimg = () => {
        setIsIn(true)
    }
    const isOutgoing = () => {
        setIsIn(false)
    }

    return (
        <Container>
                <ChooseDiv>
                    {isIn ? <IncomingText>입고</IncomingText> : <Text onClick={()=>isIncomimg()}>입고</Text>}
                    {isIn ? <Text onClick={()=>isOutgoing()}>출고</Text> : <OutgoingText>출고</OutgoingText>}
                </ChooseDiv>
                {isIn ? <IncomingLine /> : <OutgoingLine />}
                
                {isIn ? <Incoming /> : null}
                {!isIn ? <Outgoing /> : null}

        </Container>
    )
}