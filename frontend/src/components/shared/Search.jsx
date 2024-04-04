import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <InputGroup>
      <Form.Control
        type="text"
        size="sm"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Button size="sm" variant="outline-dark">
        Sök
      </Button>
    </InputGroup>
  );
}
