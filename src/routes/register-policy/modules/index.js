
const ACTION_HANDLERS = {}

const editInitialState = {
  formData: {}
}

export default function Reducer(state = editInitialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
