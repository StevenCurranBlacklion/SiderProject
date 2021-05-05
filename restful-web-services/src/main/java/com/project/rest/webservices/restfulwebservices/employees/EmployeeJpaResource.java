package com.project.rest.webservices.restfulwebservices.employees;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.project.rest.webservices.restfulwebservices.employees.Employee;
import com.project.rest.webservices.restfulwebservices.project.Project;
import com.project.rest.webservices.restfulwebservices.project.ProjectJpaRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class EmployeeJpaResource {

	@Autowired
	private EmployeeJpaRepository employeeJpaRepository;
	
	@Autowired
	private ProjectJpaRepository projectJpaRepository;
	
	@GetMapping("/jpa/users/{username}/employees")
	public List<Employee> getAllEmployees(@PathVariable String username){
		return employeeJpaRepository.findAll();
	}

	@GetMapping("/jpa/users/{username}/employees/{employeeId}")
	public Employee getEmployee(@PathVariable String username, @PathVariable Long employeeId){
		return employeeJpaRepository.findById(employeeId).get();
	}

	@Secured("ROLE_ADMIN")
	@DeleteMapping("/jpa/users/{username}/employees/{employeeId}")
	public ResponseEntity<Void> deleteEmployee(
			@PathVariable String username, @PathVariable Long employeeId) {

		employeeJpaRepository.deleteById(employeeId);

		return ResponseEntity.noContent().build();
	}
	
	@Secured("ROLE_ADMIN")
	@PutMapping("/jpa/users/{username}/employees/{employeeId}")
	public ResponseEntity<Employee> editEmployee(
			@PathVariable String username,
			@PathVariable Long employeeId, @RequestBody Employee employee){
		
		employee.setUsername(username);
		
		Employee employeeEdited = employeeJpaRepository.save(employee);
		
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@PostMapping("/jpa/users/{username}/employees")
	public ResponseEntity<Void> createEmployee(
			@PathVariable String username, @RequestBody Employee employee){
		
		employee.setUsername(username);
		
		Employee createdEmployee = employeeJpaRepository.save(employee);
		
		//Location
		//Get current resource url
		///{id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{employeeId}").buildAndExpand(createdEmployee.getEmployeeId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@GetMapping("/jpa/users/{username}/projects/{projectId}/employees")
	public List<Employee> getAllEmployees(@PathVariable String username, @PathVariable Long projectId){
		Project project = projectJpaRepository.findById(projectId).orElseThrow();
		System.out.println(project.getEmployees());
		return project.getEmployees();
	}

	@GetMapping("/jpa/users/{username}/projects/{projectId}/employees/{employeeId}")
	public Employee getEmployee1(@PathVariable String username, @PathVariable Long employeeId){
		return employeeJpaRepository.findById(employeeId).get();
	}	
}