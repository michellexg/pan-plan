import { useEffect, useState, } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MealList from './MealList.js';
import { AuthProvider, useToken } from './Auth.js';

function GetToken() {
  console.log("I/M HERE??????")
  useToken();
  return null
}

function App() {
  // const [launch_info, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
  //     console.log('fastapi url: ', url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, [])


  // return (
  //   <BrowserRouter>
  //     <div className='container'>
  //       <Routes>
  //         <Route path="/meals" element={<MealList />} />
  //       </Routes>
  //     </div>
  //   </BrowserRouter>
  // );
  return (
    <AuthProvider>
      <BrowserRouter>
        <GetToken />
        <div className='container'>
          <Routes>
            <Route path="/meals" element={<MealList />} />
          </Routes>
        </div>
      </BrowserRouter>
      {/* All of your other components, here */}
    </AuthProvider>
  );
}

export default App;
