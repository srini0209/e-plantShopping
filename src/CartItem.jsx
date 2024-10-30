import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping, totalItems }) => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => {
            const cost = parseFloat(item.cost.replace("$", "")); // Remove "$" and convert to a number
            return total + item.quantity * cost;
        }, 0);
    };


    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(
                updateQuantity({ name: item.name, quantity: item.quantity - 1 })
            );
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        const cost = parseFloat(item.cost.replace("$", ""));
        const totalCost = item.quantity * cost;
        return totalCost;
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: "black" }}>
                Total Cart Amount: ${calculateTotalAmount()}<br />
                Total number of items in cart: {totalItems}
            </h2>
            <div>
                {cart.map((item) => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button
                                    className="cart-item-button cart-item-button-dec"
                                    onClick={() => handleDecrement(item)}
                                >
                                    -
                                </button>
                                <span className="cart-item-quantity-value">
                                    {item.quantity}
                                </span>
                                <button
                                    className="cart-item-button cart-item-button-inc"
                                    onClick={() => handleIncrement(item)}
                                >
                                    +
                                </button>
                            </div>
                            <div className="cart-item-total">
                                Total: ${calculateTotalCost(item)}
                            </div>
                            <button
                                className="cart-item-delete"
                                onClick={() => handleRemove(item)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div
                style={{ marginTop: "20px", color: "black" }}
                className="total_cart_amount"
            ></div>
            <div className="continue_shopping_btn">
                <button
                    className="get-started-button"
                    onClick={(e) => handleContinueShopping(e)}
                >
                    Continue Shopping
                </button>
                <br />
                <button className="get-started-button1" onClick={() => alert("Coming Soon..!")}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;
