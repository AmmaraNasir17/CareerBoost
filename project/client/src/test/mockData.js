import { vi } from 'vitest';

/**
 * Mock API responses for testing
 * Use these in your tests to mock API calls
 */

export const mockAuthResponses = {
  register: {
    status: 201,
    data: {
      message: 'User registered successfully',
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'applier',
      },
    },
  },
  login: {
    status: 200,
    data: {
      message: 'Login successful',
      token: 'mock_jwt_token_here',
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'applier',
      },
    },
  },
};

export const mockJobResponses = {
  allJobs: {
    status: 200,
    data: {
      jobs: [
        {
          id: 1,
          title: 'Senior React Developer',
          company: 'Tech Corp',
          location: 'Remote',
          salary: '$120k-$150k',
          difficulty: 'intermediate',
          requiredSkills: ['React', 'Node.js', 'PostgreSQL'],
        },
        {
          id: 2,
          title: 'Junior Frontend Developer',
          company: 'StartUp Inc',
          location: 'New York',
          salary: '$80k-$100k',
          difficulty: 'beginner',
          requiredSkills: ['React', 'JavaScript'],
        },
      ],
    },
  },
  singleJob: {
    status: 200,
    data: {
      job: {
        id: 1,
        title: 'Senior React Developer',
        description: 'We are looking for a senior React developer...',
        requiredSkills: ['React', 'Node.js', 'PostgreSQL'],
      },
    },
  },
};

export const mockQuizResponses = {
  allQuizzes: {
    status: 200,
    data: {
      quizzes: [
        {
          id: 1,
          title: 'JavaScript Basics',
          topic: 'JavaScript',
          difficulty: 'beginner',
          questionCount: 10,
        },
        {
          id: 2,
          title: 'React Advanced',
          topic: 'React',
          difficulty: 'advanced',
          questionCount: 15,
        },
      ],
    },
  },
  quizWithQuestions: {
    status: 200,
    data: {
      quiz: {
        id: 1,
        title: 'JavaScript Basics',
        difficulty: 'beginner',
      },
      questions: [
        {
          id: 1,
          question_text: 'What is a closure?',
          options: ['Function scope', 'Loop construct', 'Variable type', 'None'],
        },
      ],
    },
  },
};

/**
 * Helper function to create a mock axios instance
 */
export const createMockAxios = () => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
});

/**
 * Helper to wait for async operations
 */
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

/**
 * Mock localStorage
 */
export const setupLocalStorageMock = () => {
  const store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach(key => delete store[key]);
    },
  };
};
