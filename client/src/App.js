import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000")
      .then((res) => {
        setMessage(res.data);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, []);

  return (
    <div className="p-6 text-2xl text-green-600">
      {message || "Loading..."}
    </div>
  );
}

export default App;
