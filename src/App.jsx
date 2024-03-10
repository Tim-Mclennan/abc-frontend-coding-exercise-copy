import React, { useEffect, useState } from "react";
import { ResultsList } from "./components/ResultsList/ResultsList";
import { Input } from "./components/Input/Input";
import { Button } from "./components/Button/Button";
import "./App.css";

const API_URL = "http://localhost:8010/proxy/suburbs.json?q=";

const API_SAMPLE = [
  { name: "Sydney South", state: { abbreviation: "NSW" } },
  { name: "Sydney", state: { abbreviation: "NSW" } },
  { name: "Sydney International Airport", state: { abbreviation: "NSW" } },
  { name: "Sydney Domestic Airport", state: { abbreviation: "NSW" } },
  { name: "Sydenham", state: { abbreviation: "VIC" } }
];

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSuburb, setSelectedSuburb] = useState("");

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetch(API_URL + 'Syd') // Example query 'Syd'
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this effect runs once on mount


  const handleSelect = (item) => {
    setInputValue(item.name);
    setSelectedSuburb(item.name);
    setResults([]);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleButtonClick = () => {
    alert(`Selected suburb: ${selectedSuburb}`);
  };


  return (
    <section className="section">
      TODO: Implement a suburb autocomplete using &lt;Input /&gt;,
      &lt;ResultsList /&gt; and &lt;Button /&gt; and data provided by the{" "}
      <a href="http://localhost:8010/proxy/suburbs.json?q=Syd">API</a>.
      <div className="form">
        <Input value={inputValue} onChange={handleInputChange} />
        <Button onClick={handleButtonClick} />
      </div>
      <ResultsList items={results} onSelect={handleSelect} />
    </section>
  );
}
