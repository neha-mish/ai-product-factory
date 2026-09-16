import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('AnswerLens app', () => {
  it('shows analyzed sample data immediately', () => {
    render(<App />)
    expect(screen.getByText('Sample experiment loaded')).toBeTruthy()
    expect(screen.getByText('Where visibility drops')).toBeTruthy()
    expect(screen.getByText('Trace every signal to its source')).toBeTruthy()
  })

  it('allows the reviewer to enter the dataset editor', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Edit this dataset' }))
    expect(screen.getByRole('heading', { name: /Bring the answers/ })).toBeTruthy()
    expect(screen.getByLabelText('Target brand')).toBeTruthy()
  })
})
