import { useEffect, useState } from 'react'
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
    width: 47%;
    height: 410px;
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
    width: 48%;
    height: 400px;
    margin-top: -40px;
    `;
    
    const ListItems = styled.div`
    display: flex;
    flex-direction: column;
    height: 410px;
    overflow-y: auto;
    width: 90%;
    `;

    const RightItem = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #D3D3D3;
    padding: 0 20px;
    margin: 5px 15px;
    font-size: 17px;
    align-items: center;
    position: relative;
    justify-content: space-between;
    `;

    const ListItem = styled(RightItem)`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    margin: 6px 15px;
    position: relative;
    
    `;

    const ListTopdiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    margin: 0px 20px;
    font-size: 17px;
    width: 100%;
    height: 30px;
    `;
    const ListAuto = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 10px;
    margin: 0px;
    margin-left: 360px;
    `

    const Stock = styled.div`
    display: flex;
    flex-direction: row;
    `
    const StockText = styled.p`
    font-size: 17px;
    margin-right: 15px;
    margin-left: 15px;
    `
    const SubTitle = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #D3D3D3;
    padding: 0 30px;
    margin: 5px 20px;
    font-size: 17px;
    justify-content: space-between;
    margin-right: 90px;
    padding-right: 60px;
    `
    
export function History() {
    const getList = async()=> {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transactions`)
        .then((res) => {
            setHistory(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        getList()
    }, [])

    
    const [history, setHistory] = useState([
    ]);

    const [showList, setShowList] = useState([]);

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
            new Date()
        );

        const toISOStringWithTwoDigitSeconds = (date) => {
            return date.toISOString().slice(0, 19);
        };
        const formatDateTime = (date: Date) => {
            const kstDate = new Date(date.getTime());

            const options = { 
                timeZone: 'Asia/Seoul', 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: false 
            };
            const formatter = new Intl.DateTimeFormat('en-CA', options);
            const parts = formatter.formatToParts(kstDate);
            const formattedDate = `${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'day').value}T${parts.find(p => p.type === 'hour').value}:${parts.find(p => p.type === 'minute').value}`;
            return formattedDate;
        };
    

        const getListByDate = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transactions`, {
                params: {
                    start: formatDateTime(startDate),
                    end: formatDateTime(endDate)
                }
            })
            .then((res) => {    
                console.log(res.data)  
                setHistory(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }

        useEffect(() => {
            getListByDate()
        }, [startDate, endDate])
        
        const getHistory = async (id) => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transactions/${id}`)
            .then((res) => {
                setShowList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }

        const select = (index: number) => {
            setShowList([]);
            console.log(history[index])
            getHistory(history[index].id)
            if(history[index].type === 'store') {
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

        const formatTimestamp = (timestamp) => {
            const date = new Date(timestamp);
            const options = { 
                timeZone: 'Asia/Seoul', 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: false 
            };
            const formatter = new Intl.DateTimeFormat('en-CA', options);
            const parts = formatter.formatToParts(date);
            return `${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'day').value} ${parts.find(p => p.type === 'hour').value}:${parts.find(p => p.type === 'minute').value}`;
        };
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
                    {history.length === 0 && <p style={{fontSize:'17px', marginLeft:"30px"}}>해당 기간에 등록된 데이터가 없습니다.</p>}
                    <ListItems>
                        {history.map((item, index) => (
                            <ListItem key={index} onClick={()=>select(index)}>
                                <ListTopdiv>
                                {item.type === 'store' ?
                                    <p style={{color:"blue"}}>입고</p>
                                :
                                    <p style={{color:"red"}}>출고</p>
                                }
                                <p>{formatTimestamp(item.timestamp)}</p>
                                <br />
                                <p>{item.quantity}품목</p>
                                <p>총 {item.variation}개</p>
                                </ListTopdiv>
                                <ListAuto>
                                    {item.auto === true ?
                                        <p>자동</p>
                                    :
                                        <p>수동</p>}
                                </ListAuto>
                            </ListItem>
                        ))}
                    </ListItems>
                </LeftDiv>
                <RightDiv>
                    {isIn && (<>
                            <IncomingText>입고 내역</IncomingText>
                            <IncomingLine />
                            <SubTitle>
                            <p>상품명</p>
                            <p style={{marginLeft:"190px"}}>재고 변동</p>
                            </SubTitle>
                        <ListItems>
                            {showList.map((item, index) => (
                                <RightItem key={index}>
                                    <p>{item.product_name}</p>
                                    <Stock>
                                    <StockText>{item.previous_stock}</StockText>
                                    <p><FontAwesomeIcon icon={faArrowRight} style={{color: "#666666"}} /></p>
                                    <StockText>{item.current_stock}</StockText>
                                    </Stock>
                                </RightItem>
                            ))}
                        </ListItems>
                        </>

                            )}
                            {isOut && (
                                <>
                                    <OutgoingText>출고 내역</OutgoingText>
                                    <OutgoingLine />
                                    <SubTitle>
                                    <p>상품명</p>
                            <p>재고 변동</p>
                            </SubTitle>
                            <ListItems>
                            {showList.map((item, index) => (
                                <RightItem key={index}>
                                <p>{item.product_name}</p>
                                <Stock>
                                <StockText>{item.previous_stock}</StockText>
                                <p><FontAwesomeIcon icon={faArrowRight} style={{color: "#666666"}} /></p>
                                <StockText>{item.current_stock}</StockText>
                                </Stock>
                            </RightItem>
                            ))}
                        </ListItems>
                                </>
                            )}
                        
                </RightDiv>
                </Body>
</Container>
    )
}