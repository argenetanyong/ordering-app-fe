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
import categoriesApi from "../../pages/api/categories";

//Custom components imports
import ModalCreateUpdate from "./modal/ModalCreateUpdate";
import ModalDelete from "./modal/ModalDelete";

import CustomPagination from "../customPagination";
import { paginate } from "../../helpers/paginate";

export default function CategoriesPage() {
  const modalCreateUpdateRef = useRef();
  const modalDeleteRef = useRef();
  const [categories, setCategories] = useState(null);
  const [paginatedCategories, setPaginatedCategories] = useState([]);
  const pageSize = 6;

  useEffect(() => {
    async function initialize() {
      await getCategories();
    }
    initialize();
  }, []);

  useEffect(() => {
    paginateData(categories, 1, pageSize);
  }, [categories]);

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

  const handlePageChange = (event, page) => {
    paginateData(categories, page, pageSize);
  };

  const paginateData = (list, page, pageSize) => {
    const data = paginate(list, page, pageSize);
    setPaginatedCategories(data);
  };

  return (
    <>
      {categories && (
        <Box sx={{ maxWidth: 500, margin: "0 auto", height: "100vh" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            {/*  <Typography>Categories</Typography> */}
            <Button variant="contained" onClick={() => handleCreate()}>
              Create
            </Button>
          </Box>
          <Box>
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
                      Name
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 900,
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedCategories.map((category) => (
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
          <CustomPagination
            itemsCount={categories.length}
            pageSize={pageSize}
            handlePageChange={handlePageChange}
          />
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
