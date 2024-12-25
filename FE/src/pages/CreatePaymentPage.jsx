import React, { useState } from "react";
import { Form, Input, Button, Select, Radio, Switch } from "antd";
import {
  DownOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { formatCurrentcy } from "../utils/formatCurrentcy";
import { HandleTransaction } from "../services/payment/Transaction";
import Loading from "../components/Loading";

const CreatePaymentPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const HandleTransactionAfterClick = async () => {
    setLoading(true);
    const { amount, bank, accountNumber, description } = form.getFieldsValue();
    if (!amount || !bank || !accountNumber) {
      setLoading(false);
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    const total = parseInt(amount.replaceAll(",", ""));
    const result = await HandleTransaction.information(
      total,
      bank,
      accountNumber,
      description
    );
    if (result["status"] !== 201) {
      setLoading(false);
      toast.error("Tạo đơn chuyển tiền thất bại!");
      return;
    }
    setLoading(false);
    toast.success("Tạo đơn chuyển tiền thành công!");
    navigate(`/create-order/${result["data"]["orderId"]}`);
  };
  return loading ? (
    <Loading />
  ) : (
    <div
      style={{
        maxWidth: "100vw",
        background: "var(--lightGray)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        className="form"
        onFinish={HandleTransactionAfterClick}
      >
        <div style={{ fontWeight: "bold" }}>CHUYỂN TIỀN ĐẾN</div>
        <div className="form-group">
          <Form.Item
            name="bank"
            className="form-item"
            rules={[{ required: true, message: "Vui lòng chọn ngân hàng" }]}
          >
            <Select
              suffixIcon={
                <DownOutlined style={{ color: "var(--yellowColor)" }} />
              }
              placeholder="Chọn ngân hàng"
              className="none-border"
            >
              <Select.Option value="MBAPP">MBAPP</Select.Option>
              <Select.Option value="VNPAYQR">VNPAYQR</Select.Option>
              <Select.Option value="VNBANK">VNBANK</Select.Option>
              <Select.Option value="IB">IB</Select.Option>
              <Select.Option value="ATM">ATM</Select.Option>
              <Select.Option value="INTCARD">INTCARD</Select.Option>
              <Select.Option value="VISA">VISA</Select.Option>
              <Select.Option value="MASTERCARD">MASTERCARD</Select.Option>
              <Select.Option value="JCB">JCB</Select.Option>
              <Select.Option value="UPI">UPI</Select.Option>
              <Select.Option value="VIB">VIB</Select.Option>
              <Select.Option value="VIETCAPITALBANK">
                VIETCAPITALBANK
              </Select.Option>
              <Select.Option value="SCB">SCB</Select.Option>
              <Select.Option value="NCB">NCB</Select.Option>
              <Select.Option value="SACOMBANK">SACOMBANK</Select.Option>
              <Select.Option value="EXIMBANK">EXIMBANK</Select.Option>
              <Select.Option value="MSBANK">MSBANK</Select.Option>
              <Select.Option value="NAMABANK">NAMABANK</Select.Option>
              <Select.Option value="VNMART">VNMART</Select.Option>
              <Select.Option value="VIETINBANK">VIETINBANK</Select.Option>
              <Select.Option value="VIETCOMBANK">VIETCOMBANK</Select.Option>
              <Select.Option value="HDBANK">HDBANK</Select.Option>
              <Select.Option value="DONGABANK">DONGABANK</Select.Option>
              <Select.Option value="TPBANK">TPBANK</Select.Option>
              <Select.Option value="OCEANBANK">OCEANBANK</Select.Option>
              <Select.Option value="BIDV">BIDV</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div className="form-group">
          <Form.Item
            className="form-item"
            name="accountNumber"
            rules={[{ required: true, message: "Vui lòng nhập số tài khoản" }]}
          >
            <Input
              className="none-border"
              placeholder="Số tài khoản ..."
              style={{ border: "none" }}
            />
          </Form.Item>
          <TeamOutlined
            style={{ color: "var(--yellowColor)", fontSize: "20px" }}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", maxWidth: 600 }}
        >
          <Form.Item name="saveAccount" valuePropName="checked">
            <span
              style={{
                marginRight: "8px",
                fontWeight: "bold",
                color: "var(--textGray)",
              }}
            >
              Lưu tài khoản vào danh bạ
            </span>
            <Switch />
          </Form.Item>
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          <div className="form-group">
            <Form.Item
              className="form-item"
              name="amount"
              rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
            >
              <Input placeholder="Số tiền VND..." style={{ border: "none" }} />
            </Form.Item>
            <span
              style={{
                marginRight: "8px",
                color: "var(--yellowColor)",
                fontWeight: "bold",
              }}
            >
              Hạn mức
            </span>
            <QuestionCircleOutlined
              style={{ color: "var(--yellowColor)", fontSize: "20px" }}
            />
          </div>
          <Radio.Group className="radio-group">
            {[
              100000, 200000, 300000, 500000, 1000000, 2000000, 3000000,
              5000000,
            ].map((amount) => (
              <Radio.Button
                key={amount}
                value={amount}
                className="radio-button"
                onClick={() =>
                  form.setFieldsValue({
                    amount: formatCurrentcy(amount, ","),
                  })
                }
              >
                <span
                  style={{
                    color: "var(--textGray)",
                    fontWeight: "bold",
                  }}
                >
                  {amount.toLocaleString()} VND
                </span>
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <div
          className="form-group"
          style={{ border: "var(--lightGray) solid 1px", borderRadius: 5 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 8,
              background: "white",
            }}
          >
            <span style={{ color: "var(--textGray)" }}>
              Nội dung chuyển tiền
            </span>
            <Form.Item
              name="description"
              rules={[
                {
                  // required: true,
                  message: "Vui lòng nhập nội dung chuyển tiền",
                },
              ]}
              className="form-item"
            >
              <Input.TextArea
                placeholder="Nhập nội dung chuyển tiền"
                autoSize={{ minRows: 2 }}
                style={{ padding: 0 }}
                className="none-border"
              />
            </Form.Item>

            <div
              style={{
                marginBottom: 16,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {[
                "mua hàng",
                "chúc mừng",
                "cafe",
                "ăn trưa",
                "ăn tối",
                "trả nợ",
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  type="link"
                  onClick={() =>
                    form.setFieldsValue({
                      description: `${suggestion}`,
                    })
                  }
                  style={{
                    padding: 8,
                    background: "white",
                    color: "black",
                    border: "black solid 1px",
                    borderRadius: 50,
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <Button
          onClick={() => HandleTransactionAfterClick()}
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          Chuyển tiền
        </Button>
      </Form>
    </div>
  );
};

export default CreatePaymentPage;
