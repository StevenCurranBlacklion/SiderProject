package com.project.rest.webservices.restfulwebservices.tasks;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskJpaRepository extends JpaRepository<Task, Long>{
	List<Task> findByUsername(String username);
}