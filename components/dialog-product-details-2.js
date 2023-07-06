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
        <DialogTitle id="alert-dialog-title">
          {selectedProduct.name}
        </DialogTitle>

        <ImageWithFallback
          loader={imageLoader}
          src={`${config.apiBaseUrl}/${selectedProduct.img_url}`}
          fallbackSrc={`${config.apiBaseUrl}/images/no-image.png`}
          alt={selectedProduct.name}
          width={100}
          height={100}
        />

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            PRICE: {selectedProduct.price}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Box>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ textAlign: "center" }}
            >
              QUANTITY
            </DialogContentText>
            <Box sx={{ display: "flex" }}>
              <Button onClick={decreaseQuantity}>
                <IndeterminateCheckBoxIcon />
              </Button>
              <DialogContentText id="alert-dialog-description">
                {quantity}
              </DialogContentText>
              <Button onClick={increaseQuantity} autoFocus>
                <AddBoxIcon />
              </Button>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Button onClick={handleClose}>CANCEL</Button>
              <Button onClick={submit}>SUBMIT</Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogProductDetails;
