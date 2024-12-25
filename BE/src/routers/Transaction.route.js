const TransactionController = require("../controllers/Transaction.controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Transaction Route");
});

router.get("/getAllTransaction", async (req, res) => {
  try {
    const result = await TransactionController.getAllTransaction(req, res);
    if (result) {
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getTransactionById/:id", async (req, res) => {
  try {
    const result = await TransactionController.getTransactionById(req, res);
    if (result) {
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/getAllTransferForm", async (req, res) => {
  try {
    const result = await TransactionController.getAllTransferForm(req, res);
    if (result) {
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/createTransactionInformation", async (req, res) => {
  try {
    const result = await TransactionController.CreateTransactionInformation(
      req,
      res
    );
    if (result) {
      res.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/generateQrCode", async (req, res) => {
  try {
    const result = await TransactionController.generateQrCode(req, res);
    if (result) {
      res.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
