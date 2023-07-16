import React, { useState, forwardRef, useImperativeHandle } from "react";

//MUI imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

//API imports
import categoriesApi from "../../../pages/api/categories";
import orderDetailsApi from "../../../pages/api/orderDetails";

// ** Custom Components Imports
import { setUploadedImage } from "../../../helpers";

const ModalForm = forwardRef(({ getCategories }, ref) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [imgPreview, setImagePreview] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);

  const handleImageUpload = (file) => {
    setImagePreview(file);
    setImgPath(URL.createObjectURL(file));
  };

  useImperativeHandle(ref, () => ({
    handleClickOpen(id) {
      handleClickOpen(id);
    },
  }));

  const handleClickOpen = (id, orderDetails) => {
    setName("");
    setOpen(true);
    setId(id);
    getOrderDetails(id);
    if (id) {
      findDataById(id);
    }
  };

  const getOrderDetails = async (id) => {
    try {
      const response = await orderDetailsApi.findByOrderId(id);
      {
        console.log("MODAL ORDER DETAILS  - ", response);
      }
      setOrderDetails(response);
    } catch (error) {}
  };

  const findDataById = async (id) => {
    const res = await categoriesApi.findById(id);
    if (res) {
      setName(res.name);
      setImgPath(setUploadedImage(res.img_url));
    }
  };

  const handleClose = (event, reason) => {
    if (reason == "backdropClick") {
    }
    setImagePreview("");
    setImgPath("");
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: name,
      img_url: imgPreview,
    };

    let formData = new FormData();
    for (const property in data) {
      formData.append(property, data[property]);
    }

    if (id) {
      updateData(id, formData);
    } else {
      createData(formData);
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
        sx={{ maxWidth: "700px", margin: "0 auto" }}
      >
        <DialogTitle>{`Order# ${id}`}</DialogTitle>
        <Box>
          {orderDetails && (
            <TableContainer component={Paper}>
              <Table
                aria-label="simple table"
                sx={{ minWidth: 500, minHeight: 450 }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 900,
                      }}
                    >
                      Item
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 900,
                      }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 900,
                      }}
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 900,
                      }}
                    >
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetails.map((order, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="order">
                        {order.product_name}
                      </TableCell>
                      <TableCell component="th" scope="order">
                        {order.product_price}
                      </TableCell>
                      <TableCell component="th" scope="order">
                        {order.quantity}
                      </TableCell>
                      <TableCell align="right">
                        {order.product_price * order.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Dialog>
    </>
  );
});

ModalForm.displayName = "ModalForm";

export default ModalForm;
