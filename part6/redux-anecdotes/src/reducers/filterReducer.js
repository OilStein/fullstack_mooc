const filteredArray = []

const filterReducer = (state = filteredArray, action) => {
  switch (action.type) {
    case 'FILTER': {
      return [...filteredArray, action.data]
    }

    default:
      return state
  }
}

export const updateList = (input) => {
  // console.log(input)
  return {
    type: 'FILTER',
    data: input
  }
}

export default filterReducer
