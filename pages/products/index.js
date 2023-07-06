import { useEffect, useState, useRef } from "react";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//API imports
import productsApi from "../api/products";
import categoriesApi from "../api/categories";

//Custom components imports
import ModalCreateUpdate from "../../components/products/modal/ModalCreateUpdate";
import ModalDelete from "../../components/products/modal/ModalDelete";

export default function BasicTable() {
  const modalCreateUpdateRef = useRef();
  const modalDeleteRef = useRef();
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    async function initialize() {
      await getProducts();
      await getCategories();
    }
    initialize();
  }, []);

  const getProducts = async () => {
    try {
      const result = await productsApi.list();
      setProducts(result);
    } catch (error) {
      console.log("Error while fetching products data ", error);
    }
  };

  const getCategories = async () => {
    try {
      const result = await categoriesApi.list();
      setCategories(result);
    } catch (error) {
      console.log("Error while fetching categories data ", error);
    }
  };

  const displayCategoryName = (id) => {
    const category = categories.filter((c) => c.id === id);
    return category[0].name;
  };

  const handleCreate = () => {
    modalCreateUpdateRef.current.handleClickOpen(null);
  };

  const handleUpdate = (id) => {
    modalCreateUpdateRef.current.handleClickOpen(id);
  };

  const handleDelete = async (id) => {
    await productsApi.remove(id);
    await getProducts();
    await getCategories();
  };

  const handleOpenModaleDelete = async (id) => {
    modalDeleteRef.current.handleClickOpen(id);
  };

  return (
    <>
      {products && categories && (
        <Box sx={{ maxWidth: 800, margin: "0 auto", height: "100vh" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <Typography>Products</Typography>
            <Button variant="contained" onClick={() => handleCreate()}>
              Create
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="products">
                      {product.name}
                    </TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">
                      {displayCategoryName(product.category_id)}
                    </TableCell>
                    <TableCell align="right">
                      <ModeEditIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleUpdate(product.id)}
                      />
                      <ClearIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleOpenModaleDelete(product.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <ModalCreateUpdate
        ref={modalCreateUpdateRef}
        getCategories={getCategories}
        getProducts={getProducts}
        categories={categories}
      />

      <ModalDelete
        ref={modalDeleteRef}
        getCategories={getCategories}
        getProducts={getProducts}
        categories={categories}
        handleDelete={handleDelete}
      />
    </>
  );
}
