import Checkout from "../../src/ProcessCheckout/Checkout";
import {
  PIZZA_PRICES,
  CUSTOMER,
  RULE_NAME,
  PRODUCT_ID_ARRAY,
} from "../../src/ProcessCheckout/constants";

describe("Test case : checkout process for default user", () => {
  it("1 small pizza, 1 medium pizza, 1 large pizza", () => {
    const expectCost = (PIZZA_PRICES.SMA * 3).toFixed(2);

    cy.visit("/");
    cy.get("[data-test=1]").click().click().click();
    cy.get("[data-test=button-drawer]").click();
    let totalCost;
    cy.get('[data-test="total-cost"]').should(($div) => {
      const text = $div.text();
      console.log(text);
      expect(text).to.equal(expectCost);
    });
  });

  it("2 small pizza, 1 medium pizza, 1 large pizza", () => {
    const expectCost = (
      PIZZA_PRICES.SMA * 2 +
      PIZZA_PRICES.MED +
      PIZZA_PRICES.LAR
    ).toFixed(2);

    cy.visit("/");
    cy.get("[data-test=1]").click().click();
    cy.get("[data-test=2]").click();
    cy.get("[data-test=3]").click();
    cy.get("[data-test=button-drawer]").click();
    let totalCost;
    cy.get('[data-test="total-cost"]').should(($div) => {
      const text = $div.text();
      console.log(text);
      expect(text).to.equal(expectCost);
    });
  });

  it("1 small pizza, 2 medium pizza, 1 large pizza", () => {
    const expectCost = (
      PIZZA_PRICES.SMA +
      PIZZA_PRICES.MED * 2 +
      PIZZA_PRICES.LAR
    ).toFixed(2);

    cy.visit("/");
    cy.get("[data-test=1]").click();
    cy.get("[data-test=2]").click().click();
    cy.get("[data-test=3]").click();
    cy.get("[data-test=button-drawer]").click();
    let totalCost;
    cy.get('[data-test="total-cost"]').should(($div) => {
      const text = $div.text();
      console.log(text);
      expect(text).to.equal(expectCost);
    });
  });
});
describe("Test case : checkout process for microsoft userr", () => {
  it("3 small pizza, 1 large pizza", () => {
    const expectCost = (PIZZA_PRICES.SMA * 2 + PIZZA_PRICES.LAR).toFixed(2);
    cy.visit("/");
    cy.get("[data-test='USER_MIC']").click();
    cy.get("[data-test=1]").click().click().click();
    cy.get("[data-test=3]").click();
    cy.get("[data-test=button-drawer]").click();
    let totalCost;
    cy.get('[data-test="total-cost"]').should(($div) => {
      const text = $div.text();
      console.log(text);
      expect(text).to.equal(expectCost);
    });
  });


  it("3 small pizza", () => {
    const expectCost = (PIZZA_PRICES.SMA * 2).toFixed(2);

    cy.visit("/");
    cy.get("[data-test='USER_MIC']").click();
    cy.get("[data-test=1]").click().click().click();
    cy.get("[data-test=button-drawer]").click();
    let totalCost;
    cy.get('[data-test="total-cost"]').should(($div) => {
      const text = $div.text();
      console.log(text);
      expect(text).to.equal(expectCost);
    });
  });
});

describe("Test case : checkout process for amazon user", () => {
  it("1 large pizza", () => {
    const expectCost = (19.99).toFixed(2);

    cy.visit("/");
    cy.get("[data-test='USER_AMA']").click();
    cy.get("[data-test=3]").click();
    cy.get("[data-test=button-drawer]").click();
    let totalCost;
    cy.get('[data-test="total-cost"]').should(($div) => {
      const text = $div.text();
      console.log(text);
      expect(text).to.equal(expectCost);
    });
  });

  it("3 medium pizza, 1 large pizza", () => {
    const expectCost = (19.99 + PIZZA_PRICES.MED*3).toFixed(2);

    cy.visit("/");
    cy.get("[data-test='USER_AMA']").click();
    cy.get("[data-test=2]").click().click().click();
    cy.get("[data-test=3]").click();
    cy.get("[data-test=button-drawer]").click();
    let totalCost;
    cy.get('[data-test="total-cost"]').should(($div) => {
      const text = $div.text();
      console.log(text);
      expect(text).to.equal(expectCost);
    });
  });
});
