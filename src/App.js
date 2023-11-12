import logo from "./logo.svg";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./App.scss";
import Data from "./components/Data";
import Intro from "./components/Intro";
function App() {
  //flag for Welcome Screen, which will apear only for the first time.
  const [flag, setFlag] = useState(true);

  //for query textarea input
  const [query, setQuery] = useState("");
  //set query limit
  const [limit, setLimit] = useState(100);
  //sorting order , 0 for assending ,1 for dessending
  const [sort, setSort] = useState(0);

  //for disabling search button while we are getting data from backend
  const [disableBtn, setDisableBtn] = useState(false);

  //for storing last searched query
  const [searched, setSearched] = useState("");

  //response status code
  const [response, setResponse] = useState(null);
  //number of queries
  const [qnumber, setQnumber] = useState(0);
  //flag to check if we got any response from back or not
  const [status, setStatus] = useState(0);

  //clear text input field, button
  const [clear, setClear] = useState(false);

  //for handling query input
  const handleQuery = (e) => {
    setClear(true);
    setQuery(e.target.value);
    if (e.target.value === "") {
      setClear(false);
      return;
    }
  };

  //for clear-button
  const clearInput = () => {
    setQuery("");
    setClear(false);
  };

  const [jsonData, setJsonData] = useState(null);

  const handleSubmit = async (e) => {
    setFlag(false);
    setDisableBtn(true);
    e.preventDefault();
    if (query === "") {
      setResponse("Unsuccessfull");
      setSearched(query);
      setDisableBtn(false);
      setJsonData("");
      setQnumber(0);
      setStatus(0);
      return;
    }
    try {
      const response = await fetch("product.json");
      const data = await response.json();
      let reversed;
      if(sort) {
        reversed = data.reverse();
      }else{
        reversed = data;
      }
      const slicedData = reversed.slice(0, limit);
      setJsonData(slicedData);
      setResponse("Successful");
      setQnumber(slicedData.length);
      setSearched(query);
      setStatus(200);
      setDisableBtn(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Unsuccessful");
      setSearched(query);
      setDisableBtn(false);
      setQnumber(0);
      setStatus(0);
    }
  };

  //changing limit
  const handleSelectChange = async (event) => {
    const selectedLimit = parseInt(event.target.value);
    setLimit(selectedLimit);
  };

  //changing sorting order
  const handleSort = (e) => {
    setSort(e.target.value);
  };


  //for cheking up page performance 
  useEffect(() => {
    const startTime = performance.now();
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    console.log(`Page load time: ${loadTime} milliseconds`);
  }, []); 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>SQL Query App</h1>
      </header>
      <div className="Main-Container">
        <div className="Search-area">
          <form onSubmit={handleSubmit} method="get">
            <div className="Fields">
              <textarea
                rows="2"
                placeholder="Type Your Query Here |"
                value={query}
                onChange={handleQuery}
              />
              <span
                className="Clear-Button"
                onClick={clearInput}
                style={{ display: clear ? "block" : "none" }}
              >
                X
              </span>
            </div>
            <button disabled={disableBtn}>
              <FaSearch />
            </button>
          </form>
          <div className="Predefine">
            <table>
              <tr>
                <td>PREDEFINE QUERIES</td>
                <td>
                  <select onChange={(e) => handleQuery(e)}>
                    <option value="">CHOOSE</option>
                    <option value="SELECT * FROM PRODUCTS">
                      SELECT * FROM PRODUCTS
                    </option>
                    <option value="SELECT ProductID , ProductName FROM PRODUCTS">
                      SELECT ProductID , ProductName FROM PRODUCTS
                    </option>
                  </select>
                </td>
                <td>
                  <label>LIMIT ROWS</label>
                </td>
                <td>
                  <select onChange={(e) => handleSelectChange(e)}>
                    <option value="100"> 100</option>
                    <option value="10"> 10</option>
                    <option value="25"> 25</option>
                    <option value="50"> 50</option>
                  </select>
                </td>
                <td>Sort</td>
                <td>
                  <select onChange={(e) => handleSort(e)}>
                    <option value="0"> ASSENDING</option>
                    <option value="1"> DESSENDING</option>
                  </select>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="Data-Container">
          {flag ? (
            <Intro />
          ) : (
            <Data
              searched={searched}
              status={status}
              response={response}
              qnumber={qnumber}
              jsonData={jsonData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
