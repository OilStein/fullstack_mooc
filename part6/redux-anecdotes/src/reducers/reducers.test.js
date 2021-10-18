/* eslint-disable no-undef */
import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdote reducer', () => {
  test('Return new state by using NEW_ANECDOTE', () => {
    const state = []
    const action = {
      type: 'NEW_ANECDOTE',
      data: {
        content: 'New Note',
        id: 'a12345',
        votes: 0
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })

  test('init action', () => {
    const state = []
    const action = {
      type: 'INIT',
      data: [
        {
          content: 'New Note',
          id: 'a12345',
          votes: 0
        },
        {
          content: 'Second Note',
          id: '32132131',
          votes: 43
        },
        {
          content: 'Third Note',
          id: '3132132',
          votes: 0
        }
      ]
    }
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(3)
    expect(newState).toContainEqual(
      {
        content: 'Second Note',
        id: '32132131',
        votes: 43
      }
    )
  })
})
