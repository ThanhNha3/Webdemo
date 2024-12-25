import axios from "axios";
import { transaction } from "../../constants/APIs/transaction";

const HandleTransaction = {
  getAll: async () => {
    return axios.get(
      `${import.meta.env.VITE_API_BASE_URL}${transaction.getAll.url}`
    );
  },
  getById: async (id) => {
    return axios.get(
      `${import.meta.env.VITE_API_BASE_URL}${transaction.getById.url}/${id}`
    );
  },
  bank: async () => {
    console.log(`${import.meta.env.VITE_API_BASE_URL}${transaction.bank.url}`)
    return axios.get(
      `${import.meta.env.VITE_API_BASE_URL}${transaction.bank.url}`
    );
  },
  information: async (total, bankOfReceiver, receiver, description) => {
    return axios.post(
      `${import.meta.env.VITE_API_BASE_URL}${transaction.information.url}`,
      {
        total,
        bankOfReceiver: bankOfReceiver,
        receiver: receiver,
        description: description,
      }
    );
  },

  generateQrCode: async (
    orderId,
    amount,
    receiver,
    bankOfReceiver,
    description
  ) => {
    return axios.post(`http://localhost:3000/transaction/generateQrCode`, {
      orderId,
      amount,
      receiver,
      bankOfReceiver,
      description,
    });
  },
};

export { HandleTransaction };
