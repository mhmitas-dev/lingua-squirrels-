"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { createGroup, getLanguages } from "@/lib/actions/create-group.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useAuth } from "../providers/AuthProvider";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

// Types
interface Language {
    id: string;
    name: string;
}

// Schema
const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Use at least 2 characters" })
        .max(100, { message: "Name must be between 2 and 100 characters" }),
    languages: z
        .array(z.string())
        .min(1, { message: "Select at least one language" })
        .max(2, { message: "You can select up to 2 languages" }),
    max_members: z
        .number()
        .min(1, { message: "Minimum 1 member" })
        .max(20, { message: "Maximum 20 members allowed" }),
});

type FormData = z.infer<typeof formSchema>;

// Components
// ============================================================================

// Language Chip Component
interface LanguageChipProps {
    language: Language;
    onRemove: () => void;
}

function LanguageChip({ language, onRemove }: LanguageChipProps) {
    return (
        <div className="relative flex items-center pl-2 pr-6 h-7 rounded-full bg-muted text-sm font-medium">
            {language.name}
            <button
                type="button"
                onClick={onRemove}
                className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full hover:bg-destructive/20 transition-colors"
                aria-label={`Remove ${language.name}`}
            >
                <X className="h-3 w-3 text-destructive" />
            </button>
        </div>
    );
}

// Language Dropdown Component
interface LanguageDropdownProps {
    languages: Language[];
    selectedLanguages: Language[];
    onLanguageChange: (languages: Language[]) => void;
}

// Main Component
// ============================================================================
export function CreateGroupForm() {
    const { user, isLoading } = useAuth();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);

    // Form setup
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            languages: [],
            max_members: 1,
        },
    });

    // Effects
    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const { languages } = await getLanguages();
                setLanguages(languages || []);
            } catch (error) {
                console.error("Failed to fetch languages:", error);
            }
        };

        fetchLanguages();
    }, []);

    // Sync form with selected languages
    useEffect(() => {
        form.setValue(
            "languages",
            selectedLanguages.map((lang) => lang.id),
            { shouldValidate: true }
        );
    }, [selectedLanguages, form]);

    // Handlers
    const handleSubmit = async (data: FormData) => {
        try {
            const res = await createGroup({
                name: data.name,
                max_members: data.max_members,
                languages: data.languages,
            });
            if (res.success) {
                toast.success(res.message);
            }
            resetForm();
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Failed to create group:", error);
        }
    };

    const resetForm = () => {
        form.reset();
        setSelectedLanguages([]);
    };

    const handleRemoveLanguage = (languageId: string) => {
        setSelectedLanguages((prev) =>
            prev.filter((lang) => lang.id !== languageId)
        );
    };

    // Render
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button disabled={!user || isLoading}>Create a new group</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Create New Group</DialogTitle>
                    <DialogDescription>
                        Enter the details for your new room here.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Topic</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="What will your group discuss?"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="max_members"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maximum Members</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={20}
                                            placeholder="Enter maximum members"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormItem>
                            <FormLabel>Languages (max 2)</FormLabel>

                            {/* Selected Languages Display */}
                            <div className="mb-3 min-h-11 rounded-md border border-dashed p-2 bg-muted/20">
                                {selectedLanguages.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        No languages selected
                                    </p>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedLanguages.map((language) => (
                                            <LanguageChip
                                                key={language.id}
                                                language={language}
                                                onRemove={() => handleRemoveLanguage(language.id)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Language Selection */}
                            <LanguageDropdown
                                languages={languages}
                                selectedLanguages={selectedLanguages}
                                onLanguageChange={setSelectedLanguages}
                            />
                            <FormMessage>
                                {form.formState.errors.languages?.message}
                            </FormMessage>
                        </FormItem>

                        <DialogFooter>
                            <Button type="submit" className="w-full sm:w-auto">
                                Create Group
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function LanguageDropdown({
    languages,
    selectedLanguages,
    onLanguageChange,
}: LanguageDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredLanguages = languages.filter(
        (lang) =>
            !selectedLanguages.some((selected) => selected.id === lang.id) &&
            lang.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (language: Language) => {
        if (selectedLanguages.length < 2) {
            onLanguageChange([...selectedLanguages, language]);
            setSearchQuery("");
        }
    };

    const isSelected = (languageId: string) =>
        selectedLanguages.some((lang) => lang.id === languageId);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isOpen}
                    className="w-full justify-between"
                >
                    {selectedLanguages.length === 0
                        ? "Select languages (max 2)"
                        : `${selectedLanguages.length} selected`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder="Search languages..."
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No languages found</CommandEmpty>
                        <CommandGroup>
                            {filteredLanguages.map((language) => (
                                <CommandItem
                                    key={language.id}
                                    value={language.name}
                                    onSelect={() => handleSelect(language)}
                                    disabled={selectedLanguages.length >= 2}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            isSelected(language.id) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {language.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

