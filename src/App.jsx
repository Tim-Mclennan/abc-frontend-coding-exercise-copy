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
  // State for the input value entered by the user
  const [inputValue, setInputValue] = useState("");
  // State for storing the fetched results from the API
  const [results, setResults] = useState([]);
  // State for storing the selected suburb
  const [selectedSuburb, setSelectedSuburb] = useState("");
  // state to control whether the fetch operation should be performed:
  const [shouldFetch, setShouldFetch] = useState(true);

  // useEffect hook to fetch data based on the input value (Will depend on changes to inputValue)
  useEffect(() => {
    if (inputValue && shouldFetch) {
      fetch(`${API_URL}${inputValue}`)
        .then((response) => response.json())
        .then((data) => {
          // Filter the results to only include suburbs that start with the input value
          const filteredResults = data.filter((suburb) =>
            suburb.name.toLowerCase().startsWith(inputValue.toLowerCase())
          );
          setResults(filteredResults);
        });
    } else {
      // If the input value is empty, clear the results
      setResults([]);
    }
  }, [inputValue, shouldFetch]);

  // Handler for selecting a suburb from the results list
  const handleSelect = (item) => {
    setInputValue(item.name);
    setSelectedSuburb(item.name);
    setResults([]);
    setShouldFetch(false); // Prevent fetching after selection
  };

  // Handler for changes to the input field
  const handleInputChange = (value) => {
    setInputValue(value);
    setShouldFetch(true); // Allow fetching when user types
  };

  // Handler for the button click
  const handleButtonClick = () => {
    alert(`Your selected suburb: ${selectedSuburb}`);
  };

  return (
    <section className="section" role="main">
      <div className="form">
        <label htmlFor="suburbInput">Suburb</label>
        <div className="input-field">
          <Input id="suburbInput" value={inputValue} onChange={handleInputChange} />
          {inputValue && <ResultsList className="results-list" items={results} onSelect={handleSelect} />}
        </div>
        <Button onClick={handleButtonClick} id="submitButton" />
      </div>
    </section>
  );
}
