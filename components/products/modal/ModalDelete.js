import React, { useState, forwardRef, useImperativeHandle } from "react";

//MUI imports
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

//API imports
import productsApi from "../../../pages/api/products";

const ModalDelete = forwardRef(
  ({ getProducts, getCategories, categories, handleDelete }, ref) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [id, setId] = useState("");

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
      if (id) {
        findDataById(id);
      }
    };

    const findDataById = async (id) => {
      const res = await productsApi.findById(id);
      console.log("res -- ", res);
      if (res) {
        setName(res.name);
        setPrice(res.price);
        setCategory(res.category_id);
      }
    };

    const handleClose = (event, reason) => {
      if (reason == "backdropClick") {
        console.log("BG CLICK");
      }
      setOpen(false);
    };

    const createData = async (data) => {
      await productsApi.create(data);
      await getCategories();
      await getProducts();
    };

    const updateData = async (id, data) => {
      await productsApi.update(id, data);
      await getCategories();
      await getProducts();
    };

    const handleSubmit = async (event) => {
      handleDelete(id);
      setOpen(false);
    };

    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{ maxWidth: "500px", margin: "0 auto" }}
        >
          <DialogTitle sx={{ textAlign: "center" }}>
            {`ARE YOU SURE YOU WANT TO DELETE 
            `}
            {`${name.toUpperCase()}?`}
          </DialogTitle>
          <DialogContent>
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
              <Button
                variant="contained"
                type="submit"
                onClick={() => handleSubmit()}
              >
                SUBMIT
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
);

ModalDelete.displayName = "ModalDelete";

export default ModalDelete;
