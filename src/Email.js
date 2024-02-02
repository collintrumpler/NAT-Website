import React, { useState } from "react";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    fetch("https://formcarry.com/s/7TL4eUothpF", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code === 200) {
          alert("We received your submission, thank you!");
        } else if (response.code === 422) {
          // Field validation failed
          setError(response.message);
        } else {
          // other error from formcarry
          setError(response.message);
        }
      })
      .catch((error) => {
        // request related error.
        setError(error.message ? error.message : error);
      });
  }

  return (
    <form
      id="location-contact"
      className="contact-form"
      onSubmit={(e) => onSubmit(e)}
    >
      <div className="contact-name">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Your first and last name"
        />
      </div>

      <div className="contact-email">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          placeholder="john@doe.com"
        />
      </div>

      <div className="contact-message">
        <label htmlFor="message"></label>
        <textarea
          maxLength={"500"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="message"
          placeholder="Enter your message..."
        ></textarea>
      </div>

      <div className="submit-button">
        <button type="submit">SEND</button>
      </div>
    </form>
  );
}
