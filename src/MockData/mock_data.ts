// Image For Mock Data
import smallPizza from "../Images/small.png";
import mediumPizza from "../Images/medium.png";
import LargePizza from "../Images/large.png";

import { PRODUCT_ID_ARRAY, PIZZA_PRICES } from "../ProcessCheckout/constants";

const PRODUCTS = [
  {
    id: PRODUCT_ID_ARRAY.SMALL,
    image: smallPizza,
    title: "Small Pizza",
    amount: 0,
    description: '10" pizza for one person',
    price: PIZZA_PRICES.SMA,
  },
  {
    id: PRODUCT_ID_ARRAY.MEDIUM,
    image: mediumPizza,
    title: "Medium Pizza",
    amount: 0,
    description: '12" pizza for one person',
    price: PIZZA_PRICES.MED,
  },
  {
    id: PRODUCT_ID_ARRAY.LARGE,
    image: LargePizza,
    title: "Large Pizza",
    amount: 0,
    description: '15" pizza for one person',
    price: PIZZA_PRICES.LAR,
  },
];

export default PRODUCTS;
