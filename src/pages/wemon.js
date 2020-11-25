import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Carousel,
  Card,
  Row,
  Col,
  Image,
  Container,
  InputGroup,
} from "react-bootstrap";
import Product from "../commponent/product";
import NavBar from "../commponent/Navbar";
// import "./Categoris.css";
import axios from "axios";

const WomenClothing = () => {
  const [WomenClothingProducts, setWomenClothingProducts] = useState([]);
  const products = useSelector((state) => state.productReducer.products);
  useEffect(() => {
    setWomenClothingProducts(
      products.filter((product) => product.category === "WomenClothing")
    );
  }, []);
  return (
    <div>
      <div className='heroSection'>
        <div className='heroSectionText'>
          <h1>בגדי נשים</h1>
          <p>
           באו להתחדש בבגדי נשים מהממים וזולים
          </p>
          <div className='inputHeroSearch'>
            <label>סינון לפי מחיר</label>
            <input placeholder='החל' />
            <input placeholder='עד' />
            <Button style={{ margin: "1rem 0" }} variant='warning'>
              Search
            </Button>
          </div>
        </div>
        <div className='heroSectionBackground'></div>
      </div>

      <Row style={{ position: "relative" }} className='mx-5 my-auto'>
        {WomenClothingProducts.map((product) => (
          <Col>
            <Row>
              <Product product={product} />
            </Row>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default  WomenClothing;