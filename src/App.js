import './App.css';
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from './Components/Details';
import Booking from './Components/Booking';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={
        <>
          <Home/>
        </>}
      />
      <Route path="/details/:id" element={
        <>
          <Details/>
        </>}
      />
      <Route path="/booking/:id" element={
        <>
          <Booking/>
        </>}
      />
      
    </Routes>
  </Router>
  );
}

export default App;
