package com.project.rest.webservices.restfulwebservices.project;

import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class ProjectEqualsTest {
    @Test
    public void test() {
            Project p1 = new Project();
            Project t2= new Project();
            assertTrue(p1.equals(t2));

    }
    
}