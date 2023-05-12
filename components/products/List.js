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
/* import Pagination from "@mui/material/Pagination"; */
import Stack from "@mui/material/Stack";

//API imports
import productsApi from "../../pages/api/products";
import categoriesApi from "../../pages/api/categories";

//Custom components imports
import ModalCreateUpdate from "./modal/ModalCreateUpdate";
import ModalDelete from "./modal/ModalDelete";

export default function ProductsList() {
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
              justifyContent: "end",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            {/* <Typography>Products</Typography> */}
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
                {products.map((product) => (
                  <TableRow
                    key={product.name}
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            {/* <Pagination count={10} color="primary" /> */}
          </Box>
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
