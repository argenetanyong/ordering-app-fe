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

const DialogConfirmOrders = ({
  setDialogConfirmOrdersVisibility,
  submitOrders,
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setDialogConfirmOrdersVisibility(false);
    setOpen(false);
  };

  const submit = () => {
    submitOrders();
    setDialogConfirmOrdersVisibility(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ minWidth: 500 }} />
        <DialogTitle
          sx={{ minWidth: 500, textAlign: "center" }}
          id="alert-dialog-title"
        >
          PLACE ORDER?
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "300px",
              marginBottom: "20px",
            }}
          >
            <Button
              sx={{ color: "white", backgroundColor: "red" }}
              onClick={handleClose}
            >
              CANCEL
            </Button>
            <Button
              sx={{ color: "white", backgroundColor: "#00C132" }}
              onClick={submit}
            >
              CONFIRM
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogConfirmOrders;
