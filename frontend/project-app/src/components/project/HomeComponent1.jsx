import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HelloMessageService from '../../api/project/HelloMessageService.js'

class HomeComponent1 extends Component {

    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state = {
            welcomeMessage: ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render() {
        return (
            <div>
                <h1>SiderProject</h1>
                <div className="container">
                    Welcome back.
                    You can view or manage projects <Link to="/projects">here</Link> and employees <Link to="/employees">here</Link>.
                </div>
            </div>
        )
    }

    retrieveWelcomeMessage() {
        HelloMessageService.executeHelloMessagePathVariableService(this.props.match.params.name)
            .then(response => this.handleSuccessfulResponse(response))
            .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({ welcomeMessage: response.data.message })
    }

    handleError(error) {

        console.log(error.response)

        let errorMessage = '';

        if (error.message)
            errorMessage += error.message

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        }

        this.setState({ welcomeMessage: errorMessage })
    }

}

export default HomeComponent1