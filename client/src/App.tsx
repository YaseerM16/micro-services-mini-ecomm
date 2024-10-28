import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import CreateProduct from './pages/CreateProduct';

// import Home from './Home';
// import Login from './Login';
// import SignUp from './SignUp';
Home
Login
SignUp

const App: React.FC = () => {
  const [logged, setLogged] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("logged") || "false");
  });

  useEffect(() => {
    // Update state based on localStorage
    setLogged(JSON.parse(localStorage.getItem("logged") || "false"));
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={logged ? <Home loginSetter={setLogged} /> : <Login loginSetter={setLogged} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create-product" element={<CreateProduct />} />
          </Routes>
        </div>
      </Router>
    </>

  );
};

export default App;
