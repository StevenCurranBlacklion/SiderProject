package com.project.rest.webservices.restfulwebservices.skills;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillJpaRepository extends JpaRepository<Skill, Long>{
	List<Skill> findByUsername(String username);
}