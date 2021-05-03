package com.project.rest.webservices.restfulwebservices.hellomessage;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

//Controller
@RestController
@CrossOrigin(origins="http://localhost:4200")
public class HelloMessageController {

	@GetMapping(path = "/hello-message")
	public String helloMessage() {
		return "Hello World";
	}

	@GetMapping(path = "/hello-message-bean")
	public HelloMessageBean helloMessageBean() {
		return new HelloMessageBean("Hello World");
	}
	
	@GetMapping(path = "/hello-message/path-variable/{name}")
	public HelloMessageBean helloMessagePathVariable(@PathVariable String name) {
		//throw new RuntimeException("Something went wrong");
		return new HelloMessageBean(String.format("Hello World, %s", name));
	}
}