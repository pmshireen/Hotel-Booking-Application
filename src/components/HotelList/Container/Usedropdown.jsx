import React from 'react';

export function useDropdown() {
  const [isClicked, setClicked] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(true);

  const toggleDropdown = () => {
    setIsExpanded((prevState) => !prevState);
    setClicked(true);
  };

  return { isExpanded, toggleDropdown, isClicked };
}
