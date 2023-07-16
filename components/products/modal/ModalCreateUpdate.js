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

// ** Custom Components Imports
import ImageUploaderSingle from "../../ImageUploaderSingle";
import { setUploadedImage } from "../../../helpers";

const ModalCreateUpdate = forwardRef(
  ({ getProducts, getCategories, categories }, ref) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [id, setId] = useState("");
    const [imgPreview, setImagePreview] = useState("");
    const [imgPath, setImgPath] = useState("");
    //const [imageError, setImageError] = useState("");

    const handleImageUpload = (file) => {
      setImagePreview(file);
      setImgPath(URL.createObjectURL(file));
    };

    useImperativeHandle(ref, () => ({
      handleClickOpen(id) {
        handleClickOpen(id);
      },
    }));

    const handleClickOpen = (id) => {
      setName("");
      setPrice("");
      setCategory("");
      setImagePreview("");
      setImgPath("");
      //setImageError("");
      setOpen(true);
      setId(id);
      if (id) {
        findDataById(id);
      }
    };

    const findDataById = async (id) => {
      const res = await productsApi.findById(id);
      if (res) {
        setName(res.name);
        setPrice(res.price);
        setCategory(res.category_id);
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
        price: price,
        category_id: category,
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
    };

    const createData = async (data) => {
      /* if (data.get("img_url") == "") {
        setImageError("Image is required");
      } */
      try {
        const response = await productsApi.create(data);

        /* if (response.status != "success") {
          return;
        } */
        await getCategories();
        await getProducts();
        setOpen(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    const updateData = async (id, data) => {
      await productsApi.update(id, data);
      await getCategories();
      await getProducts();
      setOpen(false);
    };

    const handleNameChange = (event) => {
      const inputValue = event.target.value;
      // pattern to match letters only
      const pattern = /^[a-zA-Z]*$/;
      if (pattern.test(inputValue)) {
        setName(inputValue);
      }
    };

    const handlePriceChange = (event) => {
      const inputValue = event.target.value;
      if (inputValue >= 0) {
        setPrice(inputValue);
      }
    };

    const handleCategoryChange = (event) => {
      const inputValue = event.target.value;
      setCategory(inputValue);
    };

    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{ maxWidth: "500px", margin: "0 auto" }}
        >
          <DialogTitle>{id ? "EDIT PRODUCT" : "ADD PRODUCT"}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <ImageUploaderSingle
                fileUrl={imgPath}
                file={imgPreview}
                setFile={handleImageUpload}
              />
              {/* <p style={{ color: "red" }}>{imageError}</p> */}
              <TextField
                sx={{ mt: "10px", mb: "10px" }}
                type="text"
                variant="outlined"
                color="secondary"
                label=" Name"
                onChange={handleNameChange}
                value={name}
                fullWidth
                required
              />

              <TextField
                sx={{ mt: "10px", mb: "10px" }}
                type="number"
                variant="outlined"
                color="secondary"
                label="Price"
                onChange={handlePriceChange}
                value={price}
                fullWidth
                required
              />
              {categories && (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    value={category}
                    label="Category"
                    onChange={handleCategoryChange}
                    required
                  >
                    {categories.map((category) => (
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
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
  }
);

ModalCreateUpdate.displayName = "ModalCreateUpdate";

export default ModalCreateUpdate;
