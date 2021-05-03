package com.project.rest.webservices.restfulwebservices.tasks;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PreRemove;


import com.project.rest.webservices.restfulwebservices.employees.Employee;

@Entity
public class Task {
	@Id
	@GeneratedValue
	private long task_id;
	private String username;
	private Date startDate;
	private String task;
	private Date endDate;
	private boolean isDone;
	@OneToMany (mappedBy="task", cascade={CascadeType.PERSIST})
	private List<Employee> employees;
	@PreRemove
	private void preRemove() {
	   employees.forEach( child -> child.setTask_id(null));
	}
	
	public Task() {
		
	}

	public Task(Long task_id, String username, Date startDate, String task, Date endDate, boolean isDone, List<Employee> employees) {
		super();
		this.task_id = task_id;
		this.username = username;
		this.startDate = startDate;
		this.task = task;
		this.endDate = endDate;
		this.isDone = isDone;
		this.employees = employees;
	}
	
	public List<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(List<Employee> employees) {
		this.employees = employees;
	}
	
	public long getTask_id() {
		return task_id;
	}

	public void setTask_id(Long task_id) {
		this.task_id = task_id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getTask() {
		return task;
	}

	public void setTask(String task) {
		this.task = task;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
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
		result = prime * result + (int) (task_id ^ (task_id >>> 32));
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
		Task other = (Task) obj;
		if (task_id != other.task_id)
			return false;
		return true;
	}
	
	public void addEmployee(Employee createdemployee) {
		employees.add(createdemployee);
		
	}
}