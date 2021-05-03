package com.project.rest.webservices.restfulwebservices.project;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.PreRemove;

import com.project.rest.webservices.restfulwebservices.employees.Employee;
import com.project.rest.webservices.restfulwebservices.tasks.Task;

@Entity
public class Project {
	@Id
	@GeneratedValue
	private Long projectId;
	private String username;
	private String description;
	private Date targetDate;
	private boolean isDone;
	@JoinColumn(name="project_id")
	@OneToMany (cascade=CascadeType.ALL)
	private List<Task> tasks;
	
	@OneToMany (mappedBy="project", cascade={CascadeType.PERSIST})
	private List<Employee> employees;
	
	@PreRemove
	private void preRemove() {
	   employees.forEach( child -> child.setProjectId(null));
	}

	public Project() {

	}

	public Project(Long projectId, String username, String description, Date targetDate, boolean isDone, List<Task> tasks, List<Employee> employees) {
		super();
		this.projectId = projectId;
		this.username = username;
		this.description = description;
		this.targetDate = targetDate;
		this.isDone = isDone;
		this.tasks = tasks;
		this.employees = employees;
	}

	public List<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(List<Employee> employees) {
		this.employees = employees;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}

	public boolean isDone() {
		return isDone;
	}

	public void setDone(boolean isDone) {
		this.isDone = isDone;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (projectId ^ (projectId >>> 32));
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
		Project other = (Project) obj;
		if (projectId != other.projectId)
			return false;
		return true;
	}

	public void addTask(Task createdtask) {
		tasks.add(createdtask);
		
	}
	
	public void addEmployee(Employee createdemployee) {
		employees.add(createdemployee);
		
	}
}