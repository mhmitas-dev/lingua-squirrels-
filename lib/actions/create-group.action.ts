"use server";

import { createSupabaseServerClient } from "../supabase/server-client";

// Create Group
export async function createGroup(data: {
    name: string;
    max_members: number;
    languages: string[];
}): Promise<{ success: boolean; message: string }> {
    console.log(data)
    return { success: true, message: "Group created successfully" };
}

// GET Languages for the form
export type Language = {
    id: string;
    name: string;
};

export async function getLanguages(): Promise<{ languages: Language[] | null }> {
    const supabase = await createSupabaseServerClient();

    const { data: languages, error } = await supabase
        .from('languages')
        .select<'id, name'>('id, name'); // typed select

    if (error) {
        // handle error if needed
        return { languages: null };
    }

    return { languages };
}

