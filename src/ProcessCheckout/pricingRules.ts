import { CUSTOMER, RULE_NAME, PRODUCT_ID_ARRAY } from "./constants";

export type pricingRule = {
  applyFor:
    | typeof CUSTOMER.MIC
    | typeof CUSTOMER.AMA
    | typeof CUSTOMER.FAC
    | typeof CUSTOMER.DEF;
  ruleApply:
    | typeof RULE_NAME.GET_ITEM_FREE
    | typeof RULE_NAME.GET_DISCOUNT_PRICE;
  amountOrder?: number;
  addFreeItem?: number;
  priceChangedPerItem?: number;
  applyForProduct:
    | typeof PRODUCT_ID_ARRAY.SMALL
    | typeof PRODUCT_ID_ARRAY.MEDIUM
    | typeof PRODUCT_ID_ARRAY.LARGE;
};
