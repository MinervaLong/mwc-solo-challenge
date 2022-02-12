import {CandidateProvider} from './context/CandidateState';
import { Home } from './views/Home.js';
import { AddCandidate } from './components/AddCandidate.js';
import {BrowserRouter, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <CandidateProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddCandidate />} />
          </Routes>
        </BrowserRouter>
      </div>      
    </CandidateProvider>
  );
}

export default App;



