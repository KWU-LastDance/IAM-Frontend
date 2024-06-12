import { useEffect, useState } from 'react'
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
import axios from 'axios';

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
    `;
    const IncomingText = styled(Text)`
    color: #3737FF;
    `
    const OutgoingText = styled(Text)`
    color: #FF2416;
    `
    const IncomingLine = styled.div`
    width: 90%;
    background-color: #3737FF;
    border: 1px solid #3737FF;
    margin-bottom: 20px;
    `
    const OutgoingLine = styled.div`
    width: 90%;
    border: 1px solid #FF2416;
    background-color: #FF2416;
    margin-bottom: 20px;
    `

    const Dates = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    align-items: center;
    `;
    const DateDiv = styled(DatePicker)`
    width: 150px;
    height: 35px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid #666666;
    margin: 15px;
    `;

    const Body = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    height: 420px;
    `;

    const LeftDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 400px;
    ::-webkit-scrollbar {
        width: 4px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #777777;
        border-radius: 10px;
    }
    `;
    const RightDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    width: 57%;
    height: 400px;
    margin-top: -40px;
    `;
    const Line = styled.div`
    width: 100%;
    border: 1px solid #D3D3D3;
    margin-bottom: 20px;
    `;
    const ListItems = styled.div`
    display: flex;
    flex-direction: column;
    height: 400px;
    overflow-y: auto;
    width: 90%;
    `;

    const ListItem = styled.div`
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

    const SubTitle = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #D3D3D3;
    padding: 0 30px;
    margin: 5px 20px;
    justify-content: space-between;
    font-size: 17px;
    `
export function History() {
    const getList = async()=> {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transactions`)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        getList()
    }, [])


      const adjustMinutes = (date: Date) => {
        const newDate = new Date(date);
        const minutes = newDate.getMinutes();
        const adjustedMinutes = minutes < 30 ? 0 : 30;
        newDate.setMinutes(adjustedMinutes, 0, 0); // set seconds and milliseconds to zero
        return newDate;
    }
        const subtractMonths = (date: Date, months: number) => {
            const newDate = new Date(date);
            newDate.setMonth(newDate.getMonth() - months);
            return newDate;
        }
        
        const adjustDateAndMinutes = (date: Date, months: number) => {
            const newDate = subtractMonths(date, months);
            return adjustMinutes(newDate);
        }

        const [startDate, setStartDate] = useState(
            adjustDateAndMinutes(new Date(), 1)
        );
          const [endDate, setEndDate] = useState(
            adjustMinutes(new Date())
        );


        const [history, setHistory] = useState([
            {
                date: '2024-03-02 09:00',
                inandout: '입고',
                item: '사과 - 상',
                amount: '200',
            },
            {
                date: '2024-03-01 09:30',
                inandout: '출고',
                item: '사과 - 상',
                amount: '150',
            }
        ])
        const [showList, setShowList] = useState([]);

        const show = (index: number) => {
            setShowList([]);
            if(history[index].inandout === '입고') {
                setIsIn(true);
                setIsOut(false);
                setShowList([history[index]]);
            } else {
                setIsOut(true);
                setIsIn(false);
                setShowList([history[index]]);
            }
        }
        
        const [isIn, setIsIn] = useState(false);
        const [isOut, setIsOut] = useState(false);
    return (
        <Container>
                <Title>히스토리</Title>

                <Dates>
                    <DateDiv 
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="yyyy/MM/dd HH:mm"
                maxDate={new Date()} />
                    <Text>~</Text>
                    <DateDiv
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                dateFormat="yyyy/MM/dd HH:mm"
                maxDate={new Date()} />
                </Dates>

<Body>
                <LeftDiv>
                    <ListItems>
                        {history.map((item, index) => (
                            <ListItem key={index} onClick={()=>show(index)}>
                                <p>{item.inandout}</p>
                                <p>{item.date}</p>
                                <br />
                                <p>{item.item}</p>
                                <p>{item.amount}</p>
                            </ListItem>
                        ))}
                    </ListItems>
                </LeftDiv>
                <RightDiv>
                    {isIn && (<>
                            <IncomingText>입고 내역</IncomingText>
                            <IncomingLine />
                            <SubTitle>
                            <p>사진</p>
                            <p>제품명</p>
                            <p>재고 변동</p>
                            </SubTitle>
                        <ListItems>
                            {showList.map((item, index) => (
                                <ListItem key={index} onClick={()=>show(index)}>
                                    <br />
                                    <p>{item.item}</p>
                                    <p>{item.amount}</p>
                                </ListItem>
                            ))}
                        </ListItems>
                        </>

                            )}
                            {isOut && (
                                <>
                                    <OutgoingText>출고 내역</OutgoingText>
                                    <OutgoingLine />
                                    <SubTitle>
                            <p>사진</p>
                            <p>제품명</p>
                            <p>재고 변동</p>
                            </SubTitle>
                                    <ListItems>
                                        {showList.map((item, index) => (
                                            <ListItem key={index}>
                                                <p>{item.inandout}</p>
                                                <p>{item.date}</p>
                                                <br />
                                                <p>{item.item}</p>
                                                <p>{item.amount}</p>
                                            </ListItem>
                                    ))}
                                    </ListItems>
                                </>
                            )}
                        
                </RightDiv>
                </Body>
</Container>
    )
}