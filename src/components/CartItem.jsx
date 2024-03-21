import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import CartContext from "../store/CartContext";

export default function CartItem({item}) {
    const cartCtx = useContext(CartContext);

    function handleAddItem(item) {
        cartCtx.addItem(item);
    }

    function handleRemoveItem(id) {
        cartCtx.removeItem(id);
    }

    return <li className="cart-item">
        <p>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</p>
        <p className="cart-item-actions">
            <button onClick={() => handleAddItem(item)}>+</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleRemoveItem(item.id)}>-</button>
        </p>
    </li>
}