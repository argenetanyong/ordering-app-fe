import OrderItem from "./order-item";

function OrdersPanel({ orders, showTotalPrice, showProductDetails }) {
  return (
    <>
      <div style={{ width: 300, backgroundColor: "#add8e6" }}>
        <div style={{ marginTop: "10px", fontWeight: "900" }}> Orders:</div>
        {orders.map((order, index) => (
          <OrderItem
            quantity={order.quantity}
            product={order.product}
            showProductDetails={showProductDetails}
            key={index}
          />
        ))}
        <div style={{ fontWeight: "900" }}> Total amount:</div>
        <div style={{ backgroundColor: "DodgerBlue" }}>
          {"  Php"} {showTotalPrice()}{" "}
        </div>
      </div>
    </>
  );
}

export default OrdersPanel;
