package com.e2open.panasonic.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OrganizationRequest {

	@JsonProperty("orgId")
	private String orgId;
	@JsonProperty("orggpId")
	private String orggpId;
	@JsonProperty("status")
	private String status;
	@JsonProperty("createdBy")
	private String createdBy;
	@JsonProperty("createdAt")
	private String createdAt;
	@JsonProperty("modifiedAt")
	private String modifiedAt;
	@JsonProperty("modifiedBy")
	private String modifiedBy;

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getOrgppId() {
		return orggpId;
	}

	public void setOrgppId(String orggpId) {
		this.orggpId = orggpId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public String getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(String modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

}
