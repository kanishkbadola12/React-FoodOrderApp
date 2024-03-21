import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../utils/formatting";
import CartItem from "./CartItem";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const totalPrice = cartCtx.items.reduce((totalItemsPrice, item) => {
        return totalItemsPrice + item.quantity * item.price
    }, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }

    return <Modal 
                className="cart" 
                open={userProgressCtx.progress === 'cart'} 
                onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
            >
                <h3>Your Cart</h3>
                <ul>
                    {cartCtx.items.map(item => <CartItem key={item.id} item={item}/>)}
                </ul>
                <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
                <p className="modal-actions">
                    <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && 
                (<Button onClick={handleGoToCheckout}>Go To Checkout</Button>)} 
                </p>
            </Modal>
}