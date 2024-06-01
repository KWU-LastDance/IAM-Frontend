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
    margin: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    font-size: 20px;
    background-color: #EDEFFE;
    color:#333333;
    `;
    const Text = styled.p`
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 60px;
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
    <Text>IAM을 사용하여 쉽고 빠르게 재고 관리를 시작하세요. 제품마다 정해진 위치가 있는 경우 기본모드의 속성을 추가하여 제품별 위치를 기록해 둘수 있습니다. 입고, 출고, 조정, 이동은 재고 수량이 변경될때 사용됩니다.
    </Text>
    <Button onClick={()=>navigate('/in-and-out')}>시작하기</Button>
    </Container>
    </Body>
</>
  )
}