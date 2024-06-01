import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";

const Text = styled.p`
    font-size: 20px;
    margin-top: 0;
    color: #222222;
    margin-bottom: 10px;
    padding-left: 10px;
    `;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    `;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    width: 50%;
    height: 380px;
    `;

const Line = styled.div`
    width: 100%;
    border: 1px solid #D3D3D3;
    margin-bottom: 20px;
    `;
const SearchDiv = styled.div`
    display: flex;
    `;
const Input = styled.input`
    width: 90%;
    height: 32px;
    border: 1px solid #C9C9C9;
    border-radius: 5px;
    padding-left: 10px;
    `;

const Button = styled.button`
background-color: #3737FF;
opacity: 0.8;
color: white;
border: none;
border-radius: 10px;
padding: 10px 30px;
margin: 10px;
width: 100px;
    `;

    const DateDiv = styled(DatePicker)`
    width: 150px;
    height: 40px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid #666666;
    margin-left: 20px;
    `;

export function Outgoing() {
    const setHours = (date: Date, hour: number) => {
        const newDate = new Date(date);
        newDate.setHours(hour);
        return newDate;
      }
        const setMinutes = (date: Date, minutes: number) => {
            const newDate = new Date(date);
            newDate.setMinutes(minutes);
            return newDate;
        }
            const [startDate, setStartDate] = useState(
                setHours(setMinutes(new Date(),new Date().getMinutes()) ,new Date().getHours())
          );

    return (
            <>
            <DateDiv 
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                excludeTimes={[
                  setHours(setMinutes(new Date(), 0), 17),
                  setHours(setMinutes(new Date(), 30), 18),
                  setHours(setMinutes(new Date(), 30), 19),
                  setHours(setMinutes(new Date(), 30), 17),
                ]}
                dateFormat="yyyy/MM/dd HH:mm"
                />


                <Container>
                <Div>
                <Text>제품 목록</Text>
                <Line />
                <SearchDiv>
                <Input type="text" placeholder="검색" />
                </SearchDiv>
                </Div>

                <Div>
                <Text>출고 제품</Text>
                <Line />
                <p style={{textAlign:"right", fontSize:"16px",paddingRight:"10px"}}>출고 수량</p>

                </Div>
                </Container>

                <Button>
                    출고
                </Button>
                
            </>

    )
}