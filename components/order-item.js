import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function OrderItem({ quantity, showProductDetails, product }) {
  return (
    <>
      <div
        style={{
          width: "100%",
          maxWidth: "280px",
          backgroundColor: "#FEF2C2",
          cursor: "pointer",
          margin: "10px auto ",
          padding: "10px",
        }}
        onClick={() => {
          showProductDetails(product);
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>
            {quantity}
            {"x"} {product.name} {"$"}
            {product.price}
          </Typography>

          <Typography>
            {"$"}
            {product.price * quantity}
          </Typography>
        </Box>
      </div>
    </>
  );
}

export default OrderItem;
