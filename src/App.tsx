import { useState, useEffect } from 'react'
import CardForm from "./CardForm";
import CardList from "./CardList";
import './App.css'
import Footer from "./Footer"

export interface Card {
  id: number;
  name: string;
  message: string;
}

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const deleteCard = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }

  useEffect(() => {
    fetch("https://hoes-watchparty-backend.onrender.com")
    .then(res => res.json())
    .then((data: Card[]) => setCards(data));
  }, []);

  const addCard = (newCard: Card) => setCards(prev => [...prev, newCard]);

  return (
    <>
      <h1>HOES WATCHPARTY</h1>
      <CardForm onAdd={addCard}/>
      <CardList cards={cards} onDelete={deleteCard}/>
      <Footer></Footer>
    </>
  );
}

export default App
