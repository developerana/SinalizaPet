import { useState } from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const ALL_CITIES = "todas";

export function CitySelect({
  cities,
  value,
  onChange,
  className,
  allLabel = "Todas as cidades",
  searchPlaceholder = "Pesquisar cidade...",
  emptyText = "Nenhuma cidade encontrada.",
  disabled = false,
}: {
  cities: string[];
  value: string;
  onChange: (city: string) => void;
  className?: string;
  allLabel?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          aria-label="Selecionar cidade"
          className={cn(
            "flex w-full items-center gap-2 border-2 border-ink bg-paper px-3 py-2 text-left text-sm font-semibold transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 sm:w-72",
            className,
          )}
        >
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">
            {value === ALL_CITIES ? allLabel : value}
          </span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 border-2 border-ink p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value={allLabel}
                onSelect={() => {
                  onChange(ALL_CITIES);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === ALL_CITIES ? "opacity-100" : "opacity-0",
                  )}
                />
                {allLabel}
              </CommandItem>
              {cities.map((city) => (
                <CommandItem
                  key={city}
                  value={city}
                  onSelect={() => {
                    onChange(city);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", value === city ? "opacity-100" : "opacity-0")}
                  />
                  {city}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
