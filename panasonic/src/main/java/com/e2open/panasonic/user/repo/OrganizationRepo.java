package com.e2open.panasonic.user.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e2open.panasonic.user.model.Organization;

@Repository
public interface OrganizationRepo extends JpaRepository<Organization, Long> {
	
	boolean existsByCreatedBy(String orgName);
	
	Organization findByCreatedBy(String orgId);

}
