package com.e2open.panasonic.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e2open.panasonic.user.model.User;
import com.e2open.panasonic.user.repo.UserRepo;

@Service
public class UserService {

	@Autowired
	private UserRepo userRepo;

	public User login(String username, String password) {
		return userRepo.findByUsernameAndPassword(username, password);
	}
	
	

}
