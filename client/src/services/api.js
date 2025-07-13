const BASE_URL = "http://localhost:3000";

export const API_ROUTES = {
    USER: {
        CREATE: `${BASE_URL}/api/users`
    },
    TASK_LIST: {
        CREATE: `${BASE_URL}/api/task-lists`,
        ALL_LIST_OF_USER: (userId) => `${BASE_URL}/api/task-lists/users/${userId}/all`
    }, 
    TASK: {
        CREATE: `${BASE_URL}/api/tasks`,
        UPDATE: (taskId) => `${BASE_URL}/api/tasks/${taskId}`,
        DELETE: (taskId) => `${BASE_URL}/api/tasks/${taskId}`,
        ALL_TASK_OF_LIST: (taskListId) => `${BASE_URL}/api/tasks/task-lists/${taskListId}`
    }
}

