import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import EmployeeDataService from '../../api/project/EmployeeDataService.js'
import AuthenticationService from './AuthenticationService.js'

class SkillComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employeeId: this.props.match.params.employeeId,
            skill_id: this.props.match.params.skill_id,
            skill: '',
            level: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {
        if (this.state.skill_id == -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        EmployeeDataService.retrieveSkill(username, this.state.employeeId, this.state.skill_id)
            .then(response => this.setState({
                skill: response.data.skill,
                level: response.data.level
            }))
    }

    validate(values) {
        let errors = {}

        if (!values.skill) {
            errors.skill = 'Enter a Skill'
        } else if (values.skill.length < 3) {
            errors.skill = 'Enter at least 3 Characters in Skill'
        }

        if (!values.level) {
            errors.level = 'Enter a Level'
        } else if (values.level.length < 3) {
            errors.level = 'Enter at least 3 Characters in Level'
        }

        return errors

    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()

        let skill = {
            skill_id: this.state.skill_id,
            skill: values.skill,
            level: values.level
        }

        if (this.state.skill_id == -1) {
            EmployeeDataService.createSkill(username, this.state.employeeId, skill)
                .then(() => this.props.history.push(`/employees/${this.state.employeeId}/skills`))
        } else {
            EmployeeDataService.updateSkill(username, this.state.employeeId, this.state.skill_id, skill)
                .then(() => this.props.history.push(`/employees/${this.state.employeeId}/skills`))
        }
    }

    render() {

        let { skill, level } = this.state
        return (
            <div>
                <h1>Skill</h1>
                <div className="container">
                    <Formik
                        initialValues={{ skill, level }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="skill" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="level" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Skill</label>
                                        <Field className="form-control" type="text" name="skill" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Level</label>
                                        <br />
                                        <Field as="select" name="level">
                                            <option value=''></option>
                                            <option value="Beginner">Beginner</option>
                                            <option value="Mid-Level">Mid-Level</option>
                                            <option value="Expert">Expert</option>
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

export default SkillComponent