
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/contexts/AppContext";

interface PlayerAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  category: string;
}

const PlayerAutocomplete = ({ value, onChange, placeholder, category }: PlayerAutocompleteProps) => {
  const { players } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [filteredPlayers, setFilteredPlayers] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get unique player names for the category
  const availablePlayers = [...new Set(
    players
      .filter(p => p.category === category)
      .map(p => p.name)
  )];

  useEffect(() => {
    if (value.length > 0) {
      const filtered = availablePlayers.filter(name =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPlayers(filtered);
      setIsOpen(filtered.length > 0 && value !== filtered[0]);
    } else {
      setFilteredPlayers([]);
      setIsOpen(false);
    }
  }, [value, availablePlayers]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handlePlayerSelect = (playerName: string) => {
    onChange(playerName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={() => value.length > 0 && setIsOpen(true)}
      />
      {isOpen && filteredPlayers.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto"
        >
          {filteredPlayers.map((playerName, index) => (
            <div
              key={index}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              onClick={() => handlePlayerSelect(playerName)}
            >
              {playerName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerAutocomplete;
