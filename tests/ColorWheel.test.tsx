import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ColorWheel } from '../src/components/ColorWheel';

describe('ColorWheel', () => {
  test('renders without crashing', () => {
    const mockOnChange = jest.fn();
    render(<ColorWheel color="#ff0000" onChange={mockOnChange} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('calls onChange when color is changed', () => {
    const mockOnChange = jest.fn();
    render(<ColorWheel color="#ff0000" onChange={mockOnChange} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Open the popover
    const hexInput = screen.getByLabelText('Hex Color');
    fireEvent.change(hexInput, { target: { value: '#00ff00' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('#00ff00');
  });

  test('displays correct initial color', () => {
    const mockOnChange = jest.fn();
    render(<ColorWheel color="#ff0000" onChange={mockOnChange} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: '#ff0000' });
  });
});
