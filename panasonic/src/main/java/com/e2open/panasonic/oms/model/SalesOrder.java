package com.e2open.panasonic.oms.model;

import java.math.BigDecimal;
import java.sql.Date;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "sales_orders")
public class SalesOrder {

	@EmbeddedId
    private SalesOrderId salesOrderId;

    private String orgtrntOrgtrnId;
    private String orgtrntId;
    private String orggpId;
    private String orgpId;
    private String orgpId1;
    private String orgpId2;
    private String orgpId3;
    private String orgserpoId;
    private String orgserpoId1;
    private String orgserpoId2;
    private String orgserpoId3;
    private String orgctyId;
    private String orgsalId;
    private String orgttId;
    private String orgpyttId;
    private String orgcurId;
    private String transportMode;
    private String transType;
    private Date receivedDate;
    private String extSysRefNo;
    private Date extSysRefDate;
    private String extSysRefOrgId;
    private String customerPoNumber;
    private Date customerRequestDate;
    private String tradeType;
    private String orderType;
    private BigDecimal exrate;
    private String vessel;
    private String voyage;
    private String freightTerm;
    private String deliveryInstruction;
    private BigDecimal grossAmt;
    private BigDecimal discAmt;
    private BigDecimal discPct;
    private BigDecimal otherDiscAmt;
    private BigDecimal totalAmt;
    private BigDecimal taxAmt;
    private BigDecimal netAmt;
    private BigDecimal localAmt;
    private String dataSource;
    private String reason;
    private String remarks;
    private String posted;

    private String reference1;
    private String reference2;
    private String reference3;
    private String reference4;
    private String reference5;
    private String reference6;
    private BigDecimal referenceNo1;
    private BigDecimal referenceNo2;
    private BigDecimal referenceNo3;
    private BigDecimal referenceDouble1;
    private BigDecimal referenceDouble2;
    private BigDecimal referenceDouble3;
    private BigDecimal referenceDouble4;
    private BigDecimal referenceDouble5;
    private BigDecimal referenceDouble6;
    private Date referenceDate1;
    private Date referenceDate2;
    private Date referenceDate3;

    private String createdAt;
    private String createdBy;
    private Date createdOn;
    private String modifiedAt;
    private String modifiedBy;
    private Date modifiedOn;
    private String status;
    private String orgregId;
    private String orderPriority;

    private String reference7;
    private String reference8;
    private String reference9;
    private String reference10;
    private String reference11;
    private String reference12;
    private String reference13;
    private String reference14;
    private String reference15;
    private String reference16;
    private String reference17;
    private String reference18;
    private String reference19;
    private String reference20;
    private String reference21;
    private String reference22;
    private String reference23;
    private String reference24;
    private String reference25;
    private String reference26;
    private String reference27;
    private String reference28;
    private String reference29;
    private String reference30;

    private BigDecimal referenceNo4;
    private BigDecimal referenceNo5;
    private BigDecimal referenceNo6;
    private Date referenceDate4;
    private Date referenceDate5;
    private Date referenceDate6;

    private Date customerPoDate;
    private String fbPoNumber;
    private String orgttId1;
    private String transStatus;
    private String docStatus;
    private String transBatchId;
    private Date transDate;
    private String ackStatus;
    private String ackTransBatchId;
    private Date ackTransDate;
    private String nediAckStatus;
    private String nediAckBatchId;
    private Date nediAckTransDate;
    private String orgpId5;
    private String cancelReasonCode;
    private String gaStatus;
    private String gtmStatus;
    private String trackingStatus;
    private Date gtmStatusDate;
    private String gtlTransmitStatus;
    private Date gtlTransmitDate;
    private String gtlTransBatch;
}
