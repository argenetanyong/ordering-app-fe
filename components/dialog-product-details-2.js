import { useState, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import Typography from "@mui/material/Typography";
import ImageWithFallback from "./ImageWithFallback";
import config from "../configs";

import noImage from "../public/images/no-image.png";

const DialogProductDetails = ({
  selectedProduct,
  selectedProductQuantity,
  setProductDetailsDialogVisibility,
  addToOrders,
  removeOrder,
}) => {
  const [open, setOpen] = useState(true);
  const [quantity, setQuantity] = useState(selectedProductQuantity);

  const handleClose = () => {
    setProductDetailsDialogVisibility(false);
    setOpen(false);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    quantity > 0 && setQuantity(quantity - 1);
  };

  const submit = () => {
    quantity > 0
      ? addToOrders(selectedProduct, quantity)
      : removeOrder(selectedProduct);
  };

  const imageLoader = ({ src, width }) => {
    return `${src}?w=${width}`;
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box style={{ minWidth: 500 }} />
        <DialogTitle id="alert-dialog-title"></DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "50px",
            }}
          >
            <Typography variant="h5"> {selectedProduct.name}</Typography>
            <Typography variant="h5">
              {"$"}
              {selectedProduct.price}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <ImageWithFallback
              loader={imageLoader}
              src={`${config.apiBaseUrl}/${selectedProduct.img_url}`}
              fallbackSrc={`${config.apiBaseUrl}/images/no-image.png`}
              alt={selectedProduct.name}
              width={100}
              height={100}
            />
          </Box>
        </DialogContent>

        <Box>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            QUANTITY
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Button onClick={decreaseQuantity}>
              <IndeterminateCheckBoxIcon sx={{ fontSize: "40px" }} />
            </Button>

            <Typography variant="h6" sx={{ textAlign: "center" }}>
              {quantity}
            </Typography>

            <Button onClick={increaseQuantity} autoFocus>
              <AddBoxIcon sx={{ fontSize: "40px" }} />
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "300px",
            margin: "0 auto 20px",
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={handleClose}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#00C132" }}
            onClick={submit}
          >
            SUBMIT
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};

export default DialogProductDetails;
