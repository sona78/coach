export default function Home() {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            
          </h1>
  
          <form className="space-y-6">
            <div>
              <label htmlFor="situation" className="block text-sm font-medium text-gray-700 mb-2">
                Situation
              </label>
              <input 
                type="text" 
                id="situation"
                placeholder="Please share the situation:" 
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="reaction" className="block text-sm font-medium text-gray-700 mb-2">
                Reaction
              </label>
              <input 
                type="text" 
                id="reaction"
                placeholder="How did you respond?" 
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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