package com.e2open.panasonic;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e2open.panasonic.dto.OrganizationRequest;
import com.e2open.panasonic.user.model.User;
import com.e2open.panasonic.user.service.OrganizationService;
import com.e2open.panasonic.user.service.UserService;

@RestController
@RequestMapping("/api")
public class MainController {

	@Autowired
	private UserService userService;

	@Autowired
	private OrganizationService organizationService;

	@PostMapping("/login")
	public ResponseEntity<Void> login(@RequestBody User user) {
		User loggedInUser = userService.login(user.getUsername(), user.getPassword());
		if (loggedInUser != null) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@PostMapping("/saveOrganization")
	public ResponseEntity<Map<String, String>> saveOrganization(@RequestBody OrganizationRequest organizationRequest) {
		Map<String, String> response = new HashMap<String, String>();

		boolean exists = organizationService.existByOrgId(organizationRequest.getCreatedBy());

		if (exists) {
			organizationService.updateOrganization(organizationRequest);
			response.put("message", "Updated data successfully");		
			return ResponseEntity.ok(response);
		} else {
			organizationService.saveOrganization(organizationRequest);
			response.put("message", "Inserted sata successfully");
			return ResponseEntity.ok(response);
		}

	}

}
