import React, { Component } from 'react'
import EmployeeDataService from '../../api/project/EmployeeDataService.js'
import AuthenticationService from './AuthenticationService.js'

class ListSkillsComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            skills: [],
            message: null, 
            employeeId: props.match.params.employeeId
        }
        this.deleteSkillClicked = this.deleteSkillClicked.bind(this)
        this.updateSkillClicked = this.updateSkillClicked.bind(this)
        this.addSkillClicked = this.addSkillClicked.bind(this)
        this.refreshSkills = this.refreshSkills.bind(this)
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
        console.log('componentDidMount1111111', this.state.employee_d)
        let username = AuthenticationService.getLoggedInUserName()
        EmployeeDataService.retrieveAllSkills(username, this.state.employeeId)
        .then(
            response => {
                this.setState({ skills: response.data })
            }
        )
    }

    refreshSkills() {
        let username = AuthenticationService.getLoggedInUserName()
        EmployeeDataService.retrieveAllSkills(username, this.state.employeeId)
            .then(
                response => {
                    this.setState({ skills: response.data })
                }
            )
    }

    deleteSkillClicked(skill_id) {
        let username = AuthenticationService.getLoggedInUserName()
        EmployeeDataService.deleteSkill(username, this.state.employeeId, skill_id)
            .then(
                response => {
                    this.setState({ message: `Delete of skill ${skill_id} Successful` })
                    this.refreshSkills()
                }
            )

    }

    addSkillClicked() {
        this.props.history.push(`/employees/${this.state.employeeId}/skills/-1`)
    }

    updateSkillClicked(skill_id) {
        console.log('update ' + skill_id)
        this.props.history.push(`/employees/${this.state.employeeId}/skills/${skill_id}`)
    }

    render() {
        console.log('render')
        return (
            <div>
              <h1>List Skills</h1>
              {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
              <div className = "container">
                <table className = "table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Skill</th>
                            <th>Level</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.skills.map (
                                skill =>
                                    <tr key={skill.skill_id}>
                                        <td>{skill.skill_id}</td>
                                        <td>{skill.skill}</td>
                                        <td>{skill.level}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateSkillClicked(skill.skill_id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteSkillClicked(skill.skill_id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                        <button className="btn btn-success" onClick={this.addSkillClicked}>Add Skill</button>
                    </div>
              </div>
            </div>
        )
    }
}

export default ListSkillsComponent