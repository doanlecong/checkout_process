// import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.style";
import { CartItemType } from "../Interfaces/CartItemType";

type Props = {
  nameUser: string;
  cartItems: CartItemType[];
  totalCost: number;
  totalAfterDiscount: number,
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({
  nameUser,
  cartItems,
  totalCost,
  totalAfterDiscount,
  addToCart,
  removeFromCart,
}) => {
  

  return (
    <Wrapper>
      <h2>
        Hello <b>{nameUser || "Default"}</b>
      </h2>
      <h3>Your Shopping Cart</h3>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {/* {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))} */}
      <h2>Total Before Discount: ${totalCost.toFixed(2)}</h2>
      <h2>Total After Discount : $<span data-test="total-cost">{totalAfterDiscount.toFixed(2)}</span></h2> 
    </Wrapper>
  );
};

export default Cart;
