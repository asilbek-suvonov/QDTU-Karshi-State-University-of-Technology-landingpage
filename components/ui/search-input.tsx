import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({ value, onChange, placeholder = "Search..." }: SearchInputProps) => {
  return (
    <div className="relative w-full max-w-md group">
      <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 transition-colors group-focus-within:text-blue-500" />
      <input 
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 hover:border-border/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
