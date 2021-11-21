import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog', () => {
  const blog = {
    title: 'testi',
    author: 'Niko',
    // url: '/titi',
    user: {
      name: 'Niko'
    }
  }

  const component = render(
    <Blog blog={blog}></Blog>
  )

  expect(component.container).toHaveTextContent('testi')
  expect(component.container).toHaveTextContent('Niko')
})

test('clicking handles once', async () => {
  const blog = {
    title: 'testi2',
    author: 'Jussi',
    url: '/teta',
    user: {
      name: 'Jusuf'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} giveLike={mockHandler}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
