import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Form, Button} from 'react-bootstrap'
import MapPage from './MapPage';

const LocalPage = () => {
    const [locals, setLocals] = useState([]);
    const [query , setQuery] = useState('인하대학교');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [is_end, setIs_end] =useState(false);

    const getLocal = async () => {
        const url = "https://dapi.kakao.com/v2/local/search/keyword.json";
        const config = {
            headers: { "Authorization": "KakaoAK d96a3bcd9957a07238692b89c12e1e77" },
            params: { query: query, page: page, size: 5 }
        }
        //setLoading(true);

        const result = await axios.get(url, config);
        console.log(result);
        setLocals(result.data.documents);
        setTotal(result.data.meta.pageable_count);
        setIs_end(result.data.meta.is_end)
        // setIs_end(result.data.meta.is_end);
        //setLoading(false);
    }

    useEffect(() => { //페이지가 랜더링될때 호출
        getLocal();
    }, [page]) //최초 한번만 랜더링 되게 의존배열 사용

    const onSearch = (e) => {
        e.preventDefault(); //페이지 섯밋이 되지않음
        getLocal(); //다시 검색을 함
    }
    return (
        <Row>
            <Row>
                <Col>
                    <h1 className='text-center my-3'>지역검색</h1>
                    <Row className='my-2'>
                        <Col md={3} xs={6}>
                            <Form onSubmit ={onSearch}>
                                <Form.Control value ={query}
                                onChange= {(e)=> setQuery(e.target.value)}
                                 placeholder='검색어'/>
                            </Form>
                        </Col>
                        <Col>
                            검색수 : {total}건
                        </Col>
                    </Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr className='text-center'>
                                <td>장소명</td>
                                <td>전화번호</td>
                                <td>주소</td>
                                <td>위치</td>
                            </tr>
                        </thead>
                        <tbody>
                            {locals.map(local =>
                                <tr key={local.id}>
                                    <td>{local.place_name}</td>
                                    <td>{local.phone}</td>
                                    <td>{local.address_name}</td>
                                    <td><MapPage local={local}/></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className='text-center my-2'>
                        <Button
                            disabled={page==1}
                            onClick={()=>setPage(page-1)}>이전</Button>
                        <span className='mx-3'>{page}</span>
                        <Button 
                            disabled={is_end}
                            onClick={()=>setPage(page+1)}>다음</Button>
                    </div>
                </Col>
            </Row>
        </Row>
    )
}

export default LocalPage