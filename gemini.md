Great\! Let's move on to **Phase 4: Dashboard Protection**. This is where we create the actual "app" experience, ensuring only authenticated users can access it and redirecting users who aren't logged in.

## 🟢 Phase 4: Dashboard Protection (Creating a Protected Route)

### **Goal**

Create a simple route group, `/app`, which will serve as the restricted area of your application. We will place a `/dashboard` page inside this group, using the secure server client to verify the user's session before rendering any content.

### **Step 4.1: Create the Protected Route Directory**

Create the following folder structure inside your `app/` directory:

```
app/
└── (root)/
└── app/             # <-- New protected route group
    ├── layout.tsx   # <-- Protection logic goes here
    └── dashboard/
        └── page.tsx # <-- The landing page
```

### **Step 4.2: Create the Protected Layout (`app/app/layout.tsx`)**

The most robust way to protect a group of routes in Next.js App Router is to put the authentication check in a dedicated layout file. This layout runs on the server and checks the session **before** any child components (like the dashboard) are rendered.

**Action:** Create and populate the following file: `app/app/layout.tsx`

```tsx
// app/app/layout.tsx

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import React from "react";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    // 1. Initialize the secure server client
    const supabase = await createSupabaseServerClient();

    // 2. Fetch the user session securely
    const { data: { user } } = await supabase.auth.getUser();

    // 3. Protection Logic: If no user, redirect them to the home page (login)
    if (!user) {
        // You can add a URL parameter to the redirect if you want to show a message
        // e.g., redirect("/?message=Please log in to continue")
        return redirect("/"); 
    }

    // 4. Check for profile completion (optional, but good practice)
    // You could fetch the profile here and redirect to /onboarding if the username is missing
    // For now, we will assume the trigger handled the basic profile creation.

    return (
        <div className="flex-grow p-8">
            {/* You can add a protected sidebar or header here */}
            {children}
        </div>
    );
}
```

### **Step 4.3: Create the Dashboard Page (`app/app/dashboard/page.tsx`)**

This page is now guaranteed to be accessed by an authenticated user. You can safely fetch user-specific data here.

**Action:** Create and populate the following file: `app/app/dashboard/page.tsx`

```tsx
// app/app/dashboard/page.tsx

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const supabase = await createSupabaseServerClient();
    
    // We already checked for a user in the layout, but fetching it again here 
    // allows us to use the user data directly in this page.
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch the user's profile data (which we know exists due to the trigger)
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url, username')
        .eq('id', user?.id)
        .single();

    // Simple display of profile information
    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight">
                Welcome, {profile?.full_name || 'Language Squirrel'}!
            </h1>
            <p className="text-lg text-muted-foreground">
                You have successfully signed in and your basic profile is ready.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
                <h2 className="text-xl font-semibold mb-4">Your Profile Snapshot</h2>
                <div className="flex items-center space-x-4">
                    <img 
                        src={profile?.avatar_url || '/default-avatar.png'} 
                        alt="Avatar" 
                        className="w-16 h-16 rounded-full" 
                    />
                    <div>
                        <p><strong>Username:</strong> {profile?.username || 'N/A'}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                    </div>
                </div>
            </div>
            
            <p className="text-sm pt-4">
                Now you can start adding your native and target languages!
            </p>
        </div>
    );
}
```

-----

## ✅ Current Status

You have successfully implemented a **secure, robust, and automatically syncing authentication flow**:

1.  **Database & Security:** `profiles` table created with RLS.
2.  **Automation:** Profile row automatically created on sign-in via a database trigger.
3.  **Type Safety:** Supabase clients are strongly typed.
4.  **Protection:** The `/app/dashboard` route is protected using server-side session checks.

## ➡️ Next Step: User Profile Completion

Since your core goal of seamless sign-in is complete, the next logical step is to allow the user to update their profile beyond the initial data provided by Google (like setting a custom **username**).

**Would you like to build the component to allow users to update their profile (starting with a username)?**