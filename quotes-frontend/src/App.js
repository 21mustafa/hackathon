// import Home from "./pages/Home/Home";
import AddQuotes from "./pages/AddQuotes/AddQuotes";
import Header from "./components/Card/Card";
import Quote from "./components/Quote/Quote";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Home /> */}
      <Quote />
      <AddQuotes />
    </div>
  );
}

export default App;
