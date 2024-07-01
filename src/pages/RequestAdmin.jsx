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
  Radio,
  Checkbox,
} from "antd";
import moment from "moment";
import { render } from "react-dom";
import { formatDateInThai } from "../app/jsUtils/thaiMoment.js";
import { DownOutlined } from "@ant-design/icons";
import "../assets/styles/request-admin.scss";
import { NumericFormat } from "react-number-format";
import DateDisabled from "../components/custom/DateDisabled";
import { useNavigate } from "react-router-dom";

const RequestAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, items: data } = useSelector(
    (state) => state.main.requestList
  );
  const { item: savedloan } = useSelector((state) => state.main.savedloan);
  const [formdata, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [BatchNos, setBatchNos] = useState([]);
  const [selectedBatchNo, setSelectedBatchNo] = useState(null);
  const [disabledRowKeys, setDisabledRowKeys] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all"); // State สำหรับเก็บสถานะที่เลือกในการกรอง

  useEffect(() => {
    dispatch(actions.GetLoanRequests());
  }, []);

  // useEffect(() => {
  //   setFormData(data);
  //   setOriginalData(data);
  // }, [data]);

  //!GPT
  useEffect(() => {
    if (data) {
      setFormData(data);
      setOriginalData(data);
      console.log("============", data);

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
    },
    getCheckboxProps: (record) => ({
      disabled:
        selectedBatchNo &&
        selectedBatchNo !== "all" &&
        disabledRowKeys.includes(record.REQ_ID),
    }),
  };

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
      "https://apps3.coop.ku.ac.th/php/mpdf/maprang/salary/report_loan.php"
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

  //เพื่อให้ตรวจสอบแถวที่มีสถานะเป็น "รอดำเนินการ" หรือ "ไม่อนุมัติ"
  const handleBatchNoSelect = (value) => {
    setSelectedBatchNo(value);
    if (value === null || value === "all") {
      setFormData(originalData);
      setDisabledRowKeys([]);
    } else {
      const filteredData = originalData.filter(
        (item) => item.REQ_BATCHNO === value
      );
      setFormData(filteredData);

      // ตรวจสอบแถวที่ disable
      const disabledKeys = filteredData
        .filter((item) => item.REQ_STATUS === "P" || item.REQ_STATUS === "D")
        .map((item) => item.REQ_ID);
      setDisabledRowKeys(disabledKeys);
    }
  };

  const handleGenerateBatchData = () => {
    const selectedBatchData = formdata.filter((item) =>
      selectedRowKeys.includes(item.REQ_ID)
    );
    console.log("Selected Batch Data for CreateBatchId:", selectedBatchData);
  
    const hasInvalidStatus = selectedBatchData.some(
      (item) => item.REQ_STATUS !== "A"
    );
  
    if (hasInvalidStatus) {
      message.warning(
        "ไม่สามารถออกเลขชุดได้เนื่องจากมีแถวที่มีสถานะ 'รอดำเนินการ' หรือ 'ไม่อนุมัติ' ถูกเลือก"
      );
    } else if (selectedBatchData.length > 0) {
      // const newBatchNo = Date.now().toString(); // Generate a unique batch number
      const now = new Date();
      const newBatchNo = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
      // Optimistically update the state
      const updatedFormData = formdata.map((item) => {
        if (selectedRowKeys.includes(item.REQ_ID)) {
          return { ...item, REQ_BATCHNO: newBatchNo };
        }
        return item;
      });
  
      setFormData(updatedFormData);
      message.success("ออกเลขชุดข้อมูลสำเร็จ");
  
      // Dispatch the action to update the server
      dispatch(
        actions.CreateBatchId(selectedBatchData.map((item) => item.REQ_ID))
      ).then(() => {
        const updatedBatchData = store.getState().main.batchList.items;
        const syncedFormData = formdata.map((item) => {
          const updatedItem = updatedBatchData.find(
            (batchItem) => batchItem.REQ_ID === item.REQ_ID
          );
          return updatedItem ? { ...item, REQ_BATCHNO: updatedItem.REQ_BATCHNO } : item;
        });
  
        setFormData(syncedFormData); // Ensure state consistency with server response
      });
    } else {
      message.warning(
        "กรุณาเลือกแถวที่มีสถานะเป็น 'อนุมัติ' สำหรับการออกเลขชุดข้อมูล"
      );
    }
  };
  
  const handleMakeRealRequest = (e, record) => {
    const selectedBatchData = formdata.filter((item) =>
      selectedRowKeys.includes(item.REQ_ID)
    );
    console.log("Selected Batch Data for MakeRealRequest:", selectedBatchData);
  
    // Check if any selected row has a batchid and transaction status as "ยังไม่โอน"
    const hasUntransferredTransaction = selectedBatchData.some(
      (item) => item.REQ_TRANS !== "Y"
    );
  
    const hasInvalidStatus = selectedBatchData.some(
      (item) => item.REQ_STATUS !== "A"
    );
  
    if (hasInvalidStatus) {
      message.warning(
        "ไม่สามารถออกเลขชุดได้เนื่องจากมีแถวที่มีสถานะ 'รอดำเนินการ' หรือ 'ไม่อนุมัติ' ถูกเลือก"
      );
    } else if (hasUntransferredTransaction) {
      message.warning(
        "ไม่สามารถส่งข้อมูลได้เนื่องจากมีแถวที่ยังไม่ได้โอน"
      );
    } else if (selectedBatchData.length > 0) {
      dispatch(
        actions.MakeRealRequest(
          selectedBatchData.map((item) => item.REQ_BATCHNO)
        )
      );
    } else {
      message.warning(
        "กรุณาเลือกแถวที่มีสถานะเป็น 'อนุมัติ' สำหรับการออกเลขชุดข้อมูล"
      );
    }
  };
  

  const handleFilterStatusChange = (checkedValues) => {
    setFilterStatus(checkedValues);

    if (checkedValues.includes("all")) {
      setFormData(originalData);
    } else {
      const filteredData = originalData.filter((item) =>
        checkedValues.includes(item.REQ_STATUS)
      );
      setFormData(filteredData);
    }
  };

  const handleLogout = () => {
    // dispatch(logout());
    navigate("/"); // Navigate to the login page after logout
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
      // title: "ล้างหนี้",
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
          <div className="btn-status">
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
          </div>
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
      title: "ReqID",
      dataIndex: "REQ_ID",
      key: "REQ_ID",
    },
    {
      title: "Transaction",
      dataIndex: "REQ_TRANS",
      key: "REQ_TRANS",
      render: (value, record) => {
        return (
          <div className="text-center">
            {value === "Y" ? (
              <Badge status="success" text="โอนแล้ว" />
            ) : (
              <Badge status="error" text="ยังไม่โอน" />
            )}
          </div>
        );
      },
      // render: (value, record) => {
      //   const menu = (
      //     <Menu   onClick={(e) => handleTransaction(e, record)}>
      //       <Menu.Item key="N">N</Menu.Item>
      //       <Menu.Item key="Y">Y</Menu.Item>
      //     </Menu>
      //   );
      //   return (
      //     <Dropdown overlay={menu} trigger={["click"]}>
      //       <Button>
      //         <Space>
      //           {value}
      //           <DownOutlined />
      //         </Space>
      //       </Button>
      //     </Dropdown>
      //   );
      // },
    },
  ];

  return (
    <AdminPage>
      <Button onClick={handleLogout} style={{ float: "right" }}>
        Logout
      </Button>
      <div className="datepicker">
        <span>ข้อมูลการยื่นกู้วันที่ </span>
        <DateDisabled onDateSelect={handleDateSelect} />
      </div>
      <div className="filter-status">
        <span>สถานะรายการ </span>
        <Checkbox.Group
          options={[
            { label: "ทั้งหมด", value: "all" },
            { label: "อนุมัติ", value: "A" },
            { label: "รอดำเนินการ", value: "P" },
            { label: "ไม่อนุมัติ", value: "D" },
          ]}
          value={filterStatus}
          onChange={handleFilterStatusChange}
        />
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
          // rowClassName={getRowClassName} // เพิ่ม rowClassName ที่นี่
        />
      </Card>
      <div className="button">
        <Flex gap="small" wrap="wrap">
          <Button type="default" onClick={handleGenerateBatchData}>
            ออกเลขชุดข้อมูล
          </Button>
          <Button type="default">สร้างคำขอในระบบ</Button>
          <Button type="default" onClick={handleMakeRealRequest}>
            ส่งข้อมูลไปรอจ่าย
          </Button>
          <Button type="default" onClick={handleGeneratePDF}>
            ออกรายงานส่งการเงิน
          </Button>
        </Flex>
      </div>
    </AdminPage>
  );
};

export default RequestAdmin;
