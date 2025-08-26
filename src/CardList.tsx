import type { Card as CardType } from "./App";
import Card from "./Card";

interface CardListProps {
    cards: CardType[];
    onDelete: (id: number) => void;
}

export default function CardList({ cards, onDelete }: CardListProps) {
    return (
        <div className="card-list">
            {cards.map((c) => (
                <Card key={c.id} card={c} onDelete={onDelete}/>
            ))}
        </div>
    );
}