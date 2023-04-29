import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Table} from 'react-bootstrap'

const LocalPage = () => {
    const [locals, setLocals] = useState([]);

    const getLocal =async() =>{
        const url="https://dapi.kakao.com/v2/local/search/keyword.json";
        const config={
            headers: {"Authorization": "KakaoAK d96a3bcd9957a07238692b89c12e1e77"},
            params: {query: '인하대 맛집', page:1, size:5}
        }
        //setLoading(true);

        const result= await axios.get(url, config);
        console.log(result);
        setLocals(result.data.documents);
        // setIs_end(result.data.meta.is_end);
        //setLoading(false);
    }

    useEffect(()=>{ //페이지가 랜더링될때 호출
        getLocal();
    }, []) //최초 한번만 랜더링 되게 의존배열 사용

    return (
        <Row>
            <Col>
            <h1 className='text-center my-3'>지역검색</h1>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <td>장소명</td>
                        <td>전화번호</td>
                        <td>주소</td>
                    </tr>
                </thead>
                <tbody>
                    {locals.map(local =>
                    <tr key ={local.id}>
                        <td>{local.place_name}</td>
                        <td>{local.phone}</td>
                        <td>{local.address_name}</td>
                    </tr>
                    )}
                </tbody>
            </Table>
            </Col>
        </Row>
    )
}

export default LocalPage