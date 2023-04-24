import React, { useState, forwardRef, useImperativeHandle } from "react";

//MUI imports
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

const ModalForm = forwardRef(
  (
    {
      setPaymentSuccess,
      setSpinButtonVisibility,
      handlePaymentStatusVisibility,
      entryAmount,
      competitionTitle,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [choosePaymentMode, setChoosePaymentMode] = useState(true);

    useImperativeHandle(ref, () => ({
      handleClickOpen() {
        handleClickOpen();
      },
    }));

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason == "backdropClick") {
        console.log("BG CLICK");
      }
      setOpen(false);
    };

    const handleSubmit = () => {
      console.log("SUBMIT");
    };

    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{ maxWidth: "500px", margin: "0 auto" }}
        >
          <DialogTitle>ADD A CATEGORY</DialogTitle>
          <DialogContent>
            <TextField label="name" sx={{ mt: "10px", mb: "10px" }}></TextField>
          </DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <Button variant="contained" onClick={() => handleClose()}>
              CANCEL
            </Button>
            <Button variant="contained" onClick={() => handleSubmit()}>
              SUBMIT
            </Button>
          </Box>
        </Dialog>
      </>
    );
  }
);

ModalForm.displayName = "ModalForm";

export default ModalForm;
