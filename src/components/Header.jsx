import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const totalNumberOfCartItems = cartCtx.items.reduce((cartItemsCount, item) => {
        return cartItemsCount + item.quantity;
    }, 0);
    
    return <header id="main-header">
        <div id="title">
            <img src={logoImg}></img>
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly>Cart ({totalNumberOfCartItems})</Button>
        </nav>
    </header>
}