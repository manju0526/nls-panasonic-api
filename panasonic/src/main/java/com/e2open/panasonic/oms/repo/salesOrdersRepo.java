package com.e2open.panasonic.oms.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.e2open.panasonic.oms.model.SalesOrder;
import com.e2open.panasonic.oms.model.SalesOrderId;

@Repository
public interface salesOrdersRepo extends JpaRepository<SalesOrder,SalesOrderId>{
	List<SalesOrder> findAllBySalesOrderId_OrgId(String orgId);
}
