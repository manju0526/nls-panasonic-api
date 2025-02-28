package com.e2open.panasonic.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    public JavaMailSender mailSender;

    public void sendPasswordResetEmail(String toEmail, String resetLink) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(toEmail);
            helper.setSubject("Password Reset Request");

            // HTML Content with Footer
            String emailContent = "<html><body style='font-family: Arial, sans-serif;'>" +
                    "<h2>Password Reset Request</h2>" +
                    "<p>You have requested to reset your password. Click the link below to reset your password:</p>" +
                    "<p><a href='" + resetLink + "' style='color: #007bff; text-decoration: none; font-weight: bold;'>Reset Password</a></p>" +
                    "<br>" +
                    "<p>If you did not request this, please ignore this email.</p>" +
                    "<hr>" +
                    "<footer style='font-size: 12px; color: #777; text-align: center;'>" +
                    "© 2025 Panasonic | All rights reserved." +
                    "</footer>" +
                    "</body></html>";

            helper.setText(emailContent, true); // Set true for HTML format

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Error sending email: " + e.getMessage());
        }
    }
}
