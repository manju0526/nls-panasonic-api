package com.e2open.panasonic.user.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e2open.panasonic.dto.OrganizationRequest;
import com.e2open.panasonic.user.model.Organization;
import com.e2open.panasonic.user.model.User;
import com.e2open.panasonic.user.repo.OrganizationRepo;
import com.e2open.panasonic.user.repo.UserRepo;

@Service
public class UserService {

	@Autowired
	private UserRepo userRepo;

	public User login(String username, String password) {
		return userRepo.findByUsernameAndPassword(username, password);
	}

}
