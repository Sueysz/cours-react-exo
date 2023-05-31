import React, { useEffect, useState, useMemo, useCallback } from "react";
import { DecreasedPrice, IncreasedPrice, StablePrice } from "./StyledPrices";

export const CryptoPrices = ({ current }) => {
    const [price, setPrice] = useState("");
    const [initialPrice, setInitialPrice] = useState("");
    const [priceChange, setPriceChange] = useState("");
    const [priceHistory, setPriceHistory] = useState([]);

    const fetchCryptoPrice = useCallback(() => {
        fetch(`https://api.coinbase.com/v2/prices/${current}/buy`)
            .then((response) => response.json())
            .then((data) => {
                const cryptoPrice = data.data.amount;
                setPriceChange(getPriceChange(cryptoPrice, initialPrice));

                if (initialPrice !== "" && cryptoPrice !== priceHistory[priceHistory.length - 1]) {
                    setPriceHistory((prevHistory) => [...prevHistory, cryptoPrice]);
                }

                setPrice(cryptoPrice);
            });
    }, [current, initialPrice, priceHistory]);

    useEffect(() => {
        fetchCryptoPrice();
        const timer = setInterval(fetchCryptoPrice, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [fetchCryptoPrice]);

    const getPriceChange = useCallback((currentPrice, initialPrice) => {
        if (initialPrice === "") {
            return "";
        } else if (currentPrice > initialPrice) {
            return "▲";
        } else if (currentPrice < initialPrice) {
            return "▼";
        } else {
            return "►";
        }
    }, []);

    const formattedPrice = useMemo(() => `${price} €`, [price]);
    const formattedInitialPrice = useMemo(() => `${initialPrice} €`, [initialPrice]);

    const handleCurrencyClick = useCallback(() => {
        if (initialPrice === "") {
            setInitialPrice(price);
        }
    }, [initialPrice, price]);

    return (
        <div>
            <button onClick={handleCurrencyClick}>
                Click ici Pour le comparatif {formattedInitialPrice}
            </button>
            {priceChange === "▲" && <IncreasedPrice>{priceChange}</IncreasedPrice>}
            {priceChange === "▼" && <DecreasedPrice>{priceChange}</DecreasedPrice>}
            {priceChange === "►" && <StablePrice>{priceChange}</StablePrice>}
            <br />
            <span>{formattedPrice}</span>

            <ul>
                {priceHistory.map((price, index) => (
                    <li key={index}>{price} €</li>
                ))}
            </ul>
        </div>
    );
};
