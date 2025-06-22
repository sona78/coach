'use client';

import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const formRef = useRef<HTMLFormElement>(null);
  const [feedback, setFeedback] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!session) {
      alert('You must be signed in to submit events');
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);
      const eventData = {
        situation: formData.get('situation'),
        reaction: formData.get('reaction')
      };

      const response = await fetch('/api/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();
      
      if (result.success) {
        formRef.current?.reset();
        setFeedback(result.feedback);
      } else {
        alert(result.error || 'Failed to submit event');
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
    return <div>Please sign in to access this page.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Record Your Experience
        </h1>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="situation" className="block text-sm font-medium text-gray-700 mb-2">
              Situation
            </label>
            <input 
              type="text" 
              id="situation"
              name="situation"
              placeholder="Please share the situation here" 
              className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
              required
            />
          </div>
          
          <div>
            <label htmlFor="reaction" className="block text-sm font-medium text-gray-700 mb-2">
              Reaction
            </label>
            <input 
              type="text" 
              id="reaction"
              name="reaction"
              placeholder="How did you respond?" 
              className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
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
        
        {feedback && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Feedback:</h2>
            <p className="text-gray-700">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}