import { FaFile, FaLightbulb, FaSearch } from "react-icons/fa";
const Intro = ()=>
{
    return(
        <div className="Intro">
              <h2>Welcome to SQL Query App Demo</h2>
              <div className="How-to-use">
                <h4><FaLightbulb /> How To Use ?</h4>
                <ol>
                  <li>Enter your query in search bar. Or Choose a prequest quaries.</li>
                  <li>Select number of rows you want to generate from "LIMIT ROWS" option.</li>
                  <li>Choose order of search in Assending /  Dessending form "SORT" option. </li>
                  <li>Tap on search button icon <FaSearch /> to generate result.</li>
                </ol>
              </div>
              <div className="How-to-use">
                <h4> <FaFile /> Output Result</h4>
                <p>This is a demo app, the results genrate is not related to the searched </p>
                <ul>
                  <li>Response "Unsuccessful"  on blank search , Or if any error occured .</li>
                  <li>Response "Successful" when desired result will be generated.</li>
                </ul>
              </div>
              <p>This demo app is not connected to any backend. It a dummy project for Front-end assessment so , the results generate by this app will be same for every case. With hopefully by <a style={{color:'white'}} href="https://www.linkedin.com/in/playshaban/" alt="LinkedIn Profile" target="_blank" rel="noreferrer">Shaban Khan</a> .</p>
            </div>
    );
}

export default Intro;