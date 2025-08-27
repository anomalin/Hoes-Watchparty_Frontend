import { useState, useEffect } from 'react'
import CardForm from "./CardForm";
import CardList from "./CardList";
import './App.css'
import Footer from "./Footer"

export interface Card {
  id: number;
  name: string;
  message: string;
  link?: string | null;
  isWatched: boolean;
}

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const deleteCard = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }

  useEffect(() => {
    fetch("https://hoes-watchparty-backend.onrender.com/api/cards")
    .then(res => res.json())
    .then((data: Card[]) => setCards(data));
  }, []);

  const addCard = (newCard: Card) => setCards(prev => [...prev, newCard]);

  return (
    <div className="main">
      <h1>HOES WATCHPARTY</h1>
      <CardForm onAdd={addCard}/>
      <CardList cards={cards} onDelete={deleteCard}/>
      <Footer></Footer>
    </div>
  );
}

export default App
