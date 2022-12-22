import {ChakraProvider} from '@chakra-ui/react';
import {BrrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navigation from '../components/partials/Navigation';



import './App.css';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navigation/>
        <Routes>
          <Route/>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </ChakraProvider>
  );
}



export default App;
