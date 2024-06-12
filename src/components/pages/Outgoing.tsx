import { useEffect, useState, useRef } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
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
    height: 420px;
    `;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    width: 50%;
    height: 380px;
    ::-webkit-scrollbar {
        width: 4px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #777777;
        border-radius: 10px;
    }
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
    width: 100%;
    height: 35px;
    border: 1px solid #C9C9C9;
    border-radius: 5px;
    padding-left: 10px;
    `;

    const DateDiv = styled(DatePicker)`
    width: 150px;
    height: 35px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid #666666;
    margin-left: 20px;
    `;

    const Items = styled.div`
    display: flex;
    flex-direction: column;
    height: 400px;
    overflow-y: auto;
    margin: 10px 20px;
    `;

    const Item = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #D3D3D3;
    padding: 0 30px;
    margin: 5px 20px;
    justify-content: space-between;
    font-size: 17px;
    cursor: pointer;
    align-items: center;
    position: relative;
    `;

    const Button = styled.button`
    background-color: #3737FF;
    opacity: 0.8;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 30px;
    margin-left: 30px;
    width: 100px;
    cursor: pointer;
        `;

        const Cnt = styled.input`
        width: 70px;
        height: 30px;
        border: 1px solid #C9C9C9;
        border-radius: 5px;
        padding-left: 10px;
        position: absolute;
        right: 100px;
        `
        const DeleteBtn = styled.button`
        background-color: #FB4C40;
        color: white;
        border: none;
        border-radius: 50px;
        padding: 5px 10px;
        cursor: pointer;
        position: absolute;
        right: 20px;
        `;

export function Outgoing() {
    const adjustMinutes = (date: Date) => {
        const newDate = new Date(date);
        const minutes = newDate.getMinutes();
        const adjustedMinutes = minutes < 30 ? 0 : 30;
        newDate.setMinutes(adjustedMinutes, 0, 0); // set seconds and milliseconds to zero
        return newDate;
    }
    
    const [startDate, setStartDate] = useState(
        adjustMinutes(new Date())
    );

const clickIn = () => {
            alert("출고되었습니다.")
        }

        const [products, setProducts] = useState([
            {
                name: '사과 - 상',
                quantity: 250
            },
            {
                name: '바나나 - 중',
                quantity: 150
            }
        ])

        const [inputs, setInputs] = useState([
        ])

        const [isOutgoing, setIsOutgoing] = useState(false)
        const input = (index) => {
            setIsOutgoing(true)
            const isExist = inputs.findIndex((input) => input.name === products[index].name)
            if(isExist === -1){
                setInputs([...inputs, {name: products[index].name, cnt: 1}])
            }
            else{
                setInputs(inputs.map((input, i) => i === isExist ? {...input, cnt: input.cnt + 1} : input))
            }
        }

        const onChange = (i) => {
            if(event.target.value <= 0){
                setInputs(inputs.map((input, index) => i === index ? {...input, cnt: 1} : input))
            }
            else if(event.target.value > products[i].quantity){
                setInputs(inputs.map((input, index) => i === index ? {...input, cnt: products[i].quantity} : input))
            }
            else{
            setInputs(inputs.map((input, index) => i === index ? {...input, cnt: event.target.value} : input))
        }
    }

    const deleteBtn = (i) => {
        setInputs(inputs.filter((input, index) => i !== index))
    }

    return (
            <> 
                <DateDiv 
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                excludeTimes={[
                ]}
                dateFormat="yyyy/MM/dd HH:mm"
                maxDate={new Date()} />


                <Container>
                <Div>
                <Text>제품 목록</Text>
                <Line />
                <SearchDiv>
                <Input type="text" placeholder="검색" />
                </SearchDiv>
                <Items>
                    {products.map((product, index) => (
                        <Item key={index} onClick={()=>input(index)}>
                            <p>{product.name}</p>
                            <p>{product.quantity}</p>
                        </Item>
                    ))}
                    <Item>
                        <p>품목2</p>
                        <p>수량</p>
                    </Item>
                    <Item>
                        <p>품목3</p>
                        <p>수량</p>
                    </Item>
                    <Item>
                        <p>품목4</p>
                        <p>수량</p>
                    </Item>
                    <Item>
                        <p>품목5</p>
                        <p>수량</p>
                    </Item>
                    <Item>
                        <p>품목5</p>
                        <p>수량</p>
                    </Item>                    <Item>
                        <p>품목5</p>
                        <p>수량</p>
                    </Item>
                </Items>
                </Div>

                {isOutgoing ?
                <Div>
                <Text>출고 제품</Text>
                <Line />
                <p style={{textAlign:"right", fontSize:"16px",paddingRight:"150px", marginBottom:"0"}}>출고 수량</p>
                <Items>
                    {inputs.map((input, index) => (
                        <Item key={index}>
                            <p>{input.name}</p>
                            <Cnt type="number" value={input.cnt} onChange={()=>onChange(index)} />
                            <DeleteBtn onClick={()=>deleteBtn(index)}>x</DeleteBtn>
                        </Item>
                    ))}
                </Items>
                </Div>
                : null }
                
                </Container>

                <Button onClick={()=>clickIn()}>
                출고
                </Button>
                
            </>

    )
}