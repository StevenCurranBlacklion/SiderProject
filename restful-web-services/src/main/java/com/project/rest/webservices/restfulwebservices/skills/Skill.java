package com.project.rest.webservices.restfulwebservices.skills;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Skill {
	@Id
	@GeneratedValue
	private long skill_id;
	private String username;
	private String skill;
	private String level;
	
	public Skill() {
		
	}

	public Skill(long skill_id, String username, String skill, String level) {
		super();
		this.skill_id = skill_id;
		this.username = username;
		this.skill = skill;
		this.level = level;
	}

	public long getSkill_id() {
		return skill_id;
	}

	public void setSkill_id(long skill_id) {
		this.skill_id = skill_id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getSkill() {
		return skill;
	}

	public void setSkill(String skill) {
		this.skill = skill;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (skill_id ^ (skill_id >>> 32));
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
		Skill other = (Skill) obj;
		if (skill_id != other.skill_id)
			return false;
		return true;
	}
}