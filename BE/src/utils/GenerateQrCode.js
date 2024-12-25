const QRCode = require("qrcode");

async function generateQRCode(text) {
  try {
    const qrCodeBase64 = await QRCode.toDataURL(text);
    return qrCodeBase64;
  } catch (err) {
    throw new Error(err || "Error generating QR code");
  }
}

module.exports = { generateQRCode };
