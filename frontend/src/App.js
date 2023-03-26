import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'

import {
 
  Routes,
  Route
  
} from "react-router-dom";
import Dashboard1 from './components/Dashboard1';

const App = () => {
  return (
    <>
      <Routes>
      <Route exact path="/" element={ <Login> </Login> } ></Route>
          <Route exact path="/signup"  element= {<Signup></Signup>} > </Route>
         
          <Route exact path="/dash" element={<Dashboard1></Dashboard1>} ></Route>
    </Routes>
    </>
  )
}

export default App