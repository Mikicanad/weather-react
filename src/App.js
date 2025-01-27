
import Weather from "./Weather"
import './App.css';
import { FadeLoader } from "react-spinners";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Hello World!
        </h1>
        <Weather city="Tokyo"/>
        <FadeLoader loading={true} size={100} color="green"/>
      </header>
    </div>
  );
}

export default App;
