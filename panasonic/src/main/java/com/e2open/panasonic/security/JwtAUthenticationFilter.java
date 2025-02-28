package com.e2open.panasonic.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAUthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JWTUtil jwtUtil; 

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String token = request.getHeader("Authorization");

		if (token != null && token.startsWith("Bearer ")) {
			token = token.substring(7);

			if (jwtUtil.validateToken(token)) {
				Claims claims = jwtUtil.extractAllClaims(token);

				String username = claims.getSubject();

				request.setAttribute("username", username);
			}
		}
		filterChain.doFilter(request, response);

	}

}
