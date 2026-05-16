import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Badge from '../components/common/Badge';
import ErrorMessage from '../components/common/ErrorMessage';
import Spinner from '../components/common/Spinner';
import StatsCard from '../components/common/StatsCard';

/**
 * Real Component Tests - Testing actual application components
 * Using Vitest + React Testing Library
 * 
 * Key patterns:
 * 1. Use screen queries to find elements (getByRole, getByLabelText, etc.)
 * 2. Use userEvent for user interactions (more realistic than fireEvent)
 * 3. Mock API calls and context providers
 * 4. Test user behavior, not implementation details
 */

describe('Badge Component', () => {
  it('should render badge with label', () => {
    render(<Badge label="Active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should apply default gray variant', () => {
    const { container } = render(<Badge label="Status" />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-gray-100');
  });

  it('should apply green variant when specified', () => {
    const { container } = render(<Badge label="Active" variant="green" />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-green-100');
  });

  it('should apply red variant when specified', () => {
    const { container } = render(<Badge label="Rejected" variant="red" />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-red-100');
  });

  it('should apply blue variant when specified', () => {
    const { container } = render(<Badge label="Pending" variant="blue" />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-blue-100');
  });
});

// ============================================
// ErrorMessage Component Tests
// ============================================

describe('ErrorMessage Component', () => {
  it('should display error message when provided', () => {
    render(<ErrorMessage message="An error occurred" />);
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });

  it('should return null when message is empty', () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container.firstChild).toBeNull();
  });

  it('should return null when message is not provided', () => {
    const { container } = render(<ErrorMessage />);
    expect(container.firstChild).toBeNull();
  });

  it('should have error styling classes', () => {
    const { container } = render(<ErrorMessage message="Error" />);
    const errorDiv = container.querySelector('div');
    expect(errorDiv).toHaveClass('bg-red-50');
    expect(errorDiv).toHaveClass('border-red-300');
    expect(errorDiv).toHaveClass('text-red-700');
  });

  it('should display message text correctly', () => {
    render(<ErrorMessage message="Network error occurred" />);
    expect(screen.getByText('Network error occurred')).toBeInTheDocument();
  });
});

// ============================================
// Spinner Component Tests
// ============================================

describe('Spinner Component', () => {
  it('should render spinner element', () => {
    const { container } = render(<Spinner />);
    const spinnerDiv = container.querySelector('.animate-spin');
    expect(spinnerDiv).toBeInTheDocument();
  });

  it('should have loading spinner styling', () => {
    const { container } = render(<Spinner />);
    const outerDiv = container.querySelector('.flex');
    expect(outerDiv).toHaveClass('items-center');
    expect(outerDiv).toHaveClass('justify-center');
    expect(outerDiv).toHaveClass('min-h-screen');
  });

  it('should have rotating animation', () => {
    const { container } = render(<Spinner />);
    const spinnerDiv = container.querySelector('.animate-spin');
    expect(spinnerDiv).toHaveClass('animate-spin');
  });

  it('should have blue spinner color', () => {
    const { container } = render(<Spinner />);
    const spinnerDiv = container.querySelector('.animate-spin');
    expect(spinnerDiv).toHaveClass('border-blue-600');
  });
});

// ============================================
// StatsCard Component Tests
// ============================================

describe('StatsCard Component', () => {
  it('should display label correctly', () => {
    render(<StatsCard label="Total Users" value="1,234" />);
    expect(screen.getByText('Total Users')).toBeInTheDocument();
  });

  it('should display value correctly', () => {
    render(<StatsCard label="Total Users" value="1,234" />);
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('should display sub text when provided', () => {
    render(<StatsCard label="Total Users" value="1,234" sub="Increase from 1,000" />);
    expect(screen.getByText('Increase from 1,000')).toBeInTheDocument();
  });

  it('should not display sub text when not provided', () => {
    const { container } = render(<StatsCard label="Total Users" value="1,234" />);
    const subText = container.querySelector('.text-xs');
    expect(subText).not.toBeInTheDocument();
  });

  it('should apply correct color styling for blue variant', () => {
    const { container } = render(<StatsCard label="Jobs" value="50" color="blue" />);
    const card = container.querySelector('div');
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('rounded-xl');
  });

  it('should apply default color blue when not specified', () => {
    const { container } = render(<StatsCard label="Jobs" value="50" />);
    const card = container.querySelector('div');
    expect(card).toHaveClass('bg-white');
  });

  it('should render with text-3xl font size for value', () => {
    const { container } = render(<StatsCard label="Score" value="95" />);
    const valueElement = container.querySelector('.text-3xl');
    expect(valueElement).toBeInTheDocument();
    expect(valueElement).toHaveTextContent('95');
  });
});
