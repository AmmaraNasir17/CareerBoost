# Testing Guide for CareerBoost

## Overview

CareerBoost uses two testing frameworks:
- **Backend**: Jest + Supertest (Node.js/Express)
- **Frontend**: Vitest + React Testing Library (React)

---

## Backend Testing Setup

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure

```
server/
├── __tests__/
│   ├── controllers/
│   │   ├── auth.test.js
│   │   ├── jobs.test.js
│   │   ├── quiz.test.js
│   │   └── resume.test.js
│   ├── models/
│   └── middleware/
└── jest.config.js
```

### Writing Backend Tests

Example test file structure:

```javascript
describe('Auth Controller', () => {
  describe('User Registration', () => {
    it('should register a new user with valid data', async () => {
      // ARRANGE: Setup
      const newUser = { name: 'John', email: 'john@example.com', password: 'Test@123' };
      
      // ACT: Execute
      const response = await request(app)
        .post('/api/auth/register')
        .send(newUser);
      
      // ASSERT: Verify
      expect(response.status).toBe(201);
      expect(response.body.user.email).toBe(newUser.email);
    });
  });
});
```

### Test Coverage Targets

- **Auth**: 80%+ coverage
- **Jobs**: 75%+ coverage
- **Quiz**: 80%+ coverage
- **Resume**: 75%+ coverage
- **Overall**: 75%+ target

---

## Frontend Testing Setup

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (interactive)
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Structure

```
client/
├── src/
│   ├── test/
│   │   ├── setup.js
│   │   ├── components.test.jsx
│   │   ├── hooks.test.js
│   │   ├── mockData.js
│   │   └── utils/
│   │       └── testUtils.js
│   └── ...
└── vitest.config.js
```

### Writing Frontend Tests

#### Component Test Example

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('JobCard Component', () => {
  it('should display job information', () => {
    const job = {
      id: 1,
      title: 'React Developer',
      company: 'Tech Corp',
      location: 'Remote',
    };
    
    render(<JobCard job={job} />);
    
    expect(screen.getByText('React Developer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('should handle apply button click', async () => {
    const mockApply = vi.fn();
    const job = { id: 1, title: 'React Developer' };
    
    render(<JobCard job={job} onApply={mockApply} />);
    
    const applyBtn = screen.getByRole('button', { name: /apply/i });
    await userEvent.click(applyBtn);
    
    expect(mockApply).toHaveBeenCalledWith(job.id);
  });
});
```

#### Hook Test Example

```javascript
import { renderHook, act } from '@testing-library/react';
import { useJobs } from '@/hooks/useJobs';

describe('useJobs Hook', () => {
  it('should fetch jobs on mount', async () => {
    const { result } = renderHook(() => useJobs());
    
    await act(async () => {
      // Wait for async operation
    });
    
    expect(result.current.jobs).toBeDefined();
  });
});
```

### Best Practices

1. **Query Priority** (in order):
   - `getByRole()` - Most accessible
   - `getByLabelText()` - For form fields
   - `getByPlaceholderText()` - Last resort
   - Avoid: `getByTestId()`, direct DOM queries

2. **User Interactions**:
   - Use `userEvent` instead of `fireEvent`
   - More realistic user behavior

3. **Mocking**:
   - Mock API calls with `vi.fn()`
   - Use `mockData.js` for consistent test data
   - Mock context providers at test level

4. **Assertions**:
   - Test user-visible behavior, not implementation
   - Use `screen` queries
   - Check accessibility features

---

## Mock Data

Located in `client/src/test/mockData.js`:

- `mockAuthResponses` - Authentication API responses
- `mockJobResponses` - Job portal API responses
- `mockQuizResponses` - Quiz API responses
- `createMockAxios()` - Mock HTTP client
- `setupLocalStorageMock()` - Mock browser storage

### Usage

```javascript
import { mockJobResponses, createMockAxios } from '@/test/mockData';

it('should fetch jobs', async () => {
  const mockAxios = createMockAxios();
  mockAxios.get.mockResolvedValue(mockJobResponses.allJobs);
  
  // Test code here
});
```

---

## Current Test Status

### ✅ Setup Complete
- Jest configured for backend
- Vitest configured for frontend
- Test directories created
- Config files in place

### 🚧 Sample Tests Created
- Backend: Auth, Jobs, Quiz, Resume tests (structure only)
- Frontend: Components, Hooks tests (template)

### ⏳ Next Steps
1. **After database is connected**:
   - Implement actual backend tests
   - Remove TODO comments
   - Add real assertions

2. **After API integration**:
   - Implement frontend tests
   - Mock API with MSW (Mock Service Worker)
   - Test context providers

3. **Before deployment**:
   - Achieve 75%+ coverage
   - Fix failing tests
   - Run full test suite

---

## Running All Tests

```bash
# Backend
cd server
npm test

# Frontend
cd ../client
npm test
```

---

## Debugging Tests

### Backend
```bash
# Debug with Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Frontend
```bash
# Run tests with UI for debugging
npm run test:ui

# Run single test file
npm test -- components.test.jsx

# Run with verbose output
npm test -- --reporter=verbose
```

---

## Common Testing Patterns

### Testing API Errors
```javascript
it('should handle API errors', async () => {
  const mockAxios = createMockAxios();
  mockAxios.get.mockRejectedValue(new Error('Network error'));
  
  // Test error handling
});
```

### Testing Async Operations
```javascript
it('should load data', async () => {
  const { result } = renderHook(() => useData());
  
  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });
});
```

### Testing Context Providers
```javascript
const wrapper = ({ children }) => (
  <AuthProvider>
    <JobProvider>{children}</JobProvider>
  </AuthProvider>
);

const { result } = renderHook(() => useAuth(), { wrapper });
```

---

## Tips & Tricks

1. Use `screen.debug()` to inspect rendered HTML during debugging
2. Use `screen.logTestingPlaygroundURL()` to get a playground link
3. Always clean up after tests (Vitest does this automatically)
4. Keep tests focused on one behavior
5. Use descriptive test names

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://testingjavascript.com/)
