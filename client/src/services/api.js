const BASE_URL = "http://127.0.0.1:3000";

export const API_ROUTES = {
    USER: {
        CREATE: `${BASE_URL}/api/users`
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
        ALL_TASK_OF_LIST: (taskListId) => `${BASE_URL}/api/tasks/task-lists/${taskListId}`
    }
}

