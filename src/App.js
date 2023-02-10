
import "./App.css";
import Dragndrop from "./components/Dragndrop";

const App = () => {
  const data = [
    { title: "group-1", items: [1, 2, 3, 4] },
    { title: "group-2", items: [5, 6, 7] },
    { title: "group-3", items: [8, 9] },
  ];
  return (
    <div className="container">
      <div className="inner-container">
        <Dragndrop data={data} />
      </div>
    </div>
    );
};

export default App;
