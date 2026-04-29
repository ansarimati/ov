"use client";

export default function Test() {
  return (
    <button
      onClick={() => console.log("Button clicked!")}
      style={{
        padding: "10px",
        backgroundColor: "blue",
        color: "white",
        borderRadius: "5px",
      }}
    >
      Click me
    </button>
  );
}