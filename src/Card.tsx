import type { Card as CardType } from "./App.tsx";
import { useState } from "react";

import close from "./assets/x.svg"

interface CardProps {
    card: CardType;
    onDelete: (id: number) => void;
}

export default function Card({ card, onDelete }: CardProps) {
    const [isWatched, setIsWatched] = useState(card.isWatched);
    const handleDelete = async () => {
        const res = await fetch(`https://hoes-watchparty-backend.onrender.com/api/cards/${card.id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            onDelete(card.id);
        }
    };

    const toggleWatched = async () => {
        const newStatus = !isWatched;
        setIsWatched(newStatus);

        await fetch(`https://hoes-watchparty-backend.onrender.com/api/cards/${card.id}/seen`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStatus),
        });
    };

    return (
        <div
            className={`onecard ${isWatched ? "watched" : "" }`}>
            <button className="delete-button" onClick={handleDelete}><img src={close} alt="close" /></button>
            <p className="message">{card.message}</p>
            {card.link && (<p className="link"><a href={card.link} target="_blank" rel="noopener noreferrer">{card.link}</a></p>)}
            <p className="name"><strong>{card.name}</strong></p>
            <label className="check">
                <input type="checkbox" checked={isWatched} onChange={toggleWatched} />
                <span><small>Vill inte se (igen)</small></span>
            </label>
        </div>
    )
}