package com.project.rest.webservices.restfulwebservices.skills;

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
import com.project.rest.webservices.restfulwebservices.employees.EmployeeJpaRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class SkillJpaResource {

	@Autowired
	private SkillJpaRepository skillJpaRepository;
	
	@Autowired
	private EmployeeJpaRepository employeeJpaRepository;

	
	@GetMapping("/jpa/users/{username}/employees/{employeeId}/skills")
	public List<Skill> getAllSkills(@PathVariable String username, @PathVariable long employeeId){
		Employee employee = employeeJpaRepository.findById(employeeId).orElseThrow();
		System.out.println(employee.getSkills());
		return employee.getSkills();
	}

	@GetMapping("/jpa/users/{username}/employees/{employeeId}/skills/{skill_id}")
	public Skill getSkill(@PathVariable String username, @PathVariable long skill_id){
		return skillJpaRepository.findById(skill_id).get();
	}

	@Secured("ROLE_ADMIN")
	@DeleteMapping("/jpa/users/{username}/employees/{employeeId}/skills/{skill_id}")
	public ResponseEntity<Void> deleteSkill(
			@PathVariable String username, @PathVariable long skill_id) {

		skillJpaRepository.deleteById(skill_id);

		return ResponseEntity.noContent().build();
	}
	
	@Secured("ROLE_ADMIN")
	@PutMapping("/jpa/users/{username}/employees/{employeeId}/skills/{skill_id}")
	public ResponseEntity<Skill> updateSkill(
			@PathVariable String username,
			@PathVariable long skill_id, @RequestBody Skill skill){
		
		skill.setUsername(username);
		
		Skill skillUpdated = skillJpaRepository.save(skill);
		
		return new ResponseEntity<Skill>(skill, HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@PostMapping("/jpa/users/{username}/employees/{employeeId}/skills")
	public ResponseEntity<Void> createSkill(
			@PathVariable String username, @PathVariable long employeeId, @RequestBody Skill skill){
		
		skill.setUsername(username);
		
		Skill createdskill = skillJpaRepository.save(skill);
		Employee employee = employeeJpaRepository.findById(employeeId).orElseThrow();
		employee.addSkill(createdskill);
		employeeJpaRepository.save(employee);
		//Location
		//Get current resource url
		///{id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{skill_id}").buildAndExpand(createdskill.getSkill_id()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
}