import { Form, Input, Radio, Space, Button, Typography } from "antd";

const LoanApplicationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Typography.Title level={4}>ยอดเงินที่ต้องการ</Typography.Title>
      <Form.Item name="desiredAmount">
        <Input type="number" placeholder="Enter desired amount" />
      </Form.Item>

      <Typography.Title level={4}>จำนวนงวดผ่อนชำระ</Typography.Title>
      <Form.Item name="numberOfInstallments">
        <Input type="number" placeholder="Enter number of installments" />
      </Form.Item>

      <Typography.Title level={4}>วิธีส่งชำระ</Typography.Title>
      <Form.Item name="paymentMethod">
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="flatRate">ส่งแฟลตเรต</Radio>
            <Radio value="fixedPrincipal">ส่งเงินต้นคงที่</Radio>
            <Radio value="payOffExistingDebt">
              สางหนี้สามัญหุ่นค้ำฯ ที่มีอยู่ (ถ้ามี)
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="เหลือรับสุทธิ">
        <span id="remainingAmount">900,000 บาท</span>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          ส่งคำขอกู้
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoanApplicationForm;
