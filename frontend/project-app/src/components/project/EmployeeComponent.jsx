import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import EmployeeDataService from '../../api/project/EmployeeDataService.js'
import AuthenticationService from './AuthenticationService.js'

class EmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employeeId: this.props.match.params.employeeId,
            first_name: '',
            last_name: '',
            projectId: '',
            task_id: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        if (this.state.employeeId == -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        EmployeeDataService.retrieveEmployee(username, this.state.employeeId)
            .then(response => this.setState({
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                projectId: response.data.projectId,
                taskId: response.data.task_id
            }))
    }

    validate(values) {
        let errors = {}
        if (!values.first_name) {
            errors.first_name = 'Enter a first name'
        } else if (values.first_name.length < 2) {
            errors.first_name = 'Enter at least 2 Characters in First Name'
        }

        if (!values.last_name) {
            errors.last_name = 'Enter a last name'
        } else if (values.last_name.length < 2) {
            errors.last_name = 'Enter at least 2 Characters in Last Name'
        }

        if (!values.projectId) {
            errors.projectId = 'Enter a Project ID'
        } else if (values.last_name.projectId < 1) {
            errors.last_name = 'Enter at least 1 Character in Project ID'
        }

        return errors

    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()

        let employee = {
            employeeId: this.state.employeeId,
            first_name: values.first_name,
            last_name: values.last_name,
            projectId: values.projectId,
            task_id: values.task_id
        }

        if (this.state.employeeId == -1) {
            EmployeeDataService.createEmployee(username, employee)
                .then(() => this.props.history.push('/employees'))
        } else {
            EmployeeDataService.editEmployee(username, this.state.employeeId, employee)
                .then(() => this.props.history.push('/employees'))
        }

        console.log(values);
    }

    render() {

        let { first_name, last_name, projectId, task_id } = this.state
        return (
            <div>
                <h1>Employee</h1>
                <div className="container">
                    <Formik
                        initialValues={{ first_name, last_name, projectId, task_id }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="first_name" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="last_name" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="projectId" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="task_id" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>First Name</label>
                                        <Field className="form-control" type="text" name="first_name" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Last Name</label>
                                        <Field className="form-control" type="text" name="last_name" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Project ID</label>
                                        <Field className="form-control" type="text" name="projectId" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Task ID</label>
                                        <Field className="form-control" type="text" name="task_id" />
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

export default EmployeeComponent