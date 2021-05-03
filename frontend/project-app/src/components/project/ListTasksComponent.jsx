import React, { Component } from 'react'
import ProjectDataService from '../../api/project/ProjectDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListTasksComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            tasks: [],
            message: null, 
            projectId: props.match.params.projectId
        }
        this.deleteTaskClicked = this.deleteTaskClicked.bind(this)
        this.updateTaskClicked = this.updateTaskClicked.bind(this)
        this.addTaskClicked = this.addTaskClicked.bind(this)
        this.refreshTasks = this.refreshTasks.bind(this)
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
        ProjectDataService.retrieveAllTasks(username, this.state.projectId)
        .then(
            response => {
                this.setState({ tasks: response.data })
            }
        )
    }

    refreshTasks() {
        let username = AuthenticationService.getLoggedInUserName()
        ProjectDataService.retrieveAllTasks(username, this.state.projectId)
            .then(
                response => {
                    this.setState({ tasks: response.data })
                }
            )
    }

    deleteTaskClicked(task_id) {
        let username = AuthenticationService.getLoggedInUserName()
        ProjectDataService.deleteTask(username, this.state.projectId, task_id)
            .then(
                response => {
                    this.setState({ message: `Delete of task ${task_id} Successful` })
                    this.refreshTasks()
                }
            )

    }

    addTaskClicked() {
        this.props.history.push(`/projects/${this.state.projectId}/tasks/-1`)
    }

    updateTaskClicked(task_id) {
        console.log('update ' + task_id)
        this.props.history.push(`/projects/${this.state.projectId}/tasks/${task_id}`)
    }

    render() {
        console.log('render')
        return (
            <div>
              <h1>List Tasks</h1>
              {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
              <div className = "container">
                <table className = "table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Start Date</th>
                            <th>Task</th>
                            <th>End Date</th>
                            <th>Completed?</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tasks.map (
                                task =>
                                    <tr key={task.task_id}>
                                        <td>{task.task_id}</td>
                                        <td>{moment(task.startDate).format('YYYY-MM-DD')}</td>
                                        <td>{task.task}</td>
                                        <td>{moment(task.endDate).format('YYYY-MM-DD')}</td>
                                        <td>{task.done.toString()}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTaskClicked(task.task_id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTaskClicked(task.task_id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                        <button className="btn btn-success" onClick={this.addTaskClicked}>Add Task</button>
                    </div>
              </div>
            </div>
        )
    }
}

export default ListTasksComponent