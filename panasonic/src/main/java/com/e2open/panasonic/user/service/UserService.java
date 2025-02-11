package com.e2open.panasonic.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e2open.panasonic.user.model.User;
import com.e2open.panasonic.user.repo.UserRepository;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User login(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }
    
}
