import React, { useState, useEffect } from "react";
import { extractPaths } from "@/utils/utils";

interface AutoSuggestInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  triggerMetadata: object;
}

export const AutoSuggestInput: React.FC<AutoSuggestInputProps> = ({
  value,
  onChange,
  placeholder,
  triggerMetadata,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (triggerMetadata) {
      const paths = extractPaths(triggerMetadata);
      setSuggestions(paths);
    }
  }, [triggerMetadata]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue.includes("{")) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const regex = /\{[^}]*$/;
    const newValue = value.replace(regex, `{${suggestion}}`);
    onChange(newValue);
    setShowSuggestions(false);
  };

  return (
    <div className='relative'>
      <input
        type='text'
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className='border-2 border-stone-500 rounded-md p-1 mr-2 max-w-xl w-full'
      />
      {showSuggestions && (
        <div className='absolute z-10 w-full bg-white border rounded-md mt-1 max-h-40 overflow-y-auto'>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className='p-2 hover:bg-gray-100 cursor-pointer'
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
