import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

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

import { Categrories } from "../api/fakeCategoriesService";
import { Products } from "../api/fakeProductService";

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

function Sandbox() {
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);

  useEffect(() => {
    setCategories(Categrories);
    setProducts(Products);
  }, []);

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
    console.log("details of ", product.name);
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
        </Box>
      )}
    </>
  );
}

export default Sandbox;
