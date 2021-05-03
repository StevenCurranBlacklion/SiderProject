package com.project.rest.webservices.restfulwebservices.tasks;

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

import com.project.rest.webservices.restfulwebservices.project.Project;
import com.project.rest.webservices.restfulwebservices.project.ProjectJpaRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class TaskJpaResource {

	@Autowired
	private TaskJpaRepository taskJpaRepository;
	
	@Autowired
	private ProjectJpaRepository projectJpaRepository;

	
	@GetMapping("/jpa/users/{username}/projects/{projectId}/tasks")
	public List<Task> getAllTasks(@PathVariable String username, @PathVariable Long projectId){
		Project project = projectJpaRepository.findById(projectId).orElseThrow();
		System.out.println(project.getTasks());
		return project.getTasks();
	}

	@GetMapping("/jpa/users/{username}/projects/{projectId}/tasks/{task_id}")
	public Task getTask(@PathVariable String username, @PathVariable Long task_id){
		return taskJpaRepository.findById(task_id).get();
	}

	@Secured("ROLE_ADMIN")
	@DeleteMapping("/jpa/users/{username}/projects/{projectId}/tasks/{task_id}")
	public ResponseEntity<Void> deleteTask(
			@PathVariable String username, @PathVariable Long task_id) {

		taskJpaRepository.deleteById(task_id);

		return ResponseEntity.noContent().build();
	}
	
	@Secured("ROLE_ADMIN")
	@PutMapping("/jpa/users/{username}/projects/{projectId}/tasks/{task_id}")
	public ResponseEntity<Task> updateTask(
			@PathVariable String username,
			@PathVariable long task_id, @RequestBody Task task){
		
		task.setUsername(username);
		
		Task taskUpdated = taskJpaRepository.save(task);
		
		return new ResponseEntity<Task>(task, HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@PostMapping("/jpa/users/{username}/projects/{projectId}/tasks")
	public ResponseEntity<Void> createTask(
			@PathVariable String username, @PathVariable Long projectId, @RequestBody Task task){
		
		task.setUsername(username);
		
		Task createdtask = taskJpaRepository.save(task);
		Project project = projectJpaRepository.findById(projectId).orElseThrow();
		project.addTask(createdtask);
		projectJpaRepository.save(project);
		//Location
		//Get current resource url
		///{id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{task_id}").buildAndExpand(createdtask.getTask_id()).toUri();
		
		return ResponseEntity.created(uri).build();
	}	
}