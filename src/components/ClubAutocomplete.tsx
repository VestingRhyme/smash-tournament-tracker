
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useLeagueContext } from "@/contexts/LeagueContext";

interface ClubAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const ClubAutocomplete = ({ value, onChange, placeholder }: ClubAutocompleteProps) => {
  const { clubs } = useLeagueContext();
  const [isOpen, setIsOpen] = useState(false);
  const [filteredClubs, setFilteredClubs] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableClubs = clubs.map(club => club.name);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = availableClubs.filter(name =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredClubs(filtered);
      setIsOpen(filtered.length > 0 && !filtered.includes(value));
    } else {
      setFilteredClubs(availableClubs);
      setIsOpen(false);
    }
  }, [value, availableClubs]);

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

  const handleClubSelect = (clubName: string) => {
    onChange(clubName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && filteredClubs.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto"
        >
          {filteredClubs.map((clubName, index) => (
            <div
              key={index}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              onClick={() => handleClubSelect(clubName)}
            >
              {clubName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClubAutocomplete;
