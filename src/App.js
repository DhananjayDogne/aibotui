import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import MentalHealthChatbot from "./components/message";

function App() {
  return (
    <div className="">
      <Router>
          <Nav />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<MentalHealthChatbot />} />
            {/* <Route path="/" element={<Chat />} /> */}
          </Routes>

      </Router>
    </div>
  );
}

export default App;
