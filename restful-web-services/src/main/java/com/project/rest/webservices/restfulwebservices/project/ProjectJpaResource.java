package com.project.rest.webservices.restfulwebservices.project;

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

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class ProjectJpaResource {

	@Autowired
	private ProjectJpaRepository projectJpaRepository;
	
	@GetMapping("/jpa/users/{username}/projects")
	public List<Project> getAllProjects(@PathVariable String username){
		return projectJpaRepository.findAll();
	}

	@GetMapping("/jpa/users/{username}/projects/{projectId}")
	public Project getProject(@PathVariable String username, @PathVariable Long projectId){
		return projectJpaRepository.findById(projectId).get();
	}

	@Secured("ROLE_ADMIN")
	@DeleteMapping("/jpa/users/{username}/projects/{projectId}")
	public ResponseEntity<Void> deleteProject(
			@PathVariable String username, @PathVariable Long projectId) {

		projectJpaRepository.deleteById(projectId);

		return ResponseEntity.noContent().build();
	}
	
	@Secured("ROLE_ADMIN")
	@PutMapping("/jpa/users/{username}/projects/{projectId}")
	public ResponseEntity<Project> updateProject(
			@PathVariable String username,
			@PathVariable Long projectId, @RequestBody Project project){
		
		project.setUsername(username);
		
		Project projectUpdated = projectJpaRepository.save(project);
		
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@PostMapping("/jpa/users/{username}/projects")
	public ResponseEntity<Void> createProject(
			@PathVariable String username, @RequestBody Project project){
		
		project.setUsername(username);
		
		Project createdProject = projectJpaRepository.save(project);
		
		//Location
		//Get current resource url
		///{id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{projectId}").buildAndExpand(createdProject.getProjectId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
}