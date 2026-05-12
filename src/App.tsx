import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">
              Mr. Fantastic's Online Emporium
            </h1>
          </div>
        </header>

        {/* Main stuffs */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* More routes will go here later i think */}
          </Routes>
        </main>

        {/* Footer? */}
        <footer className="bg-gray-800 text-white mt-12">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <p>&copy; 2026 Online Shop. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
