
import React from 'react';

const StaticExport = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Export Instructions</h1>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">❗ Important Note</h2>
        <p className="text-gray-700">
          This is a React application that cannot be converted to simple HTML files because it uses:
          <br />• Dynamic state management
          <br />• Component-based architecture  
          <br />• Modern JavaScript features
          <br />• Build-time compilation
        </p>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">🚀 Option 1: Run Locally with Node.js</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Download and install <a href="https://nodejs.org/" className="text-blue-600 underline">Node.js</a></li>
            <li>Download your project files from Lovable</li>
            <li>Open terminal/command prompt in the project folder</li>
            <li>Run: <code className="bg-gray-100 px-2 py-1 rounded">npm install</code></li>
            <li>Run: <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code></li>
            <li>Open your browser to <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:5173</code></li>
          </ol>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">🌐 Option 2: Deploy Online</h2>
          <p className="text-gray-700 mb-3">Deploy your app to these free platforms:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li><a href="https://vercel.com" className="text-blue-600 underline">Vercel</a> - Easiest for React apps</li>
            <li><a href="https://netlify.com" className="text-blue-600 underline">Netlify</a> - Great for static sites</li>
            <li><a href="https://pages.github.com" className="text-blue-600 underline">GitHub Pages</a> - Free with GitHub</li>
          </ul>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">📱 Option 3: Build for Production</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>In your project folder, run: <code className="bg-gray-100 px-2 py-1 rounded">npm run build</code></li>
            <li>This creates a <code className="bg-gray-100 px-2 py-1 rounded">dist</code> folder with optimized files</li>
            <li>Upload the <code className="bg-gray-100 px-2 py-1 rounded">dist</code> folder contents to any web server</li>
            <li>Note: You'll still need a server that can handle React routing</li>
          </ol>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800">
          <strong>Recommendation:</strong> Use Option 1 (local Node.js) for development and testing, 
          then Option 2 (online deployment) for sharing with others.
        </p>
      </div>
    </div>
  );
};

export default StaticExport;
