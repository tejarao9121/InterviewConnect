import './App.css';
import Home from './components/Home'
import Root from './components/Root';
import Error from './components/Error';
import Login from './components/Login'
import Register from './components/Register';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Help from './components/Help';
import ExpertRegister from './components/ExpertRegister';
import UserProfile from './components/UserProfile';

function App() {

  const x=createBrowserRouter([{
    path:'/',
    element:<Root/>,
    errorElement:<Error/>,
    children:[

      {
        path:'/',
        element:<Home/>,
      },
      {
        path:'/Login',
        element:<Login/>,  
        
      },
      {
        path:'/Register',
        element:<Register/>,
        
      },
      {
        path:'/ExpertRegister',
        element:<ExpertRegister/>,

      },
      {
        path:'/Help',
        element:<Help/>,
        
      },
      {
        path:'/UserProfile',
        element:<UserProfile/>,
    
      }
      // {
      //   path:'/UserProfile',
      //   element:<UserProfile/>,
      //   children:[
      //     {
      //       path:'Addplot',
      //       element:<Addplot/>
      //     },
      //     {
      //       path:'Addrent',
      //       element:<Addrent/>
      //     },
      //     {
      //       path:'AddedItems',
      //       element:<AddedItems/>
      //     },
      //     {
      //       path:'MapPrc',
      //       element:<MapPrc/>
      //     },
      //   ]
      // }
      
    ]

}
])



  return (
    <div className="App">
      <RouterProvider router={x}/>
    </div>
  );
}

export default App;
