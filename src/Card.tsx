import type { Card as CardType } from "./App.tsx";

import close from "./assets/x.svg"

interface CardProps {
    card: CardType;
    onDelete: (id: number) => void;
}

export default function Card({ card, onDelete }: CardProps) {
    const handleDelete = async () => {
        const res = await fetch(`http://hoes-watchparty-backend.onrender.com/api/cards/${card.id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            onDelete(card.id);
        }
    };
    return (
        <div className="onecard">
            <button className="delete-button" onClick={handleDelete}><img src={close} alt="close"/></button>
            <p className="message">{card.message}</p>
            <p className="name"><strong>{card.name}</strong></p>
        </div>
    )
}