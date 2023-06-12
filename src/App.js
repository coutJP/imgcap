import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Admin from './pages/admin/admin'
import User from './pages/user/user';
function App() {
  return (
    <div >
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
    
    </div>
  );
}

export default App;
