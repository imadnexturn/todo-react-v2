import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';

const TestComponent = () => <div>Hello Test</div>;

describe('Smoke Test', () => {
    it('renders correctly', () => {
        render(<TestComponent />);
        expect(screen.getByText('Hello Test')).toBeInTheDocument();
    });
});
