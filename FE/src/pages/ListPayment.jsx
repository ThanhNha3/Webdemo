import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { HandleTransaction } from "../services/payment/Transaction";
import { formatCurrentcy } from "../utils/formatCurrentcy";
import Loading from "../components/Loading";

const ListPayment = () => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã giao dịch",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Số tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Ngân hàng người thụ hưởng",
      dataIndex: "bankOfReceiver",
      key: "bankOfReceiver",
    },
    {
      title: "Số tài khoản của người thụ hưởng",
      dataIndex: "receiver",
      key: "receiver",
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    HandleTransaction.getAll()
      .then((res) => {
        const newData = res.data.map((item) => {
          return {
            ...item,
            total: `${formatCurrentcy(item.total, ",")} VNĐ`,
          };
        });
        setData(newData);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Lỗi khi lấy dữ liệu!");
        setLoading(false);
        throw new Error("Lỗi khi lấy dữ liệu!");
      });
  }, []);

  const handleRowClick = (record) => {
    navigate(`/create-order/${record.id}`);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="list-payment-container container">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => {
              handleRowClick(record);
            },
          };
        }}
      />
    </div>
  );
};

export default ListPayment;
