import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('NewBlog', () => {
  test('updates state and calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog}></BlogForm>
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: 'Niko' }
    })
    fireEvent.change(title, {
      target: { value: 'Testing if this changes' }
    })
    fireEvent.change(url, {
      target: { value: '/changes' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing if this changes')
    expect(createBlog.mock.calls[0][0].author).toBe('Niko')
    expect(createBlog.mock.calls[0][0].url).toBe('/changes')
  })
})
