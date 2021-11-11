import React from "react";
import { render, screen } from "@testing-library/react";
import Checkout from "../ProcessCheckout/Checkout";
import {
  PIZZA_PRICES,
  CUSTOMER,
  RULE_NAME,
  PRODUCT_ID_ARRAY,
} from "../ProcessCheckout/constants";

const smallPizza = {
  amount: 0,
  description: '10" pizza for one person',
  id: 1,
  image: "/static/media/small.4ac18fb8.png",
  price: PIZZA_PRICES.SMA,
  title: "Small Pizza",
};

const mediumPizza = {
  amount: 0,
  description: '12" pizza for one person',
  id: 2,
  image: "/static/media/medium.4ac18fb8.png",
  price: PIZZA_PRICES.MED,
  title: "Medium Pizza",
};

const largePizza = {
  amount: 0,
  description: '15" pizza for one person',
  id: 3,
  image: "/static/media/large.6fa3dc0f.png",
  price: PIZZA_PRICES.LAR,
  title: "Large Pizza",
};

describe("Test case : checkout process for default user", () => {
  it("1 small pizza, 1 medium pizza, 1 large pizza", () => {
    const checkout = new Checkout();
    checkout.add(smallPizza);
    checkout.add(mediumPizza);
    checkout.add(largePizza);

    const expectCost = (
      PIZZA_PRICES.SMA +
      PIZZA_PRICES.MED +
      PIZZA_PRICES.LAR
    ).toFixed(2);
    expect(checkout.total().toFixed(2)).toEqual(expectCost);
  });

  it("2 small pizza, 1 medium pizza, 1 large pizza", () => {
    const checkout = new Checkout();
    checkout.add(smallPizza);
    checkout.add(smallPizza);
    checkout.add(mediumPizza);
    checkout.add(largePizza);

    const expectCost = (
      PIZZA_PRICES.SMA * 2 +
      PIZZA_PRICES.MED +
      PIZZA_PRICES.LAR
    ).toFixed(2);
    expect(checkout.total().toFixed(2)).toEqual(expectCost);
  });

  it("1 small pizza, 2 medium pizza, 1 large pizza", () => {
    const checkout = new Checkout();
    checkout.add(smallPizza);
    checkout.add(mediumPizza);
    checkout.add(mediumPizza);
    checkout.add(largePizza);

    const expectCost = (
      PIZZA_PRICES.SMA +
      PIZZA_PRICES.MED * 2 +
      PIZZA_PRICES.LAR
    ).toFixed(2);
    expect(checkout.total().toFixed(2)).toEqual(expectCost);
  });

  it("1 small pizza, 1 medium pizza, 2 large pizza", () => {
    const checkout = new Checkout();
    checkout.add(smallPizza);
    checkout.add(mediumPizza);
    checkout.add(largePizza);
    checkout.add(largePizza);

    const expectCost = (
      PIZZA_PRICES.SMA +
      PIZZA_PRICES.MED +
      PIZZA_PRICES.LAR * 2
    ).toFixed(2);
    expect(checkout.total().toFixed(2)).toEqual(expectCost);
  });
});

describe("Test case : checkout process for microsoft user", () => {
  const rules = [
    {
      applyFor: CUSTOMER.MIC,
      ruleApply: RULE_NAME.GET_ITEM_FREE,
      amountOrder: 2,
      addFreeItem: 1,
      applyForProduct: PRODUCT_ID_ARRAY.SMALL,
    },
  ];

  it("3 small pizza, 1 large pizza", () => {
    const checkout = new Checkout(rules);
    checkout.add(smallPizza);
    checkout.add(smallPizza);
    checkout.add(smallPizza);
    checkout.add(largePizza);

    const expectCost = (PIZZA_PRICES.SMA * 2 + PIZZA_PRICES.LAR).toFixed(2);
    expect(checkout.total().toFixed(2)).toEqual(expectCost);
  });

  it("3 small pizza", () => {
    const checkout = new Checkout(rules);
    checkout.add(smallPizza);
    checkout.add(smallPizza);
    checkout.add(smallPizza);

    const expectCost = (PIZZA_PRICES.SMA * 2).toFixed(2);
    expect(checkout.total().toFixed(2)).toEqual(expectCost);
  });
});

describe("Test case : checkout process for amazon user", () => {
  const rules = [
    {
      applyFor: CUSTOMER.AMA,
      ruleApply: RULE_NAME.GET_DISCOUNT_PRICE,
      priceChangedPerItem: 19.99,
      applyForProduct: PRODUCT_ID_ARRAY.LARGE,
    },
  ];

  it("1 large pizza", () => {
    const checkout = new Checkout(rules);
    checkout.add(largePizza);

    const expectCost = (rules[0].priceChangedPerItem).toFixed(2);
    expect(checkout.total().toFixed(2)).toEqual(expectCost);
  });

  it("3 medium pizza, 1 large pizza", () => {
    const checkout = new Checkout(rules);
    checkout.add(mediumPizza);
    checkout.add(mediumPizza);
    checkout.add(mediumPizza);
    checkout.add(largePizza);

    const expectCost = (PIZZA_PRICES.MED * 3 + rules[0].priceChangedPerItem).toFixed(2);
    expect(checkout.total().toFixed(2)).toEqual(expectCost);
  });
});



