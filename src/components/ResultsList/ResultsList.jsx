import React, { useState, useEffect } from "react";
import "./ResultsList.css";

/**
 * <ResultsList
 *   items={[...]}
 *   onSelect={item => console.log(item.name)}
 *   className="MyResultsList"
 * />
 *
 * @prop {Array} items List of results of form { name: string, state: { abbreviation: string } }
 * @prop {Function} onSelect Callback to execute when item is selected, accepts object.
 * @prop {mixed} ... All other props will be forwarded to the container DOM node.
 */
export function ResultsList(props) {
  const { className, onSelect, items, ...otherProps } = props;
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, items.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === "Enter" && focusedIndex >= 0) {
      onSelect(items[focusedIndex]);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [items, focusedIndex, onSelect]);

  return (
    <ul className={"ResultsList " + (className || "")} {...otherProps} role="listbox">
      {items.map(function(item, index) {
        return (
          <li
            key={"item" + index}
            className="ResultsList-item"
            onClick={() => onSelect && onSelect(item)}
            role="option"
            aria-selected={index === focusedIndex}
          >
            <button className="ResultsList-button">
              {item.name}, {item.state.abbreviation}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
