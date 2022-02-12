import React, { useContext } from 'react';
import { CandidateContext } from '../context/CandidateState';

export const CandidateCard = () => {
  const { candidates, removeCandidate } = useContext(CandidateContext);
  return (
    <React.Fragment>
      {candidates.length > 0 ? (
        <React.Fragment>
          {candidates.map((candidate) => (
            <div className="rounded overflow-hidden shadow-lg flex flex-col justify-center items-center bg-blue-50" key={candidate.id} >
              <div className="flex flex-col text-center py-4">
                <img className='w-44 self-center mb-2' src={`https://robohash.org/${candidate.name}.png?set=set5`} alt=''/>
                <h2 className="font-bold text-xl">
                  {candidate.name}
                </h2>
                <p className="text-md text-gray-400">
                  {candidate.mail}
                </p>
                <p className="px-16 text-center text-md text-gray-800">
                  {candidate.description}
                </p>
                <p className="px-16 mt-3 text-center font-semibold">
                  {candidate.country}
                </p>
                <span className="px-16 mt-3 text-center italic">
                  {candidate.city}
                </span>
              </div>
              <div className='flex flex-row justify-center items-center'>

                <div className="sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                  <button className='bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded  items-center'>View</button>
                  </div>
                </div>

                <div className="flex-auto text-right px-4 py-2 m-2">              
                  <button
                    onClick={() => removeCandidate(candidate.id)}
                    className="block bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center"
                    title="Remove Candidate"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </button>

              </div>

            </div>
              
              
            </div>
          ))}
        </React.Fragment>
      ) : (
        <p className="text-center bg-gray-100 text-gray-500 py-5">No data.</p>
      )}
    </React.Fragment>
  );
};
