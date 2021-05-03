package com.project.rest.webservices.restfulwebservices.project;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectJpaRepository extends JpaRepository<Project, Long>{
	List<Project> findByUsername(String username);
}