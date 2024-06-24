import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyLoader from "../components/custom/MyLoader";
import * as actions from "../app/actions/main";
import GeneralPage, { AdminPage } from "./GeneralPage";
import {
  Card,
  Flex,
  Table,
  Button,
  Menu,
  Dropdown,
  Space,
  Badge,
  message,
  DatePicker,
} from "antd";
import moment from "moment";
import { render } from "react-dom";
import { formatDateInThai } from "../app/jsUtils/thaiMoment.js";
import { DownOutlined } from "@ant-design/icons";
import "../assets/styles/request-admin.scss";
import { NumericFormat } from "react-number-format";
import DateDisabled from "../components/custom/DateDisabled";

const RequestAdmin = () => {
  const dispatch = useDispatch();
  const { isLoading, items: data } = useSelector(
    (state) => state.main.requestList
  );
  const { item: savedloan } = useSelector((state) => state.main.savedloan);
  const [formdata, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    dispatch(actions.GetLoanRequests());
  }, []);

  useEffect(() => {
    setFormData(data);
    setOriginalData(data);
  }, [data]);

  if (isLoading) {
    return <MyLoader />;
  }

  const handleStatusClick = (e, record) => {
    message.info("Status changed to: " + e.key);
    const { key } = e;

    // อัพเดตข้อมูลที่กรอง
    const updatedFormData = formdata.map((item) => {
      if (item.REQ_ID === record.REQ_ID) {
        return { ...item, REQ_STATUS: key };
      }
      return item;
    });
    setFormData(updatedFormData);

    // อัพเดตข้อมูลดั้งเดิม
    const updatedOriginalData = originalData.map((item) => {
      if (item.REQ_ID === record.REQ_ID) {
        return { ...item, REQ_STATUS: key };
      }
      return item;
    });
    setOriginalData(updatedOriginalData);

    // ส่งข้อมูลที่อัพเดตไปยัง Redux
    dispatch(actions.UpdateLoanRequest(updatedOriginalData.find((item) => item.REQ_ID === record.REQ_ID)));
  };

  const handleGeneratePDF = () => {
    window.open(
      "https://apps3.coop.ku.ac.th/php/mpdf/maprang/salary/salary_encrypt.php?year=2567&month=05&mbcode=000062"
    );
  };

  const handleDateSelect = (date) => {
    if (date) {
      const filteredData = originalData.filter((item) =>
        moment(item.REQ_DATE).isSame(date, "day")
      );
      setFormData(filteredData);
    } else {
      setFormData(originalData);
    }
  };

  const columns = [
    {
      title: "วัน-เวลายื่นกู้",
      dataIndex: "REQ_DATE",
      key: "REQ_DATE",
      render: (text) => formatDateInThai(text),
    },
    {
      title: "ชื่อ-นามสกุลผู้กู้",
      dataIndex: "FULLNAME",
      key: "FULLNAME",
    },
    {
      title: "ยอดเงินกู้",
      dataIndex: "REQ_AMT",
      key: "REQ_AMT",
      render: (cell, row) => (
        <div className="number">
          <NumericFormat
            value={row.REQ_AMT}
            displayType={"text"}
            thousandSeparator={true}
          />
        </div>
      ),
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
      render: (cell, row) => (
        <div className="number">
          <NumericFormat
            value={row.REQ_REMAIN}
            displayType={"text"}
            thousandSeparator={true}
          />
        </div>
      ),
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
        );
      },
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
      <div className="datepicker">
        <span>ข้อมูลการยื่นกู้วันที่ </span>
        <DateDisabled onDateSelect={handleDateSelect} />
      </div>
      <Card className="my-card">
        <h4>RequestAdmin</h4>
        <Table
          // dataSource={data}
          dataSource={formdata}
          columns={columns}
          rowKey="REQ_ID"
          scroll={{ x: 1500 }}
        />
      </Card>
      <div className="button">
        <Flex gap="small" wrap="wrap">
          <Button type="primary">ออกเลขชุดข้อมูล</Button>
          <Button type="primary">สร้างคำขอในระบบ</Button>
          <Button type="primary">ส่งข้อมูลไปรอจ่าย</Button>
          <Button type="primary" onClick={handleGeneratePDF}>
            ออกรายงานส่งการเงิน
          </Button>
        </Flex>
      </div>
    </AdminPage>
  );
};

export default RequestAdmin;