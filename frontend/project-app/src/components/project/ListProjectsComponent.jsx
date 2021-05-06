import React, { Component } from 'react'
import ProjectDataService from '../../api/project/ProjectDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListProjectsComponent extends Component {
    constructor(props){
        console.log('constructor')
        super(props)
        this.state = {
            projects: [],
            message: null
        }
        this.deleteProjectClicked = this.deleteProjectClicked.bind(this)
        this.updateProjectClicked = this.updateProjectClicked.bind(this)
        this.addProjectClicked = this.addProjectClicked.bind(this)
        this.refreshProjects = this.refreshProjects.bind(this)
        this.addEmployeesClicked = this.addEmployeesClicked.bind(this)
        this.addTasksClicked = this.addTasksClicked.bind(this)
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
        ProjectDataService.retrieveAllProjects(username)
        .then(
            response => {
                this.setState({ projects: response.data })
            }
        )
    }

    refreshProjects() {
        let username = AuthenticationService.getLoggedInUserName()
        ProjectDataService.retrieveAllProjects(username)
            .then(
                response => {
                    this.setState({ projects: response.data })
                }
            )
    }

    deleteProjectClicked(projectId) {
        let username = AuthenticationService.getLoggedInUserName()
        ProjectDataService.deleteProject(username, projectId)
            .then(
                response => {
                    this.setState({ message: `Delete of project ${projectId} Successful` })
                    this.refreshProjects()
                }
            )

    }

    addProjectClicked() {
        this.props.history.push(`/projects/-1`)
    }

    updateProjectClicked(projectId) {
        console.log('update ' + projectId)
        this.props.history.push(`/projects/${projectId}`)
    }

    addTasksClicked(projectId) {
        console.log('LOOKING2111 ', projectId)
        this.props.history.push(`/projects/${projectId}/tasks`)
    }

    addEmployeesClicked(projectId) {
        this.props.history.push(`/projects/${projectId}/employees`)
    }

    render() {
        console.log('render')
        return (
            <div>
              <h1>List Projects</h1>
              {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
              <div className = "container">
                <table className = "table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Description</th>
                            <th>Manager</th>
                            <th>Target Date</th>
                            <th>Completed?</th>
                            <th>View Employees</th>
                            <th>View Tasks</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.projects.map (
                                project =>
                                    <tr key={project.projectId}>
                                        <td>{project.projectId}</td>
                                        <td>{project.description}</td>
                                        <td>{project.username}</td>
                                        <td>{moment(project.targetDate).format('YYYY-MM-DD')}</td>
                                        <td>{project.done.toString()}</td>
                                        <td><button className="btn btn-success" onClick={() => this.addEmployeesClicked(project.projectId)}>View Employees</button></td>
                                        <td><button className="btn btn-success" onClick={() => this.addTasksClicked(project.projectId)}>View Tasks</button></td>
                                        <td><button className="btn btn-success" onClick={() => this.updateProjectClicked(project.projectId)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteProjectClicked(project.projectId)}>Delete</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                        <button className="btn btn-success" onClick={this.addProjectClicked}>Add Project</button>
                    </div>
              </div>
            </div>
        )
    }
}

export default ListProjectsComponent