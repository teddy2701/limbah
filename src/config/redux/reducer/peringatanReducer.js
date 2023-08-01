const initialstatePeringatan = {
  dataPeringatan: [],
};

const peringatanReducer = (state = initialstatePeringatan, action) => {
  if (action.type === "UPDATE_PERINGATAN") {
    return {
      dataPeringatan: action.payload,
    };
  }
  return state;
};

export default peringatanReducer;
