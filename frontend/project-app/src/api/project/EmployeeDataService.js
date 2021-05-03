import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'

class EmployeeDataService {

    retrieveAllEmployees(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/employees`);
    }

    retrieveEmployee(name, employeeId) {
        return axios.get(`${JPA_API_URL}/users/${name}/employees/${employeeId}`);
    }

    deleteEmployee(name, employeeId) {
        return axios.delete(`${JPA_API_URL}/users/${name}/employees/${employeeId}`);
    }

    editEmployee(name, employeeId, employee) {
        return axios.put(`${JPA_API_URL}/users/${name}/employees/${employeeId}`, employee);
    }

    createEmployee(name, employee) {
        return axios.post(`${JPA_API_URL}/users/${name}/employees/`, employee);
    }

    retrieveAllSkills(name, employeeId) {
        return axios.get(`${JPA_API_URL}/users/${name}/employees/${employeeId}/skills`);
    }

    retrieveSkill(name, employeeId, skill_id) {
        return axios.get(`${JPA_API_URL}/users/${name}/employees/${employeeId}/skills/${skill_id}`);
    }

    deleteSkill(name, employeeId, skill_id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/employees/${employeeId}/skills/${skill_id}`);
    }

    updateSkill(name, employeeId, skill_id, skill) {
        return axios.put(`${JPA_API_URL}/users/${name}/employees/${employeeId}/skills/${skill_id}`, skill);
    }

    createSkill(name, employeeId, skill) {
        return axios.post(`${JPA_API_URL}/users/${name}/employees/${employeeId}/skills/`, skill);
    }

}

export default new EmployeeDataService()