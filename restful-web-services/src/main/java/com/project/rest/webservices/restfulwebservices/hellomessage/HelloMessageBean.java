package com.project.rest.webservices.restfulwebservices.hellomessage;

public class HelloMessageBean {

	private String message;

	public HelloMessageBean(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return String.format("HelloMessageBean [message=%s]", message);
	}
}