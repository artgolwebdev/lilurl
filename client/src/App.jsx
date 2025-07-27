//import './App.scss'
import VantaBackground from './components/VantaBackground.jsx';
import LilUrlNavBar from './components/LilUrlNavBar.jsx';
import LilUrlForm from './components/Form.jsx';
import LilurlBabyLogo from './assets/lilurlbaby.png';

function App() {
  return (
    <>  
      <VantaBackground />
      <LilUrlNavBar />
      <div className="container ">
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <LilUrlForm />
        </div>  
      </div>


      <footer className="text-center mt-4 mb-4">

          <div className="mt-4">
          <img
            src={LilurlBabyLogo}
            alt="LilURL Baby Logo"
            style={{ width: '140px' }}
          />
        </div>

        <small>lilurl.baby</small>
      </footer>
      </div>
    </>
  )
}

export default App
