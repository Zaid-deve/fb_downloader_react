import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './config.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Search from './components/Search';
import Download from './components/Download';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' exact element={<Home />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/download' element={<Download />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </div>
    </Router>
  </StrictMode>
);
