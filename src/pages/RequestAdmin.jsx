import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyLoader from "../components/custom/MyLoader";
import * as actions from "../app/actions/main";
import GeneralPage, { AdminPage } from "./GeneralPage";
import { Card, Flex, Table, Button, Menu, Dropdown, Space, Badge } from "antd";
import moment from "moment";
import { render } from "react-dom";
import { formatDateInThai } from "../app/jsUtils/thaiMoment.js";
import { DownOutlined } from "@ant-design/icons";

const RequestAdmin = () => {
  const dispatch = useDispatch();
  const { isLoading, items: data } = useSelector(
    (state) => state.main.requestList
  );
  const { item: savedloan } = useSelector((state) => state.main.savedloan);
  const [formdata, setFormData] = useState(null);

  useEffect(() => {
    dispatch(actions.GetLoanRequests());
  }, []);

  useEffect(() => {
    setFormData(data);
  },[data]);

  if (isLoading) {
    return <MyLoader />;
  }

  const handleStatusClick = (e, record) => {
    const { key } = e;
    const updatedData = data.map(item => {
      if (item.REQ_ID === record.REQ_ID) {
        return { ...item, REQ_STATUS: key };
      }
      return item;
    });
    // Update the state with the new array
    setFormData(updatedData);
    // Dispatch the action with the updated data
    dispatch(actions.SaveLoanRequest(updatedData.find(item => item.REQ_ID === record.REQ_ID)));
  };

  const handleGeneratePDF = () => {
    window.open("https://apps3.coop.ku.ac.th/php/mpdf/maprang/salary/salary_encrypt.php?year=2567&month=05&mbcode=000062");
  };

  const columns = [
    {
      title: "วัน-เวลายื่นกู้",
      dataIndex: "REQ_DATE",
      key: "REQ_DATE",
      render: (text) => formatDateInThai(text),
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "FULLNAME",
      key: "FULLNAME",
    },
    {
      title: "ยอดเงินกู้",
      dataIndex: "REQ_AMT",
      key: "REQ_AMT",
    },
    {
      title: "จำนวนงวด",
      dataIndex: "REQ_INSNUM",
      key: "REQ_INSNUM",
    },
    {
      title: "วิธีการส่งชำระ",
      dataIndex: "PAYMET",
      key: "PAYMET",
      render: (value) => (value === 1 ? "ส่งเงินต้นคงที่" : "ส่งแฟลตเรต"),
    },
    {
      title: "เหลือรับ",
      dataIndex: "REQ_REMAIN",
      key: "REQ_REMAIN",
    },
    {
      title: "สถานะรายการ",
      dataIndex: "REQ_STATUS",
      key: "REQ_STATUS",
      render: (status, record) => {
        const menu = (
          <Menu onClick={(e) => handleStatusClick(e, record)}>
            <Menu.Item key="A">อนุมัติ</Menu.Item>
            <Menu.Item key="P">รอดำเนินการ</Menu.Item>
            <Menu.Item key="D">ไม่อนุมัติ</Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button>
              <Space>
                {status === "A" && <Badge status="success" text="อนุมัติ" />}
                {status === "P" && <Badge status="warning" text="รอดำเนินการ" />}
                {status === "D" && <Badge status="error" text="ไม่อนุมัติ" />}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        )
      }
    },
    {
      title: "Batch No.",
      dataIndex: "REQ_BATCHNO",
      key: "REQ_BATCHNO",
    },
    {
      title: "User ID",
      dataIndex: "USER_ID",
      key: "USER_ID",
    },
    {
      title: "Request No.",
      dataIndex: "REQ_NO",
      key: "REQ_NO",
    },
    {
      title: "Transaction",
      dataIndex: "REQ_TRANS",
      key: "REQ_TRANS",
      render: (value) => (value === "0" ? "N" : "Y"),
    },
  ];
  return (
    <AdminPage>
      <Card className="my-card">
        <h4>RequestAdmin</h4>
        <Table
          dataSource={data}
          columns={columns}
          rowKey="REQ_ID"
          scroll={{ x: 1500 }}
        />
      </Card>
      <div>
        <Flex gap="small" wrap="wrap">
        <Button type="primary" onClick={handleGeneratePDF}>
              ออกรายงานส่งการเงิน
        </Button>
        </Flex>
      </div>
    </AdminPage>
  );
};

export default RequestAdmin;