import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState(`{
  "data": [
    "A->B",
    "A->C",
    "B->D"
  ]
}`);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://bajaj-task-oa-1.onrender.com/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: input
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Invalid JSON or server error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>BFHL Hierarchy Builder</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {loading ? "Processing..." : "Submit"}
      </button>

      {result && (
        <div className="result">
          <h2>Response</h2>

          <pre>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;