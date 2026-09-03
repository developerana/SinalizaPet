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
}: {
  cities: string[];
  value: string;
  onChange: (city: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-label="Selecionar cidade"
          className={cn(
            "flex w-full items-center gap-2 border-2 border-ink bg-paper px-3 py-2 text-left text-sm font-semibold transition-colors hover:bg-secondary sm:w-72",
            className,
          )}
        >
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">
            {value === ALL_CITIES ? "Todas as cidades" : value}
          </span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 border-2 border-ink p-0" align="start">
        <Command>
          <CommandInput placeholder="Pesquisar cidade..." />
          <CommandList>
            <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="Todas as cidades"
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
                Todas as cidades
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
