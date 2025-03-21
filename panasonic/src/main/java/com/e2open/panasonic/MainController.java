package com.e2open.panasonic;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e2open.panasonic.dto.OrganizationRequest;
import com.e2open.panasonic.security.JWTUtil;
import com.e2open.panasonic.user.model.Organization;
import com.e2open.panasonic.user.model.User;
import com.e2open.panasonic.user.service.OrganizationService;
import com.e2open.panasonic.user.service.PasswordResetService;
import com.e2open.panasonic.user.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class MainController {

	@Autowired
	private JWTUtil jwtUtil;

	@Autowired
	private UserService userService;

	@Autowired
	private OrganizationService organizationService;

	@Autowired
	private PasswordResetService passwordResetService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		User loggedInUser = userService.login(user.getUsername(), user.getPassword());
		System.out.println(loggedInUser);
		if (loggedInUser != null) {
			String token = jwtUtil.generateToken(user.getUsername());

			Map<String, Object> response = new HashMap<>();
			response.put("token", token);
			response.put("orgName", "PLGA");
			response.put("group", "BL");
			System.out.println(token);
			return ResponseEntity.ok(response);
		} else {
			Map<String, String> errorResponse = new HashMap<>();
	        errorResponse.put("error", "Invalid username or password");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
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

	@GetMapping("/organization/{username}")
	public ResponseEntity<?> getOrganizationBYId(@PathVariable String username) {
		Organization org = organizationService.getOrganizationByUser(username);
		if (org == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Organization not found for user");
		}

		return ResponseEntity.ok(org);
	}

	@PostMapping("/forgotPassword")
	public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
		Map<String, String> response = new HashMap<String, String>();
		String username = request.get("username");
		if (username == null || username.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username is Empty.");
		}

		passwordResetService.initiatePasswordReset(username);
		response.put("message", "Password reset email sent.");
		return ResponseEntity.ok(response);
	}

	@GetMapping("/validateToken")
	public boolean validateToken(@RequestParam String token) {
		return passwordResetService.validateToken(token);
	}
	
	@GetMapping("/organization/listAll")
	public ResponseEntity<?> getOrganizationList() {
		try {
		List<Organization> orgLists = organizationService.getOrganizationLists();
		return ResponseEntity.status(HttpStatus.OK).body(orgLists);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getStackTrace());
		}
		
	}


}
