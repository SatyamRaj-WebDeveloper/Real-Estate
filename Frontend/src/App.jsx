import NavBar from './components/NavBar.jsx'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';

function App() {
  

  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<NavBar/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
