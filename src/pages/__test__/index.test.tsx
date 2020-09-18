import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../index'

describe('HOME', () => {
  it('should display the word `Hello World', () => {
    const { getByText } = render(<Home />)
    expect(getByText('Hello World')).toBeInTheDocument()
  })
})
