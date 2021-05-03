import React, { Component } from 'react'
import ProjectDataService from '../../api/project/ProjectDataService.js'
import AuthenticationService from './AuthenticationService.js'

class AssignEmployeesComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            employees: [],
            message: null, 
            projectId: props.match.params.projectId
        }
        this.editEmployeeClicked = this.editEmployeeClicked.bind(this)
        this.addEmployeeClicked = this.addEmployeeClicked.bind(this)
        this.refreshEmployees = this.refreshEmployees.bind(this)
        this.addSkillsClicked = this.addSkillsClicked.bind(this)
        this.allEmployeesClicked = this.allEmployeesClicked.bind(this)
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
        console.log('componentDidMount1111111', this.state.projectId)
        let username = AuthenticationService.getLoggedInUserName()
        ProjectDataService.retrieveAllEmployees(username, this.state.projectId)
        .then(
            response => {
                this.setState({ employees: response.data })
            }
        )
    }

    refreshEmployees() {
        let username = AuthenticationService.getLoggedInUserName()
        ProjectDataService.retrieveAllEmployees(username, this.state.projectId)
            .then(
                response => {
                    this.setState({ employees: response.data })
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

    allEmployeesClicked() {
        this.props.history.push(`/employees`)
    }

    render() {
        console.log('render')
        return (
            <div>
              <h1>Assigned Employees</h1>
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
                            <th>Change Project</th>
                            <th>All Employees</th>
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
                                        <td><button className="btn btn-success" onClick={() => this.editEmployeeClicked(employee.employeeId)}>Change Project</button></td>
                                        <td><button className="btn btn-success" onClick={() => this.allEmployeesClicked(employee.employeeId)}>All Employees</button></td>
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

export default AssignEmployeesComponent