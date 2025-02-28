package com.e2open.panasonic.user.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e2open.panasonic.user.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    User findByUsernameAndPassword(String username, String password);
    
    Optional<User> findByUsername(String username);
    
}
