import { useEffect, useState, useRef } from "react";
import OrderItem from "./order-item";
import Button from "@mui/material/Button";
import DialogConfirmOrders from "./dialog-confirm-orders";

function OrdersPanel({
  orders,
  showTotalPrice,
  showProductDetails,
  submitOrders,
}) {
  const [dialogConfirmOrdersVisibility, setDialogConfirmOrdersVisibility] =
    useState(false);

  return (
    <>
      {console.log(
        "dialogConfirmOrdersVisibility --",
        dialogConfirmOrdersVisibility
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          /* justifyContent: "space-between", */
          width: 300,
          backgroundColor: "#add8e6",
        }}
      >
        <div>
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
        <div>
          <Button
            onClick={() => {
              setDialogConfirmOrdersVisibility(true);
            }}
          >
            PLACE ORDER
          </Button>
        </div>
      </div>

      {dialogConfirmOrdersVisibility && (
        <DialogConfirmOrders
          submitOrders={submitOrders}
          setDialogConfirmOrdersVisibility={setDialogConfirmOrdersVisibility}
        />
      )}
    </>
  );
}

export default OrdersPanel;
