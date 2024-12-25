import React from "react";
import { Button } from "antd";
import { toast } from "react-toastify";

import BANNER from "../../public/assets/images/banner.png";

const IntroducePage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="container">
        <img
          src={BANNER}
          alt="Banner"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>

      <Button
        type="primary"
        style={{ marginTop: 20 }}
        onClick={() => {
          toast.error("Chức năng này đang được phát triển");
        }}
      >
        Tạo link ngay
      </Button>
    </div>
  );
};

export default IntroducePage;
