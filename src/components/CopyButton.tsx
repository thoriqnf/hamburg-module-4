"use client";

import React, { useState } from 'react';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export default function CopyButton({ textToCopy, className = '' }: CopyButtonProps) {
  const [buttonText, setButtonText] = useState<'Copy' | 'Copied!' | 'Error'>('Copy');
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await navigator.clipboard.writeText(textToCopy);
      setButtonText('Copied!');

      // Reset back to "Copy" after 2 seconds
      setTimeout(() => {
        setButtonText('Copy');
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setButtonText('Error');
      setIsLoading(false);

      // Reset error message after 2 seconds
      setTimeout(() => {
        setButtonText('Copy');
      }, 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={isLoading}
      className={`copy-button ${className}`}
      data-testid="copy-button"
    >
      {buttonText}
    </button>
  );
}