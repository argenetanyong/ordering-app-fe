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
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

//API imports
import categoriesApi from "../api/categories";

//Custom components imports
import ModalCreateUpdate from "../../components/categories/modal/ModalCreateUpdate";
import ModalDelete from "../../components/categories/modal/ModalDelete";

export default function CategoriesPage() {
  const modalCreateUpdateRef = useRef();
  const modalDeleteRef = useRef();
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    async function initialize() {
      await getCategories();
    }
    initialize();
  }, []);

  const getCategories = async () => {
    try {
      const result = await categoriesApi.list();
      setCategories(result);
    } catch (error) {
      console.log("Error while fetching categories data ", error);
    }
  };

  const handleCreate = () => {
    modalCreateUpdateRef.current.handleClickOpen(null);
  };

  const handleUpdate = (id) => {
    modalCreateUpdateRef.current.handleClickOpen(id);
  };

  const handleDelete = async (id) => {
    await categoriesApi.remove(id);
    await getCategories();
  };

  const handleOpenModaleDelete = async (id) => {
    modalDeleteRef.current.handleClickOpen(id);
  };

  return (
    <>
      {categories && (
        <Box sx={{ maxWidth: 500, margin: "0 auto", height: "100vh" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <Typography>Categories</Typography>
            <Button variant="contained" onClick={() => handleCreate()}>
              Create
            </Button>
          </Box>
          <Box>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow
                      key={category.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="categorys">
                        {category.name}
                      </TableCell>
                      <TableCell align="right">
                        <ModeEditIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleUpdate(category.id)}
                        />
                        <ClearIcon
                          sx={{ cursor: "pointer" }}
                          /*  onClick={() => handleDelete(category.id)} */
                          onClick={() => handleOpenModaleDelete(category.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}

      <ModalCreateUpdate
        ref={modalCreateUpdateRef}
        getCategories={getCategories}
      />

      <ModalDelete ref={modalDeleteRef} handleDelete={handleDelete} />
    </>
  );
}
