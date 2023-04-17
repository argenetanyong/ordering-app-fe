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

//API Imports
import { Categrories } from "../api/fakeCategoriesService";
import { Products } from "../api/fakeProductService";

//Custom Components imports
import DialogProductDetails from "../components/dialog-product-details";
import DialogProductDetails2 from "../components/dialog-product-details-2";
import OrdersPanel from "../components/orders-panel";

//API imports
import productsApi from "./api/products";
import categoriesApi from "./api/categories";

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
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);
  const [productDetailsDialogVisibility, setProductDetailsDialogVisibility] =
    useState(false);

  const [orders, setOrders] = useState([]);

  const dialogProductDetailsRef = useRef();

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
      console.log("PRODUCTS API LIST RESULT-> ", result);
      setProducts(result);
    } catch (error) {
      console.log("Error while fetching products data ", error);
    }
  };

  const getCategories = async () => {
    try {
      const result = await categoriesApi.list();
      console.log("CATEGORIES API LIST RESULT-> ", result);
      setCategories(result);
    } catch (error) {
      console.log("Error while fetching categories data ", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    filterProducts(newValue);
  };

  const filterProducts = (categoryIndex) => {
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

  const displayProductCard = (product) => {
    return (
      <Card
        sx={{ width: 300, height: 200, margin: 2, cursor: "pointer" }}
        onClick={() => showProductDetails(product)}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  };

  const showProductDetails = (product) => {
    console.log("product-> ", product);
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
    const totalPrice = orders.reduce((accumulator, current) => {
      return accumulator + current.product.price * current.quantity;
    }, 0);
    return totalPrice;
  };

  return (
    <>
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
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {categories.map((category, index) => (
              <Tab
                key={index}
                label={
                  <Box>
                    <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                      {category.name}
                    </Typography>
                    <Box component="img" src={"https://picsum.photos/50"} />
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
                        {displayProductCard(product)}
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
