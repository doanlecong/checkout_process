import { RULE_NAME as RULE } from "./constants";
import { pricingRule } from "./pricingRules";
import { CartItemType } from "../Interfaces/CartItemType";

interface RuleObject {
  [key: string]: pricingRule[];
}

type DataDiscount = {
  id: number;
  description: string;
  image: string;
  price: number;
  new_price?: number;
  title: string;
  amount: number;
  new_amount?: number;
};

export default class Checkout {
  // variables for storing data struture
  private dataProductBeforeDiscount: Map<any, any>;
  private pricingRuleObject: RuleObject;
  private dataDiscountList: DataDiscount[];

  constructor(pricingRules: pricingRule[] = []) {
    this.dataProductBeforeDiscount = new Map<any, any>();
    // Convert to new structure for accessing easily
    this.pricingRuleObject = this.tranformRule(pricingRules);
    // Init data
    this.dataDiscountList = [] as DataDiscount[];
  }

  tranformRule(pricingRule: pricingRule[] = []) {
    let convertStruture: RuleObject = {};
    pricingRule.map((item) => {
      const { applyForProduct } = item;
      convertStruture[applyForProduct] = (
        convertStruture[applyForProduct] || []
      ).concat(item);
      return null;
    });
    return convertStruture;
  }

  applyDiscountRuleToGetDataDiscount() {
    this.dataDiscountList = [];
    // Apply rules to order's data
    this.dataProductBeforeDiscount.forEach(
      (orderNum, product: CartItemType) => {
        const id = product?.id;

        // Check if product is in discount rules
        const discountRules = this.pricingRuleObject[id];
        if (!discountRules) {
          return this.dataDiscountList.push({ ...product, amount: orderNum });
        }
        // Apply discount with rules
        let dataChangeBaseOnRule = {
          ...product,
          amount: orderNum,
        } as DataDiscount;

        discountRules.forEach((rule) => {
          const ruleName = rule?.ruleApply;
          // Base on the rule , change the price or amount
          // Rule add for free
          if (ruleName === RULE.GET_ITEM_FREE) {
            const {
              addFreeItem: addForFree = 0,
              amountOrder: orderNumber = 1,
            } = rule;
            const orderNumberChange =
              Math.floor(orderNum / orderNumber) * addForFree;
            dataChangeBaseOnRule = {
              ...dataChangeBaseOnRule,
              new_amount: orderNum - orderNumberChange,
            };
          }

          // Rule discount price
          if (ruleName === RULE.GET_DISCOUNT_PRICE) {
            const new_price = rule?.priceChangedPerItem || product?.price || 0;
            dataChangeBaseOnRule = {
              ...dataChangeBaseOnRule,
              new_price: new_price,
            };
          }
        });
        this.dataDiscountList.push(dataChangeBaseOnRule);
      }
    );
  }

  // This function for testing ,
  changePricingRules(pricingRules: pricingRule[] = []) {
    this.pricingRuleObject = this.tranformRule(pricingRules);
  }

  add(product: CartItemType, quantity = 1) {
    const currentQuantity = this.dataProductBeforeDiscount.get(product) || 0;
    this.dataProductBeforeDiscount.set(product, currentQuantity + quantity);
  }

  total() {
    let totalCost = 0;
    // Need to reapply pricing rule
    this.applyDiscountRuleToGetDataDiscount();
    // Calculate total cost or money after applying discount rules !
    this.dataDiscountList.map((item) => {
      const { new_amount, new_price, price, amount } = item;
      const priceToCalculate = new_price || price || 0;
      const amountToCalculate = new_amount || amount || 0;
      totalCost += priceToCalculate * amountToCalculate;
      return null;
    });

    return totalCost;
  }
}
