import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-light">
        &copy;{new Date().getFullYear()} by Anastasia, Ashley, Divya, Josh, and Haley
      </div>
    </footer>
  );
};

export default Footer;
