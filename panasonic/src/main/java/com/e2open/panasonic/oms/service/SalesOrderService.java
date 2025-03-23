package com.e2open.panasonic.oms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e2open.panasonic.oms.model.SalesOrder;
import com.e2open.panasonic.oms.repo.salesOrdersRepo;

@Service
public class SalesOrderService {

	@Autowired
	private static salesOrdersRepo salesOrdersRepo;
	
	public SalesOrderService(salesOrdersRepo salesOrdersRepo) {
        this.salesOrdersRepo = salesOrdersRepo;
    }

	public static List<SalesOrder> getSalesOrdersByOrgId(String orgId) {
		return salesOrdersRepo.findAllBySalesOrderId_OrgId(orgId);
	}

}
