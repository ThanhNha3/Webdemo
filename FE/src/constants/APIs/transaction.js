const transaction = {
  getAll: {
    method: "GET",
    url: "/transaction/getAllTransaction",
  },
  getById: {
    method: "GET",
    url: "/transaction/getTransactionById",
  },
  bank: {
    method: "GET",
    url: "/transaction/getAllTransferForm",
  },
  information: {
    method: "POST",
    url: "/transaction/createTransactionInformation",
  },
  generateQrCode: {
    method: "POST",
    url: "/transaction/generateQrCode",
  },
};

export { transaction };