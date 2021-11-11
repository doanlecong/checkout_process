import { useState, useEffect } from "react";
import { useQuery } from "react-query";

// Import Components
import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import FormUser from "./FormUser/FormUser";

// Import mock data product
import PRODUCTS from "./MockData/mock_data";

// Styles
import { Wrapper, StyledButton } from "./App.style";

// Types
import { CartItemType } from "./Interfaces/CartItemType";
import { user } from "./FormUser/FormUser";
import {
  CUSTOMER,
  RULE_NAME,
  PRODUCT_ID_ARRAY,
} from "./ProcessCheckout/constants";
// Pricing Rules
import { pricingRule as PRICING_RULE } from "./ProcessCheckout/pricingRules";

// Module Checkout
import Checkout from "./ProcessCheckout/Checkout";

// Array of rules for checkout process
// Just for tesing
const pricingRules: PRICING_RULE[] = [
  //Microsoft Gets a 3 for 2 deal for Small Pizzas
  {
    applyFor: CUSTOMER.MIC,
    ruleApply: RULE_NAME.GET_ITEM_FREE,
    amountOrder: 2,
    addFreeItem: 1,
    applyForProduct: PRODUCT_ID_ARRAY.SMALL,
  },
  //Amazon Gets a discount on Large Pizza where the price drops to $19.99 per pizza
  {
    applyFor: CUSTOMER.AMA,
    ruleApply: RULE_NAME.GET_DISCOUNT_PRICE,
    priceChangedPerItem: 19.99,
    applyForProduct: PRODUCT_ID_ARRAY.LARGE,
  },
  // Facebook Gets a 5 for 4 deal on Medium Pizza
  {
    applyFor: CUSTOMER.FAC,
    ruleApply: RULE_NAME.GET_ITEM_FREE,
    amountOrder: 4,
    addFreeItem: 1,
    applyForProduct: PRODUCT_ID_ARRAY.MEDIUM,
  },
];

const checkoutInstance = new Checkout();

const users: user[] = [
  { id: "DEF", name: "Default" },
  { id: "MIC", name: "Microsoft" },
  { id: "AMA", name: "Amazon" },
  { id: "FAC", name: "Facebook" },
];

// Simulate loading data from remote server
const GetProductsItem = (): Promise<CartItemType[]> => {
  return new Promise<CartItemType[]>((resolve, reject) => {
    setTimeout(() => resolve(PRODUCTS), 1000);
  });
};

const getProducts = async (): Promise<CartItemType[]> => {
  return await GetProductsItem();
};

// Calculate Cost Before being discounted !
const calculateTotal = (items: CartItemType[]) => {
  const total = items.reduce(
    (ack: number, item) => ack + item.amount * item.price,
    0
  );
  return total;
};

const getNameUser = (userId: string) => {
  return users.filter((user) => userId === user.id)[0].name;
};

const App = () => {
  const [nameUser, setNameUser] = useState("DEF");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalCostAfter, setTotalCostAfter] = useState(0);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleChangeUser = (idUser: string) => {
    let pricingRulesChange: PRICING_RULE[] = [];
    switch (idUser) {
      case "MIC":
        pricingRulesChange.push(pricingRules[0]);
        break;
      case "AMA":
        pricingRulesChange.push(pricingRules[1]);
        break;
      case "FAC":
        pricingRulesChange.push(pricingRules[2]);
        break;
      default:
        break;
    }

    checkoutInstance.changePricingRules(pricingRulesChange);
    setNameUser(idUser);
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    console.log(clickedItem);
    checkoutInstance.add(clickedItem);
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  useEffect(() => {
    const totalCost = calculateTotal(cartItems);
    const totalCostAfterDiscount = checkoutInstance.total();
    setTotalCost(() => totalCost);
    setTotalCostAfter(() => totalCostAfterDiscount);
  }, [cartItems]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <div>Something went wrong....</div>;
  }

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          nameUser={getNameUser(nameUser)}
          cartItems={cartItems}
          totalCost={totalCost}
          totalAfterDiscount={totalCostAfter}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton data-test="button-drawer" onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <FormUser
        currUser={nameUser}
        users={users}
        chooseUser={(user) => handleChangeUser(user.id)}
      />
      <Grid container spacing={3}>
        {data?.map((item) => {
          return (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default App;
