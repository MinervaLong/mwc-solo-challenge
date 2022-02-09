 const CrudActions = (state, action) => {
    switch (action.type) {
        // ADD will take a payload value containing new candidates and return the updated candidate state.
      case "ADD_CANDIDATE":
        return {
          ...state,
          candidates: [...state.candidates, action.payload],
        };
        /* EDIT will take a payload value and compare the id with the candidates - 
        if it finds a match, it will use the new payload values and return 
        the updated candidate state.*/
      case "EDIT_CANDIDATE":
        const updatedCandidate = action.payload;
  
        const updatedCandidates = state.candidates.map((candidate) => {
          if (candidate.id === updatedCandidate.id) {
            return updatedCandidate;
          }
          return candidate;
        });
  
        return {
          ...state,
          candidates: updatedCandidates,
        };
        /* REMOVE will take a payload value and compare the id with the candidates - 
        if it finds a match, it will remove that candidate and return the updated 
        candidate state*/
      case "REMOVE_CANDIDATE":
        return {
          ...state,
          candidates: state.candidates.filter(
            (candidate) => candidate.id !== action.payload
          ),
        };
  
      default:
        return state;
    }
};
  
export default CrudActions;