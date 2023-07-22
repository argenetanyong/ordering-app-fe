import { useEffect, useState, useRef } from "react";
import OrderItem from "./order-item";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          backgroundColor: "#FFE67F",
          height: "100vh",
          paddingTop: "90px",
        }}
      >
        <div style={{ marginTop: "10px", fontWeight: "900", width: "300px" }}>
          <Typography sx={{ fontWeight: "900", paddingLeft: "10px" }}>
            ORDER DETAILS:
          </Typography>
        </div>
        <div
          style={{
            height: "70vh",
            overflow: "hidden",
            overflowY: "auto",
            backgroundColor: "#FEFFDF",
          }}
        >
          {orders.map((order, index) => (
            <OrderItem
              quantity={order.quantity}
              product={order.product}
              showProductDetails={showProductDetails}
              key={index}
            />
          ))}
        </div>
        <div>
          <Typography sx={{ fontWeight: "900", paddingLeft: "10px" }}>
            TOTAL AMOUNT:{" "}
          </Typography>
        </div>
        <div
          style={{
            backgroundColor: "#FEF2C2",
            width: "100%",
            maxWidth: "280px",
            margin: "10px auto ",
            padding: "10px",
          }}
        >
          <Typography sx={{ fontWeight: "900", textAlign: "right" }}>
            {"$"}
            {showTotalPrice()}
          </Typography>{" "}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{
              color: "white",
              backgroundColor: "#00C132",
            }}
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
