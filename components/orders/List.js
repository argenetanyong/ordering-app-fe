import { useEffect, useState, useRef } from "react";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

//API imports
import ordersApi from "../../pages/api/orders";
import orderDetailsApi from "../../pages/api/orderDetails";

//Custom components imports
import ModalOrderDetails from "./modal/ModalOrderDetails";

import CustomPagination from "../customPagination";
import { paginate } from "../../helpers/paginate";

export default function CategoriesPage() {
  const modalOrderDetailsRef = useRef();
  const [orders, setOrders] = useState(null);
  const [paginatedOrders, setPaginatedOrders] = useState([]);
  const pageSize = 6;

  useEffect(() => {
    async function initialize() {
      await getCategories();
    }
    initialize();
  }, []);

  useEffect(() => {
    paginateData(orders, 1, pageSize);
  }, [orders]);

  const getCategories = async () => {
    try {
      const response = await ordersApi.list();
      setOrders(response);
    } catch (error) {
      console.log("Error while fetching orders data ", error);
    }
  };

  const handleCreate = () => {};

  const handleUpdate = (id) => {};

  const handleViewDetails = (id) => {
    modalOrderDetailsRef.current.handleClickOpen(id);
  };

  const handleDelete = async (id) => {
    await ordersApi.remove(id);
    await getCategories();
  };

  const handleOpenModaleDelete = async (id) => {};

  const handlePageChange = (event, page) => {
    paginateData(orders, page, pageSize);
  };

  const paginateData = (list, page, pageSize) => {
    const data = paginate(list, page, pageSize);
    setPaginatedOrders(data);
  };

  return (
    <>
      {orders && (
        <Box sx={{ maxWidth: 500, margin: "0 auto", height: "100vh" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "center",
              margin: "20px 0",
            }}
          ></Box>
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
                      ID
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 900,
                      }}
                    >
                      Order Date
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 900,
                      }}
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 900,
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedOrders.map((order, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="order">
                        {order.id}
                      </TableCell>
                      <TableCell component="th" scope="order">
                        {order.order_date}
                      </TableCell>
                      <TableCell component="th" scope="order">
                        {order.total_amount}
                      </TableCell>
                      <TableCell align="right">
                        <VisibilityIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleViewDetails(order.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <CustomPagination
            itemsCount={orders.length}
            pageSize={pageSize}
            handlePageChange={handlePageChange}
          />
        </Box>
      )}

      <ModalOrderDetails
        ref={modalOrderDetailsRef}
        getCategories={getCategories}
      />
    </>
  );
}
