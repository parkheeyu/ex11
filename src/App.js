import './App.css';
import RouterPage from './components/RouterPage';
import any from './images/any.png'
import {Container} from 'react-bootstrap'

function App() {
    return (
        <Container className="App">
            <img src={any} width="100%"/>
            <RouterPage/>
        </Container>
    );
}

export default App;