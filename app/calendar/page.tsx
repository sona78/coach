"use client";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Calendar from "@/components/Calendar";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <main className="flex flex-col items-center gap-10 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Welcome to Calendar App
          </h1>
          <p className="text-gray-900 text-center">
            Sign in with your Google account to view and manage your calendar
          </p>
          <button
            onClick={() => signIn("google")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign in with Google
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <main className="flex flex-col items-center gap-10 w-full max-w-4xl">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-4">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name || ""}
                className="w-10 h-10 rounded-full"
              />
            )}
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome, {session.user?.name}
            </h1>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
        <Calendar />
      </main>
    </div>
  );
}
