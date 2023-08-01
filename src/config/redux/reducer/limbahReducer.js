const initialStateLimbah = {
  dataLimbah: [],
};

const limbahReducer = (state = initialStateLimbah, action) => {
  if (action.type === "UPDATE_LIMBAH") {
    return {
      dataLimbah: action.payload,
    };
  }

  return state;
};

export default limbahReducer;
