import React, { Component } from 'react'
import EmployeeDataService from '../../api/project/EmployeeDataService.js'
import AuthenticationService from './AuthenticationService.js'

class ListEmployeesComponent extends Component {
    constructor(props){
        console.log('constructor')
        super(props)
        this.state = {
            employees: [],
            message: null
        }
        this.deleteEmployeeClicked = this.deleteEmployeeClicked.bind(this)
        this.editEmployeeClicked = this.editEmployeeClicked.bind(this)
        this.addEmployeeClicked = this.addEmployeeClicked.bind(this)
        this.refreshEmployees = this.refreshEmployees.bind(this)
        this.addSkillsClicked = this.addSkillsClicked.bind(this)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentDidMount() {
        console.log('componentDidMount')
        let username = AuthenticationService.getLoggedInUserName()
        EmployeeDataService.retrieveAllEmployees(username)
        .then(
            response => {
                this.setState({ employees: response.data })
            }
        )
    }

    refreshEmployees() {
        let username = AuthenticationService.getLoggedInUserName()
        EmployeeDataService.retrieveAllEmployees(username)
            .then(
                response => {
                    this.setState({ employees: response.data })
                }
            )
    }

    deleteEmployeeClicked(employeeId) {
        let username = AuthenticationService.getLoggedInUserName()
        EmployeeDataService.deleteEmployee(username, employeeId)
            .then(
                response => {
                    this.setState({ message: `Delete of employee ${employeeId} Successful` })
                    this.refreshEmployees()
                }
            )

    }

    addEmployeeClicked() {
        this.props.history.push(`/employees/-1`)
    }

    editEmployeeClicked(employeeId) {
        console.log('update ' + employeeId)
        this.props.history.push(`/employees/${employeeId}`)
    }

    addSkillsClicked(employeeId) {
        console.log('LOOKING3333 ', employeeId)
        this.props.history.push(`/employees/${employeeId}/skills`)
    }

    render() {
        console.log('render')
        return (
            <div>
              <h1>List Employees</h1>
              {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
              <div className = "container">
                <table className = "table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Project ID</th>
                            <th>Task ID</th>
                            <th>View Skills</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.employees.map (
                                employee =>
                                    <tr key={employee.employeeId}>
                                        <td>{employee.employeeId}</td>
                                        <td>{employee.first_name}</td>
                                        <td>{employee.last_name}</td>
                                        <td>{employee.projectId}</td>
                                        <td>{employee.task_id}</td>
                                        <td><button className="btn btn-success" onClick={() => this.addSkillsClicked(employee.employeeId)}>View Skills</button></td>
                                        <td><button className="btn btn-success" onClick={() => this.editEmployeeClicked(employee.employeeId)}>Edit</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteEmployeeClicked(employee.employeeId)}>Delete</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                        <button className="btn btn-success" onClick={this.addEmployeeClicked}>Add Employee</button>
                    </div>
              </div>
            </div>
        )
    }
}

export default ListEmployeesComponent