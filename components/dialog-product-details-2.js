import { useState, forwardRef, useImperativeHandle } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const DialogProductDetails = ({
  selectedProduct,
  selectedProductQuantity,
  setProductDetailsDialogVisibility,
  addToOrders,
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
      : console.log("NO ORDERS");
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
              <Button onClick={submit}>ADD</Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogProductDetails;
