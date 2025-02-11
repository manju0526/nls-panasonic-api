package com.e2open.panasonic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e2open.panasonic.user.model.User;
import com.e2open.panasonic.user.service.UserService;

@RestController
@RequestMapping("/api")
public class MainController {

	@Autowired
	private UserService userService;

	@PostMapping("/login")
	public ResponseEntity<Void> login(@RequestBody User user) {
		User loggedInUser = userService.login(user.getUsername(), user.getPassword());
		if (loggedInUser != null) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}


}
