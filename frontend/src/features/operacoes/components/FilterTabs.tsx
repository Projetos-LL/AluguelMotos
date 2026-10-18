import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ReactNode } from "react";

interface FilterTab {
  id: string;
  label: string;
  content: ReactNode;
}

interface FilterTabsProps {
  title?: string;
  description?: string;
  tabs: FilterTab[];
  defaultValue?: string;
}

export function FilterTabs({ title = "Filtros", description, tabs, defaultValue }: FilterTabsProps) {
  if (tabs.length === 0) return null;

  return (
    <Card className="operacoes-section-card operacoes-filter-card">
      <CardHeader className="space-y-2">
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultValue ?? tabs[0].id} className="space-y-3">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="space-y-3">
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                {tab.content}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface FilterSelectFieldProps<T extends string> {
  label: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  placeholder: string;
  onChange: (nextValue: T) => void;
}

export function FilterSelectField<T extends string>({
  label,
  value,
  options,
  placeholder,
  onChange,
}: FilterSelectFieldProps<T>) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <Select value={value} onValueChange={(nextValue) => onChange(nextValue as T)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
