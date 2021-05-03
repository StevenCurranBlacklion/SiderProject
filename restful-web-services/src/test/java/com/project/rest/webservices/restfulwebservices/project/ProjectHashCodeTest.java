package com.project.rest.webservices.restfulwebservices.project;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class ProjectHashCodeTest {

	@Test
    public void test() {
            Project p1 = new Project();
            Project p2= new Project();
            assertEquals(p1.hashCode(), p2.hashCode());
    }

}
