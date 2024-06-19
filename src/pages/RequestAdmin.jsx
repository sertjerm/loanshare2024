import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyLoader from "../components/custom/MyLoader";
import * as actions from "../app/actions/main";
import GeneralPage, { AdminPage } from "./GeneralPage";
import { Card, Table } from "antd";
import moment from "moment";

const RequestAdmin = () => {
  const dispatch = useDispatch();
  const { isLoading, items: data } = useSelector(
    (state) => state.main.requestList
  );
  useEffect(() => {
    dispatch(actions.GetLoanRequests());
  }, []);
  if (isLoading) {
    return <MyLoader />;
  }
  const columns = [
    {
      title: "Application Name",
      dataIndex: "APP_NAME",
      key: "APP_NAME",
    },
    {
      title: "Interest Rate",
      dataIndex: "INT_RATE",
      key: "INT_RATE",
    },
    {
      title: "Last Update",
      dataIndex: "LAST_UPDATE",
      key: "LAST_UPDATE",
      render: (text) =>
        moment(parseInt(text.replace(/\/Date\((\d+)\+\d+\)\//, "$1"))).format(
          "MM/DD/YYYY HH:mm:ss"
        ),
    },
    {
      title: "Payment Type",
      dataIndex: "PAYMET",
      key: "PAYMET",
    },
    {
      title: "Registration Date",
      dataIndex: "REG_DATE_STR",
      key: "REG_DATE_STR",
    },
    {
      title: "Requested Amount",
      dataIndex: "REQ_AMT",
      key: "REQ_AMT",
    },
    {
      title: "Batch No.",
      dataIndex: "REQ_BATCHNO",
      key: "REQ_BATCHNO",
    },
    {
      title: "Request Date",
      dataIndex: "REQ_DATE",
      key: "REQ_DATE",
      render: (text) =>
        moment(parseInt(text.replace(/\/Date\((\d+)\+\d+\)\//, "$1"))).format(
          "MM/DD/YYYY HH:mm:ss"
        ),
    },
    {
      title: "Request ID",
      dataIndex: "REQ_ID",
      key: "REQ_ID",
    },
    {
      title: "Installment Number",
      dataIndex: "REQ_INSNUM",
      key: "REQ_INSNUM",
    },
    {
      title: "Interest",
      dataIndex: "REQ_INTR",
      key: "REQ_INTR",
    },
    {
      title: "Request No.",
      dataIndex: "REQ_NO",
      key: "REQ_NO",
    },
    {
      title: "Principal",
      dataIndex: "REQ_PRCP",
      key: "REQ_PRCP",
    },
    {
      title: "Remaining Amount",
      dataIndex: "REQ_REMAIN",
      key: "REQ_REMAIN",
    },
    {
      title: "Status",
      dataIndex: "REQ_STATUS",
      key: "REQ_STATUS",
    },
    {
      title: "Transaction",
      dataIndex: "REQ_TRANS",
      key: "REQ_TRANS",
    },
    {
      title: "User ID",
      dataIndex: "USER_ID",
      key: "USER_ID",
    },
  ];
  return (
    <AdminPage>
      <Card className="my-card">
        <h4>RequestAdmin</h4>
        <p>iprang it</p>
        <Table
          dataSource={data}
          columns={columns}
          rowKey="REQ_ID"
          scroll={{ x: 1500 }}
        />
      </Card>
    </AdminPage>
  );
};

export default RequestAdmin;