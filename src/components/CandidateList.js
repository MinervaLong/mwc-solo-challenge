import React, { useContext } from 'react';

import { CandidateContext } from '../context/CandidateState';

export const CandidateList = () => {
  const { candidates } = useContext(CandidateContext);
  return (
    <React.Fragment>
      {candidates.length > 0 ? (
        <React.Fragment>
          {candidates.map((candidate) => (
            <div
              className="flex items-center bg-gray-100 mb-10 shadow"
              key={candidate.id}
            >
              <div className="flex-auto text-left px-4 py-2 m-2">
                <p className="text-gray-900 leading-none">
                  {candidate.name}
                </p>
                <p className="text-gray-600">
                  {candidate.designation}
                </p>
                <span className="inline-block text-sm font-semibold mt-1">
                  {candidate.location}
                </span>
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
