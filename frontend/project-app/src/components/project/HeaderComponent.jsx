import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import { withRouter } from 'react-router';

class HeaderComponent extends Component {
    render() {
            const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <header>
                <nav className = "navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="/logout" onClick={AuthenticationService.logout} className="navbar-brand">SiderProject</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/home">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/projects">Projects</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/employees">Employees</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);