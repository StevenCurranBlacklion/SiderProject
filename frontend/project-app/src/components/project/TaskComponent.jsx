import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ProjectDataService from '../../api/project/ProjectDataService.js'
import AuthenticationService from './AuthenticationService.js'

class TaskComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projectId: this.props.match.params.projectId,
            task_id: this.props.match.params.task_id,
            startDate: moment(new Date()).format('YYYY-MM-DD'),
            task: '',
            endDate: moment(new Date()).format('YYYY-MM-DD'),
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {
        if (this.state.task_id == -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        ProjectDataService.retrieveTask(username, this.state.projectId, this.state.task_id)
            .then(response => this.setState({
                startDate: moment(response.data.startDate).format('YYYY-MM-DD'),
                task: response.data.task,
                endDate: moment(response.data.endDate).format('YYYY-MM-DD')
            }))
    }

    validate(values) {
        let errors = {}
        
        if (!moment(values.startDate).isValid()) {
            errors.startDate = 'Enter a valid Start Date'
        }

        if (!values.task) {
            errors.task = 'Enter a Task'
        } else if (values.task.length < 5) {
            errors.task = 'Enter at least 5 Characters in Task'
        }

        if (!moment(values.endDate).isValid()) {
            errors.endDate = 'Enter a valid End Date'
        }

        return errors

    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()

        let task = {
            task_id: this.state.task_id,
            startDate: values.startDate,
            task: values.task,
            endDate: values.endDate,
            done: values.done
        }

        if (this.state.task_id == -1) {
            ProjectDataService.createTask(username, this.state.projectId, task)
                .then(() => this.props.history.push(`/projects/${this.state.projectId}/tasks`))
        } else {
            ProjectDataService.updateTask(username, this.state.projectId, this.state.task_id, task)
                .then(() => this.props.history.push(`/projects/${this.state.projectId}/tasks`))
        }
    }

    render() {

        let { startDate, task, endDate, done } = this.state
        return (
            <div>
                <h1>Task</h1>
                <div className="container">
                    <Formik
                        initialValues={{ startDate, task, endDate, done }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="startDate" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="task" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="endDate" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="done" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Start Date</label>
                                        <Field className="form-control" type="date" name="startDate" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Task</label>
                                        <Field className="form-control" type="text" name="task" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>End Date</label>
                                        <Field className="form-control" type="date" name="endDate" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Completed?</label>
                                        <br />
                                        <Field as="select" name="done">
                                            <option value="false">false</option>
                                            <option value="true">true</option>
                                        </Field>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default TaskComponent