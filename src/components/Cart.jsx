import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

// Mock function for calculating totals
const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.12; // Example tax rate
    const shipping = 12.00; // Flat shipping rate
    const total = subtotal + tax + shipping;
    return { subtotal, tax, shipping, total };
};

// Helper function to format prices in INR
const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
};

const Cart = () => {
    const navigate = useNavigate();

    // Sample initial cart items
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Velvet Sneaker",
            price: 2000.00, // Example price in INR
            image: "https://readymadeui.com/images/product14.webp",
            quantity: 1,
            size: "M", // Default size
            sizes: ["S", "M", "L", "XL"], // Available sizes
        },
        {
            id: 2,
            name: "Smart Watch Timex",
            price: 12000.00, // Example price in INR
            image: "https://readymadeui.com/images/watch5.webp",
            quantity: 1,
            size: "M", // Default size
            sizes: ["S", "M", "L", "XL"], // Available sizes
        },
        {
            id: 3,
            name: "Sun Glass",
            price: 5000.00, // Example price in INR
            image: "https://readymadeui.com/images/sunglass1.webp",
            quantity: 1,
            size: "M", // Default size
            sizes: ["S", "M", "L"], // Available sizes
        },
    ]);

    const handleQuantityChange = (id, delta) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const handleSizeChange = (id, size) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, size }
                    : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const { subtotal, tax, shipping, total } = calculateTotals(cartItems);

    return (
        <div>
            <Header />
            <div
                style={{
                    fontFamily: "sans-serif",
                    maxWidth: "80rem", // Increased maxWidth to accommodate side-by-side layout
                    margin: "auto",
                    backgroundColor: "white",
                    padding: "1rem",
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr", // Cart and summary side-by-side
                    gap: "1rem",
                }}
            >
                {/* Cart Items */}
                <div
                    style={{
                        backgroundColor: "#f3f4f6",
                        padding: "1rem",
                        borderRadius: "0.375rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937" }}>
                        Cart
                    </h2>
                    <hr
                        style={{
                            borderColor: "#d1d5db",
                            marginTop: "1rem",
                            marginBottom: "2rem",
                        }}
                    />
                    <div style={{ gap: "1rem" }}>
                        {cartItems.map(item => (
                            <div
                                key={item.id}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "2fr 1fr",
                                    alignItems: "center",
                                    gap: "1rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "6rem",
                                            height: "6rem",
                                            backgroundColor: "white",
                                            padding: "0.5rem",
                                            borderRadius: "0.375rem",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h3
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                                color: "#1f2937",
                                            }}
                                        >
                                            {item.name}
                                        </h3>
                                        <h6
                                            style={{
                                                fontSize: "0.75rem",
                                                color: "#ef4444",
                                                cursor: "pointer",
                                                marginTop: "0.125rem",
                                            }}
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            Remove
                                        </h6>
                                        <div style={{ marginTop: "0.5rem" }}>
                                            <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                                                Size:
                                            </span>
                                            <select
                                                value={item.size}
                                                onChange={(e) => handleSizeChange(item.id, e.target.value)}
                                                style={{
                                                    fontSize: "0.75rem",
                                                    padding: "0.375rem",
                                                    borderRadius: "0.375rem",
                                                    border: "1px solid #d1d5db",
                                                    marginLeft: "0.5rem",
                                                    outline: "none",
                                                }}
                                            >
                                                {item.sizes.map(size => (
                                                    <option key={size} value={size}>
                                                        {size}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                style={{
                                                    padding: "0.375rem",
                                                    border: "1px solid #d1d5db",
                                                    color: "#1f2937",
                                                    fontSize: "0.75rem",
                                                    backgroundColor: "transparent",
                                                    borderRadius: "0.375rem",
                                                    outline: "none",
                                                }}
                                            >
                                                -
                                            </button>
                                            <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                style={{
                                                    padding: "0.375rem",
                                                    border: "1px solid #d1d5db",
                                                    color: "#1f2937",
                                                    fontSize: "0.75rem",
                                                    backgroundColor: "transparent",
                                                    borderRadius: "0.375rem",
                                                    outline: "none",
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginLeft: "auto" }}>
                                    <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#1f2937" }}>
                                        {formatCurrency(item.price * item.quantity)}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div
                    style={{
                        backgroundColor: "#f3f4f6",
                        borderRadius: "0.375rem",
                        padding: "1rem",
                        position: "sticky",
                        top: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937" }}>
                        Summary
                    </h2>
                    <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "1rem", color: "#1f2937" }}>Subtotal</span>
                            <span style={{ fontSize: "1rem", color: "#1f2937" }}>{formatCurrency(subtotal)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "1rem", color: "#1f2937" }}>Tax</span>
                            <span style={{ fontSize: "1rem", color: "#1f2937" }}>{formatCurrency(tax)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "1rem", color: "#1f2937" }}>Shipping</span>
                            <span style={{ fontSize: "1rem", color: "#1f2937" }}>{formatCurrency(shipping)}</span>
                        </div>
                        <hr style={{ borderColor: "#d1d5db", marginTop: "1rem", marginBottom: "1rem" }} />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1f2937" }}>Total</span>
                            <span style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1f2937" }}>
                                {formatCurrency(total)}
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        style={{
                            backgroundColor: "#1d4ed8",
                            color: "white",
                            padding: "0.75rem",
                            border: "none",
                            borderRadius: "0.375rem",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            marginTop: "1rem",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/checkout")}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;