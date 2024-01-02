const pathSorterReducer = (state = "reactions", action) => {
  switch (action.type) {
    case "SET_SORTER":
      return action.sortBy;
    default:
      return state;
  }
};

export const sorterChange = (sortBy) => {
  return {
    type: "SET_SORTER",
    sortBy,
  };
};

export default pathSorterReducer;
