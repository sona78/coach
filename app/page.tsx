'use client';

import { newUser } from './actions';
import { useRef } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      // Create an object with the goal data
      const goalData = {
        goal: formData.get('goal')
      };

      // Send to our new API endpoint
      const response = await fetch('/api/goal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData),
      });

      const result = await response.json();
      
      if (result.success) {
        formRef.current?.reset();
        router.push('/events');
      } else {
        alert(result.error || 'Failed to submit goal');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again.');
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Welcome to your personal sounding board.
          </h1>
          <div className="flex flex-col items-center gap-6">
            <p className="text-gray-700 text-center">
              Sign in with your Google account to get started
            </p>
            <button
              onClick={() => signIn("google")}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name || ""}
                className="w-10 h-10 rounded-full"
              />
            )}
            <h2 className="text-xl font-semibold text-gray-900">
              Welcome, {session.user?.name}
            </h2>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <form ref={formRef} className="space-y-6" action={handleSubmit}>
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
              Goal
            </label>
            <input 
              type="text" 
              id="goal"
              name="goal"
              placeholder="What goal do you want to work on?" 
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}