package com.project.rest.webservices.restfulwebservices.employees;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeJpaRepository extends JpaRepository<Employee, Long>{
	List<Employee> findByUsername(String username);
}