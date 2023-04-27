import React, { useState, forwardRef, useImperativeHandle } from "react";

//MUI imports
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

//API imports
import categoriesApi from "../../../pages/api/categories";

const ModalForm = forwardRef(({ getCategories }, ref) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  useImperativeHandle(ref, () => ({
    handleClickOpen(id) {
      handleClickOpen(id);
    },
  }));

  const handleClickOpen = (id) => {
    setName("");
    setOpen(true);
    setId(id);
    if (id) {
      findDataById(id);
    }
  };

  const findDataById = async (id) => {
    const res = await categoriesApi.findById(id);
    if (res) {
      setName(res.name);
    }
  };

  const handleClose = (event, reason) => {
    if (reason == "backdropClick") {
      console.log("BG CLICK");
    }
    setOpen(false);
  };

  const createData = async (data) => {
    await categoriesApi.create(data);
    getCategories();
  };

  const updateData = async (id, data) => {
    await categoriesApi.update(id, data);
    getCategories();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { name: name };
    if (id) {
      updateData(id, data);
    } else {
      createData(data);
    }

    setOpen(false);
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    // pattern to match letters only
    const pattern = /^[a-zA-Z]*$/;
    if (pattern.test(inputValue)) {
      setName(inputValue);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <DialogTitle>{id ? "EDIT CATEGORY" : "ADD CATEGORY"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ mt: "10px", mb: "10px" }}
              type="text"
              variant="outlined"
              color="secondary"
              label=" Name"
              onChange={handleChange}
              value={name}
              fullWidth
              required
            />

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
              <Button variant="contained" type="submit">
                SUBMIT
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
});

ModalForm.displayName = "ModalForm";

export default ModalForm;
