const Loading = () => {
  return (
    <div
      className="loading"
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#4285F4",
      }}
    >
      <div className="loading-animation"></div>
      <p className="loading-text">Hệ thống đang xử lí, bạn đợi chút nhé!</p>
    </div>
  );
};

export default Loading;
