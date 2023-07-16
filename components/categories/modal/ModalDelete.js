import React, { useState, forwardRef, useImperativeHandle } from "react";

//MUI imports
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
//API imports
import categoriesApi from "../../../pages/api/categories";
import productsApi from "../../../pages/api/products";

const ModalDelete = forwardRef(({ handleDelete }, ref) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [isCategoryInUse, setIsCategoryInUse] = useState("");

  useImperativeHandle(ref, () => ({
    handleClickOpen(id) {
      handleClickOpen(id);
    },
  }));

  const handleClickOpen = (id) => {
    setName("");
    setPrice("");
    setCategory("");
    setOpen(true);
    setId(id);
    checkCategoryOnProducts(id);
    //findDataById(id);
  };

  const findDataById = async (id) => {
    const response = await categoriesApi.findById(id);
    if (response) {
      setName(response.name);
      setPrice(response.price);
      setCategory(response.category_id);
    }
  };

  const checkCategoryOnProducts = async (id) => {
    const response = await productsApi.findByCategoryId(id);
    if (response.length > 0) {
      setIsCategoryInUse(true);
    } else {
      await findDataById(id);
      setIsCategoryInUse(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason == "backdropClick") {
    }
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    handleDelete(id);
    setOpen(false);
  };

  const displayDialogTitle = () => {
    if (isCategoryInUse) {
      return `YOU CAN NOT DELETE THIS CATEGORY. 
      IT IS CURRENTLY IN USED.`;
    }

    return `ARE YOU SURE YOU WANT TO DELETE 
      ${name.toUpperCase()}?`;
  };

  const displayButtons = () => {
    if (isCategoryInUse) {
      return (
        <>
          <Button variant="contained" onClick={() => handleClose()}>
            OK
          </Button>
        </>
      );
    }

    return (
      <>
        <Button variant="contained" onClick={() => handleClose()}>
          CANCEL
        </Button>
        <Button
          variant="contained"
          type="submit"
          onClick={() => handleSubmit()}
        >
          SUBMIT
        </Button>
      </>
    );
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          {displayDialogTitle()}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: isCategoryInUse ? "center" : "space-between",
              alignItems: "center",
              margin: "20px",
            }}
          >
            {displayButtons()}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
});

ModalDelete.displayName = "ModalDelete";

export default ModalDelete;
