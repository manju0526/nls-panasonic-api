package com.e2open.panasonic.user.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e2open.panasonic.dto.OrganizationRequest;
import com.e2open.panasonic.user.model.Organization;
import com.e2open.panasonic.user.repo.OrganizationRepo;

@Service
public class OrganizationService {

	@Autowired
	private OrganizationRepo organizationRepo;

	public boolean existByOrgId(String UserName) {
		return organizationRepo.existsByCreatedBy(UserName);
	}

	public void saveOrganization(OrganizationRequest organizationRequest) {
		Organization organization = new Organization();

		organization.setOrgId(organizationRequest.getOrgId());
		organization.setOrgppId(organizationRequest.getOrgppId());
		organization.setStatus(organizationRequest.getStatus());
		organization.setCreatedBy(organizationRequest.getCreatedBy());
		organization.setCreatedAt(organizationRequest.getCreatedAt());
		organization.setCreatedOn(LocalDate.now());
		organization.setModifiedBy(organizationRequest.getModifiedBy());
		organization.setModifiedAt(organizationRequest.getModifiedAt());
		organization.setModifiedOn(LocalDate.now());

		organizationRepo.save(organization);
	}

	public void updateOrganization(OrganizationRequest organizationRequest) {
		Organization organization = organizationRepo.findByCreatedBy(organizationRequest.getCreatedBy());

		if (organization != null) {
			organization.setOrgId(organizationRequest.getOrgId());
			organization.setOrgppId(organizationRequest.getOrgppId());

			organizationRepo.save(organization);
		}
	}

	public Organization getOrganizationByUser(String userName) {
		return organizationRepo.findByCreatedAt(userName).orElse(null);
	}
	
	public List<Organization> getOrganizationLists(){
		return organizationRepo.findAll();
	}
}
