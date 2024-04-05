import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup, Button } from "react-bootstrap";

// Cart State
import { useCart } from "@provider/CartProvider";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");

  //useNavigate
  const navigate = useNavigate();

  // import from CartProvider
  const { searchForProducts } = useCart();

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      setSearchInput("");
      navigate(`/search-results/${searchInput}`);
    }
  };

  return (
    <InputGroup>
      <Form.Control
        type="text"
        size="sm"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Button size="sm" variant="outline-dark" onClick={handleSearch}>
        Sök
      </Button>
    </InputGroup>
  );
}
