import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Divider,
  Space,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/index.css";
import { HandleTransaction } from "../services/payment/Transaction";
import { formatCurrentcy } from "../utils/formatCurrentcy";
import Loading from "../components/Loading";

const { Text, Title } = Typography;

const PaymentDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    payment,
    amount,
    bankOfReceiver,
    receiver,
    orderId,
    feeCreateOrder,
    tradingFee,
  } = location.state;
  const [data, setData] = useState({
    amount: amount,
    QrCode: "",
    bankOfReceiver: bankOfReceiver,
    receiver: receiver,
    orderId: null,
    feeTransfer: 0,
    transferForm: [],
    fee: 0,
  });

  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(15 * 60);
  const minutesLeft = Math.floor(time / 60);
  const secondsLeft = time % 60;

  useEffect(() => {
    HandleTransaction.generateQrCode(orderId, amount, receiver, bankOfReceiver)
      .then((res) => {
        setData((prevData) => {
          return { ...prevData, QrCode: res.data.qrCode };
        });
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Lỗi khi lấy mã QR!");
      });
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval); // Dừng khi hết giờ
          toast.error("Đã hết giờ!");
          navigate("/list-payment");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ padding: "20px" }}>
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
                  <Text style={{ minWidth: "100%" }}>Số tài khoản</Text>
                  <Text
                    strong
                    className="text-vnpay"
                    style={{ fontSize: "20px" }}
                  >
                    {receiver || "Loading..."}
                  </Text>
                  <Text style={{ minWidth: "100%" }}>Ngân hàng</Text>
                  <Text
                    strong
                    className="text-vnpay"
                    style={{ fontSize: "20px" }}
                  >
                    {bankOfReceiver || "Loading..."}
                  </Text>
                </Row>
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
                  <Text style={{ minWidth: "100%" }}>THANH TOÁN QUA</Text>
                  <Text
                    strong
                    className="text-vnpay"
                    style={{ fontSize: "20px" }}
                  >
                    {payment || "Loading..."}
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
                    {formatCurrentcy(tradingFee, ",")}
                    <sup>VNĐ</sup>
                  </Text>
                </Row>
                <Row justify="space-between">
                  <Text style={{ minWidth: "100%" }}>Phí tạo lệnh</Text>
                  <Text strong>
                    {formatCurrentcy(feeCreateOrder, ",")}
                    <sup>VNĐ</sup>
                  </Text>
                </Row>
                <Row justify="space-between">
                  <Text style={{ minWidth: "100%" }}>Phí chuyển tiền</Text>
                  <Text strong>
                    {formatCurrentcy(tradingFee, ",")}
                    <sup>VNĐ</sup>
                  </Text>
                </Row>
                <Row justify="space-between">
                  <Text style={{ minWidth: "100%" }}>Mã đơn hàng</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {orderId || "Loading..."}
                  </Text>
                </Row>
                <Row
                  justify="center"
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <Text strong>Giao dịch hết hạn sau</Text>
                  <div>
                    <h1>
                      {minutesLeft}:
                      {secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
                    </h1>
                    {time === 0 && <p>Đã hết giờ!</p>}
                  </div>
                </Row>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={10}>
            <div
              style={{
                background: "var(--lightGrayVNPAY)",
                padding: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Title style={{ fontSize: "20px", textAlign: "center" }}>
                Quét mã qua ứng dụng Ngân hàng/ Ví điện tử
              </Title>
              <Divider />
              <img src={data.QrCode} />
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", marginTop: 10 }}
                onClick={() => {
                  toast.success("Hủy thanh toán thành công");
                  navigate(-1);
                }}
              >
                Hủy thanh toán
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PaymentDetailPage;
