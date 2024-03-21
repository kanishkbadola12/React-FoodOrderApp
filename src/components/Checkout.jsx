import { useContext } from "react";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import useHttp from "../hooks/useHttp";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {
    const userProgressCtx = useContext(UserProgressContext);
    const cartCtx = useContext(CartContext);
    const totalPrice = cartCtx.items.reduce((totalItemsPrice, item) => {
        return totalItemsPrice + item.quantity * item.price
    }, 0);
    const {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleSubmit(event) {
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        );
        
        event.preventDefault();
    }

    const handleFinish = () => {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isLoading) {
        actions = <span>Sending order data...</span>;
    }

    if (data && data.message && !error) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }

    return <Modal 
                className="cart"
                open={userProgressCtx.progress === 'checkout'} 
                onClose={handleClose}
            >   
                <form onSubmit={handleSubmit}>
                    <h2>Checkout</h2>
                    <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>
                    <Input type="text" className="control" id="name" label="Full Name" />
                    <Input type="email" className="control" id="email" label="E-mail Address" />
                    <Input type="text" className="control" id="street" label="Street" />
                    <div className="control-row">
                        <Input id="postal-code" label="Postal Code" />
                        <Input id="city" label="City" />
                    </div>
                    {error && <Error title="Failed to submit order" message={error} />}
                    <p className="modal-actions">
                        {actions}
                    </p>
                </form>
            </Modal>
}