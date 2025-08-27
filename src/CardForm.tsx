import { useState } from "react";

import type { Card } from "./App";

import envelope from "./assets/envelope-heart.svg"

interface CardFormProps {
    onAdd: (card: Card) => void;
}

export default function CardForm({ onAdd }: CardFormProps) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("https://hoes-watchparty-backend.onrender.com/api/cards", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({name, message, link: link || null}),
        });

        const newCard: Card = await res.json();
        onAdd(newCard);
        setName("");
        setMessage("");
        setLink("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Namn"/>
            <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Vad vill du addera till Hoesparty watchlist?"/>
                <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Lägg till länk (valfritt)"/>
            <button className="publish" type="submit">Publicera <img src={envelope} alt="publish"/></button>
        </form>
    );
}