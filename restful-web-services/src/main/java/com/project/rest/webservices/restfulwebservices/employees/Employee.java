package com.project.rest.webservices.restfulwebservices.employees;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.project.rest.webservices.restfulwebservices.project.Project;
import com.project.rest.webservices.restfulwebservices.skills.Skill;
import com.project.rest.webservices.restfulwebservices.tasks.Task;

@Entity
public class Employee{
	@Id
	@GeneratedValue
	private Long employeeId;
	private String username;
	private String first_name;
	private String last_name;
	@JoinColumn(name="employee_id")
	@OneToMany (cascade=CascadeType.ALL)
	private List<Skill> skills;
	
	@Column(name = "project_id", insertable = true, updatable = true)
	private Long projectId;
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(optional = true)
    @JoinColumn(columnDefinition="integer", name="project_id", nullable = true, insertable = false, updatable = false)
    Project project;
    
	@Column(name = "task_id", insertable = true, updatable = true)
	private Long task_id;
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(optional = true)
    @JoinColumn(columnDefinition="integer", name="task_id", nullable = true, insertable = false, updatable = false)
    Task task;
	
	public Employee() {
		
	}

	public Employee(Long employeeId, String username, String first_name, String last_name, Long projectId, Long task_id, List<Skill> skills) {
		super();
		this.employeeId = employeeId;
		this.username = username;
		this.first_name = first_name;
		this.last_name = last_name;
		this.projectId = projectId;
		this.task_id = task_id;
		this.skills = skills;
	}

	public Long getTask_id() {
		return task_id;
	}

	public void setTask_id(Long task_id) {
		this.task_id = task_id;
	}

	public Long getProjectId() {
		return projectId;
	}
	
	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	public List<Skill> getSkills() {
		return skills;
	}

	public void setSkills(List<Skill> skills) {
		this.skills = skills;
	}

	public long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (employeeId ^ (employeeId >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Employee other = (Employee) obj;
		if (employeeId != other.employeeId)
			return false;
		return true;
	}
	
	public void addSkill(Skill createdskill) {
		skills.add(createdskill);
		
	}
}