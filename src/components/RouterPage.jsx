import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import HomePage from './HomePage';
import BookPage from './BookPage';
import LocalPage from './LocalPage';
import LoginPage from './LoginPage';
import JoinPage  from './JoinPage';
import MyPage from './MyPage';
import logo from './logo1.jpg';



const RouterPage = ({history}) => { // 히스토리 쓸려면 위드라우터로 묶어야함
    const onLogout = () => {
        sessionStorage.removeItem('email');
        history.push('/');
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/"><img
              src={logo}
              alt="로고"
              width="100%"
              height="60"
              className="d-inline-block align-top  rounded-image" 
            /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100%' }}
                            navbarScroll>
                            <Link to="/">Home</Link>
                            <Link to="/book">도서검색</Link>
                            <Link to="/local">지역검색</Link>
                        </Nav>
                        <div> 
                            {sessionStorage.getItem('email') ?
                                <>
                                <Link to="/mypage">{sessionStorage.getItem('email')}</Link>
                                <Link  
                                    onClick={onLogout} 
                                    to="/logout">로그아웃</Link>  
                                </>
                                :
                                <Link to="/login">로그인</Link>
                            }
                            
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
                <Route path="/" component={HomePage} exact={true}/>
                <Route path="/book" component={BookPage}/> 
                <Route path="/local" component={LocalPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/Join" component={JoinPage}/>
                <Route path="/mypage" component={MyPage}/>
                
                
            </Switch>
        </>
    )
}

export default withRouter(RouterPage)