import React, { createContext, useReducer } from 'react';

import CrudActions from './CrudActions';

const initialState = {
  candidates: [
    {
      id: 1,
      avatar: '',
      name: "Sammy",
      mail: 'sammy@mail.com',
      description: 'Some brief text about who is Sammy but it should have at least 140 characters, like an old tweet for example',
      country: 'United Kingdom',
      city: "Oxford",
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
        removeCandidate
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
