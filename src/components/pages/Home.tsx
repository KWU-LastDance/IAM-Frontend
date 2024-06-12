import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';

const LogoDiv = styled.div`
    display: flex;
    margin:1%;
    align-items: center;
    `;
const TextDiv = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    `;
const Icon = styled.div`
font-size: 70px;
    margin-right: 20px;
    margin-top: 10px;
    `;
const Title = styled.h1`
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 0;
    `;
const SubTitle = styled.h2`
    font-size: 18px;
    font-weight: 400;
    margin-top: 0;
    `;


const Body = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 70px;
    
    `;
    const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 700px;
    height: 200px;
    padding: 90px;
    margin: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    font-size: 20px;
    background-color: #EDEFFE;
    color:#333333;
    `;
    const Text = styled.p`
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 45px;
    line-height: 1.5;
    `;
    const Button = styled.button`
    background-color: #3737FF;
    opacity: 0.8;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 40px;
    margin: 10px;
    `


export function Home() {
    const navigate = useNavigate()

  return (
    <>
    <LogoDiv>
        <Icon >
        <FontAwesomeIcon icon={faBoxOpen} style={{color: "#3737FF",}} />
        </Icon>
        <TextDiv>
      <Title>IAM</Title>
      <SubTitle>Intelligent Argriculture Management</SubTitle>
        </TextDiv>
    </LogoDiv>

    <Body>
    <Container>
    <Text>IAM은 농산품의 입출고 관리, 품질별 분류 모니터링, 입출고 내역 조회, 그리고 종합 대시보드를 통해 농산품 유통 센터 운영을 최적화합니다. 제품을 품질별로 분류하는 과정을 실시간으로 모니터링하고, 정확한 재고 관리를 통해 효율적인 입출고를 지원합니다. 또한, 사용자가 필요한 정보를 한눈에 파악할 수 있도록 대시보드를 제공합니다. IAM과 함께 효율적이고 체계적인 재고 관리를 경험하세요.
    </Text>
    <Button onClick={()=>navigate('/in-and-out')}>시작하기</Button>
    </Container>
    </Body>
</>
  )
}