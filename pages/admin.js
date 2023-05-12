import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// MUI imports
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

//API Imports
import { Categrories } from "../api/fakeCategoriesService";
import { Products } from "../api/fakeProductService";

//Custom Components imports
import DialogProductDetails from "../components/dialog-product-details";
import DialogProductDetails2 from "../components/dialog-product-details-2";
import OrdersPanel from "../components/orders-panel";
import ProductsList from "../components/products/List";
import CategoriesList from "../components/categories/List";

//API imports
import productsApi from "./api/products";
import categoriesApi from "./api/categories";

const navItems = ["Home", "About", "Contact"];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  const [value, setValue] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    async function initialize() {
      /*  await getProducts();
      await getCategories(); */
    }
    initialize();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "100vh",
          marginTop: "60px",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab
            label={
              <Box>
                <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                  Products
                </Typography>
                <Box component="img" src={"https://picsum.photos/50"} />
              </Box>
            }
          />

          <Tab
            label={
              <Box>
                <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                  Categories
                </Typography>
                <Box component="img" src={"https://picsum.photos/50"} />
              </Box>
            }
          />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
            Products
          </Typography>
          <ProductsList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
            Categories
          </Typography>
          <CategoriesList />
        </TabPanel>
      </Box>
    </>
  );
}

export default Dashboard;
