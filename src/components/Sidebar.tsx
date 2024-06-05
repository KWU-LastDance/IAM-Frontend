import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 210px;
    background-color: #EDEFFE;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 15px;
    box-sizing: border-box;
    `;
    const LogoDiv = styled.div`
    display: flex;
    margin-bottom: 30px;
    cursor: pointer;
    `;
const Icon = styled.div`    
    font-size: 55px;
    margin-right: 20px;
    margin-top: 10px;
    `;
const TextDiv = styled.div`
    `;
const Title = styled.h1`
    font-size: 30px;
    font-weight: 700;
    `;

    const Ul = styled.ul`
    list-style-type: none;
    padding-left: 0;
    `;

const Li = styled.li`
    font-size: 19px;
    margin-top: 15px;
    padding-top: 10px;
    padding-left: 10px;
    cursor: pointer;
    color:#555555;
    width: 60%;
    `;
const ChoosedLi = styled(Li)`
    color: #3737FF;
    
    `

export function Sidebar() {
    const navigate  = useNavigate()

    const [isInandout, setIsInandout] = useState(true)
    const [isHistory, setIsHistory] = useState(false)
    const [isMonitoring, setIsMonitoring] = useState(false)
    const [isDashboard, setIsDashboard] = useState(false)

    const handleInandout = () => {
        setIsInandout(true)
        setIsHistory(false)
        setIsMonitoring(false)
        setIsDashboard(false)
        navigate('/in-and-out')
    }

    const handleHistory = () => {
        setIsHistory(true)
        setIsInandout(false)
        setIsMonitoring(false)
        setIsDashboard(false)
        navigate('/history')
    }

    const handleMonitoring = () => {
        setIsMonitoring(true)
        setIsInandout(false)
        setIsHistory(false)
        setIsDashboard(false)
        navigate('/monitoring')
    }

    const handleDashboard = () => {
        setIsDashboard(true)
        setIsInandout(false)
        setIsHistory(false)
        setIsMonitoring(false)
        navigate('/dashboard')
    }

    return (
        <>
            <Container>
                <LogoDiv onClick={()=>navigate('/')}>
                <Icon>
        <FontAwesomeIcon icon={faBoxOpen} style={{color: "#3737FF"}} />
                </Icon>
                <TextDiv>
                    <Title>IAM</Title>
                </TextDiv>
                </LogoDiv>
                <Ul>
                {isInandout ? <ChoosedLi onClick={()=>handleInandout()}>입출고</ChoosedLi> : <Li onClick={()=>handleInandout()}>입출고</Li>}
                {isHistory ? <ChoosedLi onClick={()=>handleHistory()}>히스토리</ChoosedLi> : <Li onClick={()=>handleHistory()}>히스토리</Li>}
               {isMonitoring ? <ChoosedLi onClick={()=>handleMonitoring()}>모니터링</ChoosedLi> : <Li onClick={()=>handleMonitoring()}>모니터링</Li>}
                {isDashboard ? <ChoosedLi onClick={()=>handleDashboard()}>대시보드</ChoosedLi> : <Li onClick={()=>handleDashboard()}>대시보드</Li>}
                </Ul>
            </Container>
        </>
    )
}