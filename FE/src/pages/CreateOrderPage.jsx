import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Card, Typography, Divider, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/index.css";
import { HandleTransaction } from "../services/payment/Transaction";
import { formatCurrentcy } from "../utils/formatCurrentcy";
import Loading from "../components/Loading";

const { Content } = Layout;
const { Text, Title } = Typography;

const CreateOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    amount: 10,
    bankOfReceiver: "bankOfReceiver",
    receiver: "receiver",
    orderId: null,
    feeTransfer: null,
    feeCreateOrder: null,
    transferForm: [],
  });
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(15 * 60);
  const minutesLeft = Math.floor(time / 60);
  const secondsLeft = time % 60;

  useEffect(() => {
    if (id) {
      Promise.all([HandleTransaction.getById(id), HandleTransaction.bank()])
        .then((res) => {
          const [transaction, bank] = res;
          setData((prevData) => {
            return {
              ...prevData,
              amount: transaction.data[0].total,
              bankOfReceiver: transaction.data[0].bankOfReceiver,
              receiver: transaction.data[0].receiver,
              orderId: transaction.data[0].orderId,
              feeTransfer: transaction.data[0].feeTransfer,
              feeCreateOrder: transaction.data[0].feeCreateOrder,
              transferForm: bank.data.transferForm,
            };
          });
          setLoading(false);
        })
        .catch(() => {
          toast.error("Lỗi khi lấy thông tin đơn thanh toán!");
          setLoading(false);
        });

      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            toast.error("Đã hết giờ!");
            navigate("/list-payment");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleSelectPaymentOption = (payment) => {
    const fee = data.transferForm.find((item) => item.code === payment).fee;
    navigate("/payment-detail", {
      state: {
        payment,
        amount: data.amount,
        bankOfReceiver: data.bankOfReceiver,
        receiver: data.receiver,
        orderId: data.orderId,
        feeCreateOrder: data.feeCreateOrder,
        feeTransfer: data.feeTransfer,
        tradingFee: fee * data.amount,
      },
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Content style={{ padding: "20px" }}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} md={10}>
            <Card style={{ background: "var(--lightGrayVNPAY)" }}>
              <Title style={{ fontSize: "30px" }}>Thông tin đơn hàng</Title>
              <Divider />
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Row justify="space-between">
                  <Text style={{ minWidth: "100%" }}>Số tiền thanh toán</Text>
                  <Text
                    strong
                    className="text-vnpay"
                    style={{ fontSize: "20px" }}
                  >
                    {formatCurrentcy(data.amount, ",")}
                    <sup>VNĐ</sup>
                  </Text>
                </Row>
                <Row justify="space-between">
                  <Text style={{ minWidth: "100%" }}>Giá trị đơn hàng</Text>
                  <Text strong>
                    {formatCurrentcy(data.amount, ",")}
                    <sup>VNĐ</sup>
                  </Text>
                </Row>
                <Row justify="space-between">
                  <Text style={{ minWidth: "100%" }}>Phí giao dịch</Text>
                  <Text strong>
                    {data.feeTransfer}
                    <sup>VNĐ</sup>
                  </Text>
                </Row>
                <Row justify="space-between">
                  <Text style={{ minWidth: "100%" }}>Mã giao dịch</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {data.orderId ? data.orderId : "Loading..."}
                  </Text>
                </Row>
                <Row
                  justify="center"
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <Text strong>Giao dịch hết hạn sau</Text>
                  <div>
                    <h1>
                      {minutesLeft.toString().padStart(2, "0")}:
                      {secondsLeft.toString().padStart(2, "0")}
                    </h1>
                    {time === 0 && <p>Đã hết giờ!</p>}
                  </div>
                </Row>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={10}>
            <div style={{ background: "var(--lightGrayVNPAY)", padding: 5 }}>
              <Title style={{ fontSize: "20px", textAlign: "center" }}>
                Chọn phương thức thanh toán
              </Title>
              <Divider />
              <Space
                direction="vertical"
                size="middle"
                style={{
                  width: "100%",
                  fontWeight: "bold",
                  gap: 5,
                  background: "var(--lightGrayVNPAY)",
                }}
              >
                {data.transferForm &&
                  data.transferForm.length > 0 &&
                  data.transferForm.map((item, index) => {
                    return (
                      <div
                        onClick={() => handleSelectPaymentOption(item.code)}
                        key={index}
                        className="VNPAY_PAYMENT_OPTION"
                      >
                        <span>{item.name}</span>
                        <img
                          height={50}
                          width={50}
                          src={item.img}
                          alt="VNPAY QR"
                        />
                      </div>
                    );
                  })}
              </Space>
            </div>
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default CreateOrderPage;
