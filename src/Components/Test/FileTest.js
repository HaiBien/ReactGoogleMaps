import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import ExportExcel from "../ExcelExport/ExportExcel";
import Map from "../Maps/MapConponent";



function FileTest() {

  const [txt, setTxt] = useState(undefined);

  function handleChange() {
    setTxt('a');
    console.log('txt', txt);
  }

  return (
    <>
      <button onClick={() => handleChange()}>sau</button>

      <Router>
          <Link to={'/'}> home</Link>
          <Link to={'/map'}> map</Link>



          <Switch>
            <Route exact path="/"> <ExportExcel/> </Route>
            <Route path="/map"> <Map/> </Route>
        </Switch>
      </Router>
    </>
  );
}

export default React.memo(FileTest)