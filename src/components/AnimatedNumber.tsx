
import React, { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setAnimating(true);
      const timeout = setTimeout(() => {
        setDisplayValue(value);
        setAnimating(false);
      }, 250);
      
      return () => clearTimeout(timeout);
    }
  }, [value, displayValue]);

  // Format the number with commas if needed
  const formattedValue = displayValue.toLocaleString();
  
  return (
    <span className={`${className} ${animating ? 'animate-number-change' : ''}`}>
      {formattedValue}
    </span>
  );
};

export default AnimatedNumber;
