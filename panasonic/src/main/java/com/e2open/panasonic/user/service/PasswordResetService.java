package com.e2open.panasonic.user.service;

import java.sql.Date;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e2open.panasonic.user.model.PasswordResetToken;
import com.e2open.panasonic.user.model.User;
import com.e2open.panasonic.user.repo.PasswordResetTokenRepository;
import com.e2open.panasonic.user.repo.UserRepo;
 
@Service
public class PasswordResetService {

	@Autowired
	private UserRepo userRepository;

	@Autowired
	private PasswordResetTokenRepository tokenRepository;

	@Autowired
	private EmailService emailService;

	public void initiatePasswordReset(String username) {
		Optional<User> userOpt = userRepository.findByUsername(username);
		if (userOpt.isEmpty()) {
			throw new RuntimeException("User not found.");
		}

		User user = userOpt.get();
		String token = UUID.randomUUID().toString();
		Date expiryDate = new Date(System.currentTimeMillis() + 10 * 60 * 1000); // 10 minutes expiry

		PasswordResetToken resetToken = new PasswordResetToken(token, user, expiryDate);
		tokenRepository.save(resetToken);

		String resetLink = "http://localhost:3000/reset-password?token=" + token;
		emailService.sendPasswordResetEmail(user.getEmail(), resetLink);
	}

	public boolean validateToken(String token) {
		Optional<PasswordResetToken> resetTokenOpt = tokenRepository.findByToken(token);
		return resetTokenOpt.isPresent() && resetTokenOpt.get().getExpiryDate().after(new java.util.Date());
	}

}
