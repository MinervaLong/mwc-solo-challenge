import React, { createContext, useReducer } from 'react';

import CrudActions from './CrudActions';

const initialState = {
  candidates: [
    {
      id: 1,
      name: "Sammy",
      location: "DigitalOcean",
      designation: "Shark"
    }
  ]
};

export const CandidateContext = createContext(initialState);

export const CandidateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CrudActions, initialState);

  const addCandidate = (candidate) => {
    dispatch({
      type: "ADD_CANDIDATE",
      payload: candidate
    });
  }

  const editCandidate = (candidate) => {
    dispatch({
      type: "EDIT_CANDIDATE",
      payload: candidate
    });
  }

  const removeCandidate = (id) => {
    dispatch({
      type: "REMOVE_CANDIDATE",
      payload: id
    });
  }

  return (
    <CandidateContext.Provider
      value={{
        candidates: state.candidates,
        addCandidate,
        editCandidate,
        removeCandidate
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
