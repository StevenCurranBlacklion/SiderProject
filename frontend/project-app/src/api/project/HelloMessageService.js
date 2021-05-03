import axios from 'axios'

class HelloMessageService {

    executeHelloMessageService() {
        return axios.get('http://localhost:8080/hello-message');
    }

    executeHelloMessageBeanService() {
        return axios.get('http://localhost:8080/hello-message-bean');
    }

    executeHelloMessagePathVariableService(name) {
        return axios.get(`http://localhost:8080/hello-message/path-variable/${name}`
        );
    }

}

export default new HelloMessageService()