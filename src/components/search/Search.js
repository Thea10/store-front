import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchText,
  fetchProducts,
} from "../../features/products/productsSlice";
import './search.scss'

export function Search() {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.productSearch.searchText);
  const [feedbackText, setfeedbackText] = useState(null);

  const setText = (event) => {
    dispatch(setSearchText(event.target.value));
  };
  const submitSearch = () => {
    if (searchText === "") {
      setfeedbackText("Enter a search term to search for products");
      setTimeout(() => {
        setfeedbackText(null);
      }, 4000);
      return;
    } else {
      dispatch(fetchProducts(searchText));
    }
  };
  return (
    <div className="app__searchbar">
      <button type="submit" className="app__search__submit" onClick={submitSearch} >
        Search
      </button>

      <input
        type="text"
        placeholder="Search Products"
        className="app__searchinput"
        onChange={setText}
        value={searchText}
      />

      {feedbackText ? (
        <div className="search__feedback">{feedbackText}</div>
      ) : null}
    </div>
  );
}
