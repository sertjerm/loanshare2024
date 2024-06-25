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
  Select,
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [BatchNos, setBatchNos] = useState([]);
  const [selectedBatchNo, setSelectedBatchNo] = useState(null);

  useEffect(() => {
    dispatch(actions.GetLoanRequests());
  }, []);

  // useEffect(() => {
  //   setFormData(data);
  //   setOriginalData(data);
  // }, [data]);

  //!ต่อ
  useEffect(() => {
    if (data) {
      setFormData(data);
      setOriginalData(data);

      // Extract distinct BatchNo values
      const distinctBatchNumbers = [
        ...new Set(data.map((item) => item.REQ_BATCHNO)),
      ];
      setBatchNos(distinctBatchNumbers);
    }
  }, [data]);

  if (isLoading) {
    return <MyLoader />;
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys, selectedRows) => {
      if (newSelectedRowKeys.length === 0) {
        message.error("ยกเลิก");
      } else if (selectedRowKeys.length > newSelectedRowKeys.length) {
        message.error("ยกเลิก");
      } else {
        message.success("เลือก row แล้ว");
      }
      setSelectedRowKeys(newSelectedRowKeys);

      const updatedFormDataList = formdata.map((item) => {
        if (newSelectedRowKeys.includes(item.REQ_ID)) {
          return { ...item, IS_SELECT: true };
        } else {
          return { ...item, IS_SELECT: false };
        }
      });
      setFormData(updatedFormDataList);
    },
  };

  // const handleSelect = () => {
  //   console.log("===Selected===",selectedRowKeys);
  // }

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
    dispatch(
      actions.UpdateLoanRequest(
        updatedOriginalData.find((item) => item.REQ_ID === record.REQ_ID)
      )
    );
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

  const handleTransaction = (e, record) => {
    message.info("Trans Change to: " + e.key);
    const { key } = e;

    // อัพเดตข้อมูลที่กรอง
    const updatedFormData = formdata.map((item) => {
      if (item.REQ_ID === record.REQ_ID) {
        return { ...item, REQ_TRANS: key };
      }
      return item;
    });
    setFormData(updatedFormData);

    // อัพเดตข้อมูลดั้งเดิม
    const updatedOriginalData = originalData.map((item) => {
      if (item.REQ_ID === record.REQ_ID) {
        return { ...item, REQ_TRANS: key };
      }
      return item;
    });
    setOriginalData(updatedOriginalData);

    // ส่งข้อมูลที่อัพเดตไปยัง Redux
    dispatch(
      actions.UpdateLoanRequest(
        updatedOriginalData.find((item) => item.REQ_ID === record.REQ_ID)
      )
    );
  };

  //!ต่อ
  const handleBatchNoSelect = (value) => {
    setSelectedBatchNo(value);
    if (value === null || value === "all") {
      setFormData(originalData);
    } else {
      const filteredData = originalData.filter(
        (item) => item.REQ_BATCHNO === value
      );
      setFormData(filteredData);
    }
  };

  //!ต่อ
  const handleGenerateBatchData = () => {
    const selectedBatchData = formdata.filter((item) =>
      selectedRowKeys.includes(item.REQ_ID)
    );
    console.log(
      "Selected Batch Data:",
      selectedBatchData.map((item) => item.REQ_BATCHNO)
    );
    // Example: You can process the selectedBatchData as needed (e.g., export to CSV)
    // For demonstration, logging to console
    console.log("Processing selected batch data...");
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
      align: "center",
    },
    {
      title: "วิธีการส่งชำระ",
      dataIndex: "PAYMET",
      key: "PAYMET",
      render: (value) => (value === 1 ? "ส่งเงินต้นคงที่" : "ส่งแฟลตเรต"),
    },
    {
      title: "ล้างหนี้",
      title: "ชำระหนี้เดิม",
      dataIndex: "EXIST_LOAN",
      key: "EXIST_LOAN",
      render: (cell, row) => (
        <div className="number">
          <NumericFormat
            value={row.EXIST_LOAN}
            displayType={"text"}
            thousandSeparator={true}
          />
        </div>
      ),
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
                {status === "P" && (
                  <Badge status="warning" text="รอดำเนินการ" />
                )}
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
      render: (value, record) => {
        const menu = (
          <Menu onClick={(e) => handleTransaction(e, record)}>
            <Menu.Item key="0">N</Menu.Item>
            <Menu.Item key="1">Y</Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button>
              <Space>
                {value === "0" && <Badge status="warning" text="N" />}
                {value === "1" && <Badge status="success" text="Y" />}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <AdminPage>
      <div className="datepicker">
        <span>ข้อมูลการยื่นกู้วันที่ </span>
        <DateDisabled onDateSelect={handleDateSelect} />
      </div>
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => handleBatchNoSelect(key)}>
            <Menu.Item key="all">ทั้งหมด</Menu.Item>
            {BatchNos.map((batchNo) => (
              <Menu.Item key={batchNo}>{batchNo}</Menu.Item>
            ))}
          </Menu>
        }
        trigger={["click"]}
      >
        <Button>
          {selectedBatchNo
            ? selectedBatchNo === "all"
              ? "ทั้งหมด"
              : `Batch No. ${selectedBatchNo}`
            : "เลือก Batch No."}
          <DownOutlined />
        </Button>
      </Dropdown>
      <Card className="my-card">
        <h4>RequestAdmin</h4>
        <Table
          rowSelection={rowSelection}
          // dataSource={data}
          dataSource={formdata}
          columns={columns}
          rowKey="REQ_ID"
          scroll={{ x: 1500 }}
        />
      </Card>
      <div className="button">
        <Flex gap="small" wrap="wrap">
          <Button type="primary" onClick={handleGenerateBatchData}>
            ออกเลขชุดข้อมูล
          </Button>
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
