const { generateRandomOrderId } = require("../utils/GenerateOrderId");
const { generateQRCode } = require("../utils/GenerateQrCode");
const connection = require("../models/database");
const TransactionController = {
  async getAllTransferForm(req, res) {
    res.json({
      message: "success",
      transferForm: [
        {
          code: "BANK",
          name: "CHUYỂN KHOẢN NGÂN HÀNG",
          fee: 0.01,
          min: 50000,
          max: 50000000,
          img: "https://th.bing.com/th/id/OIP.fcdtm_TsVbNe8cWBLP-m9QHaHa?w=184&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        },
        {
          code: "MOMO",

          name: "MOMO",
          fee: 0.02,
          min: 20000,
          max: 5000000,
          img: "https://avatars0.githubusercontent.com/u/36770798?s=280&v=4",
        },
        {
          code: "ZALO_PAY",
          name: "ZALO PAY",
          fee: 0.025,
          min: 20000,
          max: 1000000,
          img: "https://cardtot.com/wp-content/uploads/2020/01/zalopay.png",
        },
        {
          code: "VIETTEL_PAY",
          name: "VIETTEL PAY",
          fee: 0.02,
          min: 20000,
          max: 10000000,
          img: "https://monfin.vn/images/source/Congty/viettelpay.png",
        },
        {
          code: "THE_CAO",
          name: "THẺ CÀO",
          fee: 0.25,
          min: 20000,
          max: 1000000,
          img: "https://muathe24h.vn/upload/files/445-ban-the-cao.jpg",
        },
      ],
    });
  },
  async getTransactionById(req, res) {
    try {
      const { id } = req.params;

      connection.query(
        "SELECT * FROM `transaction` WHERE id = ?",
        [id],
        async (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          const { bankOfReceiver, receiver, total } = result[0];
          res.status(200).json(result);
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async CreateTransactionInformation(req, res) {
    try {
      const { total, bankOfReceiver, receiver, description } = req.body;
      const orderId = generateRandomOrderId(10);
      connection.query(
        "INSERT INTO `transaction` (`bankOfReceiver`, `receiver`, `total`, `description`,`orderId`) VALUES (?, ?, ?, ?,?)",
        [bankOfReceiver, receiver, total, description, orderId], // Pass placeholders as an array
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          console.log("result");
          res
            .status(201)
            .json({ message: "success", orderId: result.insertId });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllTransaction(req, res) {
    try {
      connection.query("SELECT * FROM `transaction`", (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async generateQrCode(req, res) {
    try {
      const { orderId, amount, receiver, bankOfReceiver } =
        req.body;
      const qrCode = await generateQRCode(
        `orderId: ${orderId}, amount: ${amount}, receiver: ${receiver}, bankOfReceiver: ${bankOfReceiver}`
      );
      res.status(201).json({ message: "success", qrCode });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = TransactionController;
