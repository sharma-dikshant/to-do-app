const BASE_URL = "http://127.0.0.1:3000";

export const API_ROUTES = {
    USER: {
        CREATE: `${BASE_URL}/api/users`,
        SEARCH_BY_EMAIL: (q) => `${BASE_URL}/api/users/search/email?q=${q}`,
        SEARCH_BY_NAME: (q) => `${BASE_URL}/api/users/search/name?q=${q}`,
        GET_LOGGED_IN_USER: `${BASE_URL}/api/users/logged-in`
    },
    TASK_LIST: {
        CREATE: `${BASE_URL}/api/task-lists`,
        ALL_LIST_OF_USER: (userId) => `${BASE_URL}/api/task-lists/users/${userId}/all`,
        SOFT_DELETE: (taskListId) => `${BASE_URL}/api/task-lists/${taskListId}`,
        RECYCLE_BIN: `${BASE_URL}/api/task-lists/recycle-bin`,
        RESTORE: (taskListId) => `${BASE_URL}/api/task-lists/restore/${taskListId}`
    }, 
    TASK: {
        CREATE: `${BASE_URL}/api/tasks`,
        UPDATE: (taskId) => `${BASE_URL}/api/tasks/details/${taskId}`,
        DELETE: (taskId) => `${BASE_URL}/api/tasks/${taskId}`,
        ALL_TASK_OF_LIST: (taskListId) => `${BASE_URL}/api/tasks/task-lists/${taskListId}`,
        ALL_TASK_ASSIGNED_ME: `${BASE_URL}/api/tasks/assigned/me`,
        DUE_ON_DATE: `${BASE_URL}/api/tasks/due`,
        GET_MONTHS_TASKS: (year, month) => `${BASE_URL}/api/tasks/year/${year}/month/${month}`
    },
    AUTH: {
        SIGNUP: `${BASE_URL}/api/auth/signup`,
        LOGIN: `${BASE_URL}/api/auth/login`,
        LOGOUT: `${BASE_URL}/api/auth/logout`,
    }
}

