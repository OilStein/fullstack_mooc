import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  describe('Basic actions', () => {
    
    const good = {
      type: 'GOOD'
    }
    const bad = {
      type: 'BAD'
    }   
    const neutral = {
      type: 'OK'
    }
    const reset = {
      type: 'ZERO'
    }

    test('good is incremented', () => {
      const state = initialState
      deepFreeze(state)
      const newState = counterReducer(state, good)
      expect(newState).toEqual({
        good: 1,
        ok: 0,
        bad: 0
      })
    })

    test('ok is incremented', () => {
      const state = initialState
      deepFreeze(state)
      const newState = counterReducer(state, neutral)
      expect(newState).toEqual({
        good: 0,
        ok: 1,
        bad: 0
      })
    })

    test('bad is incremented', () => {
      const state = initialState
      deepFreeze(state)
      const newState = counterReducer(state, bad)
      expect(newState).toEqual({
        good: 0,
        ok: 0,
        bad: 1
      })
    })

    test('reset', () => {
      const state = {
        good: 3,
        bad: 5,
        ok: 3
      }
      deepFreeze(state)
      const newState = counterReducer(state, reset)
      expect(newState).toEqual({
        good: 0,
        ok: 0,
        bad: 0
      })
      expect(newState).toEqual(initialState)

    })

  })

  
})