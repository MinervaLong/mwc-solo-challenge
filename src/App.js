import { CandidateList } from './components/CandidateList';
import { CandidateProvider } from './context/CandidateState';

const App = () => {
  return (
    <CandidateProvider>
      <div className="App">
        <CandidateList />
      </div>
    </CandidateProvider>
  );
}

export default App;



