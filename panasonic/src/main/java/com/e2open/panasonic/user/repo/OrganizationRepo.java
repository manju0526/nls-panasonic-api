package com.e2open.panasonic.user.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e2open.panasonic.user.model.Organization;
import com.e2open.panasonic.user.model.User;

@Repository
public interface OrganizationRepo extends JpaRepository<Organization, Long> {
	
	boolean existsByCreatedBy(String orgName);
	
	Organization findByCreatedBy(String orgId);
	
	Optional<Organization> findByCreatedAt(String userName);
	

}
