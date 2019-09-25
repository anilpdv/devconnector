import React from "react";

export default function Footer() {
  const date = new Date();
  return (
    <footer className="text-white mt-5 bg-dark p-4 fixed-bottom">
      Copyright &copy; {date.getFullYear()} DevConnector
    </footer>
  );
}
