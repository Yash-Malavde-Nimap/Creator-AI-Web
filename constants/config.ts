export const APP_CONFIG = {
  name: 'Creator AI',
  description: 'AI-powered creator management platform',
  version: '1.0.0',
  defaultPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
  debounceDelay: 300,
  toastDuration: 4000,
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
} as const;

export const QUERY_KEYS = {
  AUTH: {
    ME: ['auth', 'me'],
  },
  USERS: {
    ALL: ['users'],
    BY_ID: (id: string) => ['users', id],
  },
  DASHBOARD: {
    STATS: ['dashboard', 'stats'],
    ANALYTICS: ['dashboard', 'analytics'],
  },
  CREATORS: {
    ALL: ['creators'],
    BY_ID: (id: string) => ['creators', id],
  },
  CAMPAIGNS: {
    ALL: ['campaigns'],
    BY_ID: (id: string) => ['campaigns', id],
  },
} as const;
