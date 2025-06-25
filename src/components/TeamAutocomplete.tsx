
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useLeagueContext } from "@/contexts/LeagueContext";

interface TeamAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  selectedClub: string;
}

const TeamAutocomplete = ({ value, onChange, placeholder, selectedClub }: TeamAutocompleteProps) => {
  const { clubs } = useLeagueContext();
  const [isOpen, setIsOpen] = useState(false);
  const [filteredTeams, setFilteredTeams] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get teams for the selected club
  const availableTeams = clubs
    .filter(club => club.name.startsWith(selectedClub.split(' ')[0]) && selectedClub)
    .map(club => club.name);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = availableTeams.filter(team =>
        team.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTeams(filtered);
      setIsOpen(filtered.length > 0 && value !== filtered[0]);
    } else {
      setFilteredTeams(availableTeams);
      setIsOpen(selectedClub.length > 0);
    }
  }, [value, selectedClub, availableTeams]);

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

  const handleTeamSelect = (teamName: string) => {
    onChange(teamName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        placeholder={selectedClub ? placeholder : "Select a club first"}
        disabled={!selectedClub}
        onFocus={() => selectedClub && setIsOpen(true)}
      />
      {isOpen && filteredTeams.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto"
        >
          {filteredTeams.map((teamName, index) => (
            <div
              key={index}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              onClick={() => handleTeamSelect(teamName)}
            >
              {teamName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamAutocomplete;
