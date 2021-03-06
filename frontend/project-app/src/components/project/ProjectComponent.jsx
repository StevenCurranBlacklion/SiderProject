import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ProjectDataService from '../../api/project/ProjectDataService.js'
import AuthenticationService from './AuthenticationService.js'

class ProjectComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projectId: this.props.match.params.projectId,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        if (this.state.projectId == -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        ProjectDataService.retrieveProject(username, this.state.projectId)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors

    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()

        let project = {
            projectId: this.state.projectId,
            description: values.description,
            targetDate: values.targetDate,
            done: values.done
        }

        if (this.state.projectId == -1) {
            ProjectDataService.createProject(username, project)
                .then(() => this.props.history.push('/projects'))
        } else {
            ProjectDataService.updateProject(username, this.state.projectId, project)
                .then(() => this.props.history.push('/projects'))
        }

        console.log(values);
    }

    render() {

        let { description, targetDate, done } = this.state
        return (
            <div>
                <h1>Project</h1>
                <div className="container">
                    <Formik
                        initialValues={{ description, targetDate, done }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="done" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate" />
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

export default ProjectComponent