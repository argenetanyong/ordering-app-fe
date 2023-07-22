import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

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

import { setUploadedImage } from "../helpers";
import config from "../configs";

//Custom Components imports
import DialogProductDetails from "../components/dialog-product-details";
import DialogProductDetails2 from "../components/dialog-product-details-2";
import OrdersPanel from "../components/orders-panel";
import ImageWithFallback from "../components/ImageWithFallback.js";

//API imports
import productsApi from "./api/products";
import categoriesApi from "./api/categories";
import ordersApi from "./api/orders";
import orderDetailsApi from "./api/orderDetails";

import noImage from "../public/images/no-image.png";

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
        <Box
          sx={{ p: 3, height: "100vh", overflow: "auto", paddingTop: "100px" }}
        >
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
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);
  const [productDetailsDialogVisibility, setProductDetailsDialogVisibility] =
    useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const dialogProductDetailsRef = useRef();

  useEffect(() => {
    async function initialize() {
      const productResponse = await getProducts();
      const categoriesResponse = await getCategories();

      if (productResponse && categoriesResponse) {
        filterProducts(0, categoriesResponse, productResponse);
      }
    }
    initialize();
  }, []);

  const getProducts = async () => {
    try {
      const result = await productsApi.list();
      setProducts(result);
      return result;
    } catch (error) {
      console.log("Error while fetching products data ", error);
    }
  };

  const getCategories = async () => {
    try {
      const result = await categoriesApi.list();
      //console.log("CATEGORIES API LIST RESULT-> ", result);
      setCategories(result);
      return result;
    } catch (error) {
      console.log("Error while fetching categories data ", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    filterProducts(newValue, categories, products);
  };

  const filterProducts = (categoryIndex, categories, products) => {
    const filteredProducts = products.filter(
      (p) => categories[categoryIndex].id === p.category_id
    );
    setFilteredProducts(filteredProducts);
  };

  const displayHeader = (headerName) => {
    return (
      <div>
        <Typography
          component={"span"}
          sx={{
            fontSize: "24px",
            fontWeight: "600",
            textTransform: "uppercase",
          }}
        >
          {headerName}
        </Typography>
      </div>
    );
  };

  const imageLoader = ({ src, width }) => {
    return `${src}?w=${width}`;
  };

  const ProductCard = (product) => {
    return (
      <Card
        sx={{
          width: 300,
          height: 200,
          margin: 2,
          cursor: "pointer",
        }}
        onClick={() => showProductDetails(product)}
      >
        <CardContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ImageWithFallback
              loader={imageLoader}
              src={`${config.apiBaseUrl}/${product.img_url}`}
              fallbackSrc={`${config.apiBaseUrl}/images/no-image.png`}
              alt={product.name}
              width={100}
              height={100}
            />
          </div>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="h6">
            {"$"}
            {product.price}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const showProductDetails = (product) => {
    setSelectedProduct(product);
    const isProductExisting = orders.find(
      (order) => order.product.id == product.id
    );
    setSelectedProductQuantity(
      isProductExisting ? isProductExisting.quantity : 0
    );
    setProductDetailsDialogVisibility(true);
  };

  const addToOrders = (product, quantity) => {
    const copyOfOrdersArray = orders;
    const isProductExisting = copyOfOrdersArray.find(
      (order) => order.product.id == product.id
    );

    if (isProductExisting) {
      const index = copyOfOrdersArray.indexOf(isProductExisting);
      copyOfOrdersArray[index].quantity = quantity;
    } else {
      copyOfOrdersArray.push({ product: product, quantity: quantity });
    }
    setOrders(copyOfOrdersArray);
    setProductDetailsDialogVisibility(false);
  };

  const removeOrder = (product) => {
    const copyOfOrdersArray = orders;
    const isProductExisting = copyOfOrdersArray.find(
      (order) => order.product.id == product.id
    );
    if (isProductExisting) {
      const index = copyOfOrdersArray.indexOf(isProductExisting);
      copyOfOrdersArray.splice(index, 1);
      setOrders(copyOfOrdersArray);
    }
    setProductDetailsDialogVisibility(false);
  };

  const showTotalPrice = () => {
    const amount = orders.reduce((accumulator, current) => {
      return accumulator + current.product.price * current.quantity;
    }, 0);
    setTotalAmount(amount);
    return amount;
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleAdminAccess = () => {
    router.replace("/login");
  };

  const handleOrderAccess = () => {
    router.replace("/orders");
  };

  const submitOrders = async () => {
    if (totalAmount) {
      try {
        const ordersData = {
          totalAmount: totalAmount,
        };

        const orderResult = await ordersApi.create(ordersData);

        // Mapping and extracting specific properties
        const orderDetailsdata = orders.map(
          ({ product: { id, name, price }, quantity }) => ({
            product_id: id,
            order_id: orderResult.result.data.id,
            product_name: name,
            product_price: price,
            order_date: orderResult.result.data.order_date,
            quantity,
          })
        );

        const orderDetailsApiResponse = await orderDetailsApi.create(
          orderDetailsdata
        );

        console.log("orderDetailsApiResponse -->", orderDetailsApiResponse);

        setOrders([]);
      } catch (error) {
        console.log("Error while submitting data ", error);
      }
    }
  };

  return (
    <>
      <AppBar component="nav" sx={{ backgroundColor: "#F9D649" }}>
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
            component="div"
            sx={{
              color: "black",
              fontWeight: "900",
              flexGrow: 1,
            }}
          >
            ORDERING QUEUING SYSTEM
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "black" }} onClick={handleOrderAccess}>
              ORDERS
            </Button>
            <Button sx={{ color: "black" }} onClick={handleAdminAccess}>
              ADMIN
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {categories && products && (
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: "100vh",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: "divider",
              minWidth: "200px",
              height: "100vh",
              paddingTop: "50px",
            }}
          >
            {categories.map((category, index) => (
              <Tab
                key={index}
                label={
                  <Box>
                    <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                      {category.name}
                    </Typography>
                    {/*  <Box component="img" src={"https://picsum.photos/50"} /> */}

                    <ImageWithFallback
                      loader={imageLoader}
                      src={`${config.apiBaseUrl}/${category.img_url}`}
                      fallbackSrc={`${config.apiBaseUrl}/images/no-image.png`}
                      alt={category.name}
                      width={100}
                      height={100}
                    />
                  </Box>
                }
              />
            ))}
          </Tabs>
          {categories.map((category, index) => (
            <TabPanel value={value} index={index} key={index}>
              {displayHeader(category.name)}
              <Grid container>
                {filteredProducts &&
                  filteredProducts.map((product, index) => (
                    <div key={index}>
                      <Grid item xs={6}>
                        {ProductCard(product)}
                      </Grid>
                    </div>
                  ))}
              </Grid>
            </TabPanel>
          ))}
          <OrdersPanel
            orders={orders}
            showTotalPrice={showTotalPrice}
            showProductDetails={showProductDetails}
            submitOrders={submitOrders}
          />
        </Box>
      )}

      {productDetailsDialogVisibility && (
        <DialogProductDetails2
          selectedProduct={selectedProduct}
          selectedProductQuantity={selectedProductQuantity}
          setProductDetailsDialogVisibility={setProductDetailsDialogVisibility}
          addToOrders={addToOrders}
          removeOrder={removeOrder}
        />
      )}

      <DialogProductDetails
        ref={dialogProductDetailsRef}
        selectedProduct={selectedProduct}
      />
    </>
  );
}

export default Dashboard;
