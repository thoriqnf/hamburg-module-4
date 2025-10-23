import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CopyButton from '../CopyButton';

// Mock navigator.clipboard API
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

describe('CopyButton', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockWriteText.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with default Copy text', () => {
    render(<CopyButton textToCopy="Hello World" />);

    const button = screen.getByTestId('copy-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Copy');
    expect(button).not.toBeDisabled();
  });

  it('renders with custom className', () => {
    render(<CopyButton textToCopy="Hello World" className="custom-class" />);

    const button = screen.getByTestId('copy-button');
    expect(button).toHaveClass('copy-button', 'custom-class');
  });

  it('copies text to clipboard when clicked', async () => {
    mockWriteText.mockResolvedValue(undefined);

    render(<CopyButton textToCopy="Hello World" />);

    const button = screen.getByTestId('copy-button');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockWriteText).toHaveBeenCalledWith('Hello World');
    expect(button).toHaveTextContent('Copied!');
    expect(button).toBeDisabled();
  });

  it('resets back to Copy after successful copy', async () => {
    mockWriteText.mockResolvedValue(undefined);

    render(<CopyButton textToCopy="Hello World" />);

    const button = screen.getByTestId('copy-button');

    await act(async () => {
      fireEvent.click(button);
    });

    // Should show "Copied!" immediately
    expect(button).toHaveTextContent('Copied!');

    // Fast-forward time by 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(button).toHaveTextContent('Copy');
      expect(button).not.toBeDisabled();
    });
  });

  it('handles clipboard API errors', async () => {
    mockWriteText.mockRejectedValue(new Error('Clipboard access denied'));

    render(<CopyButton textToCopy="Hello World" />);

    const button = screen.getByTestId('copy-button');
    fireEvent.click(button);

    // Should show error message
    await waitFor(() => {
      expect(button).toHaveTextContent('Error');
      expect(button).not.toBeDisabled();
    });
  });

  it('resets back to Copy after error', async () => {
    mockWriteText.mockRejectedValue(new Error('Clipboard access denied'));

    render(<CopyButton textToCopy="Hello World" />);

    const button = screen.getByTestId('copy-button');

    await act(async () => {
      fireEvent.click(button);
    });

    // Should show "Error" immediately
    await waitFor(() => {
      expect(button).toHaveTextContent('Error');
    });

    // Fast-forward time by 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(button).toHaveTextContent('Copy');
    });
  });

  it('prevents multiple clicks while loading', async () => {
    mockWriteText.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));

    render(<CopyButton textToCopy="Hello World" />);

    const button = screen.getByTestId('copy-button');

    // First click
    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(mockWriteText).toHaveBeenCalledTimes(1);

    // Second click should be ignored
    fireEvent.click(button);
    expect(mockWriteText).toHaveBeenCalledTimes(1);
  });

  it('returns early if already loading', async () => {
    // Mock the clipboard API to never resolve, keeping the component in loading state
    const neverResolve = new Promise(() => {});
    mockWriteText.mockReturnValue(neverResolve);

    render(<CopyButton textToCopy="Hello World" />);

    const button = screen.getByTestId('copy-button');

    // Start the async operation - this will set isLoading to true
    fireEvent.click(button);

    // Click again immediately while the component should still be in loading state
    // This should trigger the early return condition
    fireEvent.click(button);

    // The clipboard API should only be called once because the second click should return early
    expect(mockWriteText).toHaveBeenCalledTimes(1);
  });
});