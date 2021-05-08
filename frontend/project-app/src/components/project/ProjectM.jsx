import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import ListProjectsComponent from './ListProjectsComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import HomeComponent from './HomeComponent.jsx'
import HomeComponent1 from './HomeComponent1.jsx'
import ProjectComponent from './ProjectComponent.jsx'
import EmployeeComponent from './EmployeeComponent.jsx'
import ListEmployeesComponent from './ListEmployeesComponent.jsx'
import TaskComponent from './TaskComponent.jsx'
import ListTasksComponent from './ListTasksComponent.jsx'
import SkillComponent from './SkillComponent.jsx'
import ListSkillsComponent from './ListSkillsComponent.jsx'
import AssignEmployeesComponent from './AssignEmployeesComponent.jsx'

class ProjectM extends Component {
    render() {
        return (
            <div className="ProjectM">
                <Router>
                    <HeaderComponent/>
                    <Switch>
                        <Route path ="/" exact component={LoginComponent}/>
                        <Route path ="/login" component={LoginComponent}/>
                        <AuthenticatedRoute path ="/home/:name" component={HomeComponent}/>
                        <AuthenticatedRoute path ="/home" component={HomeComponent1}/>
                        <AuthenticatedRoute path="/employees/:employeeId/skills/:skill_id" component={SkillComponent}/>
                        <AuthenticatedRoute path ="/employees/:employeeId/skills" component={ListSkillsComponent}/>
                        <AuthenticatedRoute path="/employees/:employeeId" component={EmployeeComponent}/>
                        <AuthenticatedRoute path ="/employees" component={ListEmployeesComponent}/>
                        <AuthenticatedRoute path="/projects/:projectId/tasks/:task_id" component={TaskComponent}/>
                        <AuthenticatedRoute path ="/projects/:projectId/tasks" component={ListTasksComponent}/>
                        <AuthenticatedRoute path ="/projects/:projectId/employees" component={AssignEmployeesComponent}/>
                        <AuthenticatedRoute path="/projects/:projectId" component={ProjectComponent}/>
                        <AuthenticatedRoute path ="/projects" component={ListProjectsComponent}/>
                        <AuthenticatedRoute path ="/logout" component={LogoutComponent}/>
                        <Route component ={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                </Router>
                {/*<LoginComponent/>
                <HomeComponent/>*/}
            </div>
        )
    }
}

export default ProjectM