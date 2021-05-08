package com.project.rest.webservices.restfulwebservices.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {
	// Encoded passwords can be created in PasswordEncoder.java
	static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();

	static {
		// Password: default
		inMemoryUserList.add(new JwtUserDetails(1L, "SCurran",
				"$2a$10$YaYrsKk9f05w39g6crcs9O03SncLumZFDatXGJjNJy0Q6nsgZlHCG", "ROLE_ADMIN"));

		// Password: default
		inMemoryUserList.add(new JwtUserDetails(1L, "AClear",
				"$2a$10$YaYrsKk9f05w39g6crcs9O03SncLumZFDatXGJjNJy0Q6nsgZlHCG", "ROLE_ADMIN"));

		// Password: default
		inMemoryUserList.add(new JwtUserDetails(1L, "JJohnson",
				"$2a$10$YaYrsKk9f05w39g6crcs9O03SncLumZFDatXGJjNJy0Q6nsgZlHCG", "ROLE_USER"));

		// Password: test
		inMemoryUserList.add(new JwtUserDetails(1L, "test",
				"$2a$10$zXSOzFkSjTseTGH.VCq.rOlFCLzzC9dEUT/B90sl05Ln81XxjH332", "ROLE_USER"));
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
				.filter(user -> user.getUsername().equals(username)).findFirst();

		if (!findFirst.isPresent()) {
			throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
		}

		return findFirst.get();
	}

}