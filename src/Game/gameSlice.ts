
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface CounterState {
  roundNumber :number,
  wins :number,
  loses :number
}

// Define the initial state using that type
const initialState: CounterState = {
  roundNumber: 1,
  wins: 0,
  loses: 0
}

export const gameSlice = createSlice({
  name: 'game',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    nextRound: (state, action: {type :string, payload :any}) => {
      console.log(action);
      switch(action.payload) {
        case 'win': {
          // state.header = action.payload;
          // return;
          return {...state, roundNumber: state.roundNumber + 1, wins: state.wins + 1};
        }
        case 'lose': {
          // state.header = action.payload;
          // return;
          return {...state, roundNumber: state.roundNumber + 1, loses: state.loses + 1};
        }
        default:
          return {...state, roundNumber: state.roundNumber + 1};
      }
    },
  },
})

export const { nextRound } = gameSlice.actions

export const selectCount = (state: RootState) => state.game
export default gameSlice.reducer