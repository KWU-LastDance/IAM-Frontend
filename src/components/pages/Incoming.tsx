import { useEffect, useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
import { se } from 'date-fns/locale';
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

export function Incoming() {
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

    const [products, setProducts] = useState([
        ])

        const getList = async()=> {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`)
            .then((res) => {
                const sorted = res.data.sort((a,b)=>a.id - b.id)
                setProducts(sorted)
                console.log(sorted)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        useEffect(() => {
            getList()
        }, [])

        const [inputs, setInputs] = useState([
        ])

        const [isIncomimg, setIsIncomimg] = useState(false)
        const input = (index) => {
            setIsIncomimg(true)
            const isExist = inputs.findIndex((input) => input.id === products[index].id)
            if(isExist === -1){
                setInputs([...inputs, {id:products[index].id, name: products[index].name, cnt: 1}])
            }
            else{
                setInputs(inputs.map((input, i) => i === isExist ? {...input, cnt: input.cnt + 1} : input))
            }
        }

        const onChange = (i) => {
            if(event.target.value <= 0){
                setInputs(inputs.map((input, index) => i === index ? {...input, cnt: 1} : input))
            }
            else{
            setInputs(inputs.map((input, index) => i === index ? {...input, cnt: event.target.value} : input))
        }
    }

    const deleteBtn = (i) => {
        setInputs(inputs.filter((input, index) => i !== index))
    }

    const clickIn = () => {
        if(inputs.length === 0){
            alert("입고할 제품을 선택해주세요.")
            return;
        }
        else {
        setIncoming()
        console.log(inputs)
        alert("입고되었습니다.")
        setInputs([])
        getList()
    }
}

    const validateData = (data) => {
        return data.every(item => {
            return item.product_id !== null && item.product_id !== undefined && !isNaN(item.product_id) &&
                   item.variation !== null && item.variation !== undefined && !isNaN(item.variation);
        });
    };
    
    const setIncoming = async () => {
        const data = inputs.map((input) => {
            return {
                'product_id': Number(input.id), 
                'variation': Number(input.cnt),
            };
        });
    
        // 데이터 로그 출력
        console.log('Sending data:', data);
    
        // 데이터 유효성 검증
        if (!validateData(data)) {
            console.error("Data contains invalid values:", data);
            return;
        }
    
        if (data.some(item => item.product_id == null || item.variation == null)) {
            console.error("Data contains null values:", data);
            return;
        }
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/transactions/store`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
        } catch (err) {
            if (err.response) {
                // 서버가 200대가 아닌 상태 코드로 응답한 경우
                console.log('Error response:', err.response.data);
            } else if (err.request) {
                // 요청이 만들어졌으나 응답을 받지 못한 경우
                console.log('No response received:', err.request);
            } else {
                // 다른 오류가 발생한 경우
                console.log('Error:', err.message);
            }
        }
    };
    
    

    return (
            <> 
                <DateDiv 
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
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
                            <p>{product.stock}</p>
                        </Item>
                    ))}

                </Items>
                </Div>

                {isIncomimg ?
                <Div>
                <Text>입고 제품</Text>
                <Line />
                <p style={{textAlign:"right", fontSize:"16px",paddingRight:"150px", marginBottom:"0"}}>입고 수량</p>
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
                    입고
                </Button>
                
            </>

    )
}