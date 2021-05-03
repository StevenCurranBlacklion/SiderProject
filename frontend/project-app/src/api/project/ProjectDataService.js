import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'

class ProjectDataService {

    retrieveAllProjects(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/projects`);
    }

    retrieveProject(name, projectId) {
        return axios.get(`${JPA_API_URL}/users/${name}/projects/${projectId}`);
    }

    deleteProject(name, projectId) {
        return axios.delete(`${JPA_API_URL}/users/${name}/projects/${projectId}`);
    }

    updateProject(name, projectId, project) {
        return axios.put(`${JPA_API_URL}/users/${name}/projects/${projectId}`, project);
    }

    createProject(name, project) {
        return axios.post(`${JPA_API_URL}/users/${name}/projects/`, project);
    }

    retrieveAllTasks(name, projectId) {
        return axios.get(`${JPA_API_URL}/users/${name}/projects/${projectId}/tasks`);
    }

    retrieveTask(name, projectId, task_id) {
        return axios.get(`${JPA_API_URL}/users/${name}/projects/${projectId}/tasks/${task_id}`);
    }

    deleteTask(name, projectId, task_id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/projects/${projectId}/tasks/${task_id}`);
    }

    updateTask(name, projectId, task_id, task) {
        return axios.put(`${JPA_API_URL}/users/${name}/projects/${projectId}/tasks/${task_id}`, task);
    }

    createTask(name, projectId, task) {
        return axios.post(`${JPA_API_URL}/users/${name}/projects/${projectId}/tasks/`, task);
    }

    retrieveAllEmployees(name, projectId) {
        return axios.get(`${JPA_API_URL}/users/${name}/projects/${projectId}/employees`);
    }

    retrieveEmployee(name, projectId, employeeId) {
        return axios.get(`${JPA_API_URL}/users/${name}/projects/${projectId}/employees/${employeeId}`);
    }

}

export default new ProjectDataService()