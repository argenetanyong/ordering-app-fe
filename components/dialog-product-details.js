import { useState, forwardRef, useImperativeHandle } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const DialogProductDetails = forwardRef(({ props }, ref) => {
  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(0);

  useImperativeHandle(ref, () => ({
    handleClickOpen(product) {
      setProductDetails(product);
      handleClickOpen();
    },
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    quantity > 0 && setQuantity(quantity - 1);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{productDetails.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {productDetails.price}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            QUANTITY
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={decreaseQuantity}>
            <IndeterminateCheckBoxIcon />
          </Button>
          <DialogContentText id="alert-dialog-description">
            {quantity}
          </DialogContentText>
          <Button onClick={increaseQuantity} autoFocus>
            <AddBoxIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default DialogProductDetails;
