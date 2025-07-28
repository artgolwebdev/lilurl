//import './App.scss'
import VantaBackground from './components/VantaBackground.jsx';
import LilUrlNavBar from './components/LilUrlNavBar.jsx';
import LilUrlForm from './components/Form.jsx';
import LilUrlQRForm from './components/QRForm.jsx';
import LilurlBabyLogo from './assets/lilurlbaby.png';
import LilDashboard from './components/lilDashboard.jsx';

// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
// import required modules
import { EffectCards } from 'swiper/modules';

function App() {
  return (
    <>  
      <VantaBackground />
      <LilUrlNavBar />
      <div className="container ">
      <div className="row mt-4">

        <div className="col-md-6">
          <LilDashboard />
        </div>

        <div className="col-md-6">

              <>
                <Swiper
                  effect={'cards'}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className="mySwiper"
                  spaceBetween={50}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                  initialSlide={5} // <-- Start on second slide (index 1)
                >


                  <SwiperSlide>
                    <div className="card">
                      <div className="card-header">
                          <h2 className='bungee-regular'>Link Virus Scanner</h2>
                      </div>
                      <div className="card-body">
                        <p>Coming soon...</p>
                        <i> Input URL → scan with VirusTotal.</i>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Stay tuned!</small>
                    </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="card">
                      <div className="card-header">
                          <h2 className='bungee-regular'>IP Quality Sqore</h2>
                      </div>
                      <div className="card-body">
                        <p>Coming soon...</p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Stay tuned!</small>
                    </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="card">
                      <div className="card-header">
                          <h2 className='bungee-regular'>IP to country</h2>
                      </div>
                      <div className="card-body">
                        <p>Coming soon...</p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Stay tuned!</small>
                    </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="card">
                      <div className="card-header">
                          <h2 className='bungee-regular'>Link preview</h2>
                      </div>
                      <div className="card-body">
                        <p>Coming soon...</p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Stay tuned!</small>
                    </div>
                    </div>
                  </SwiperSlide>
                  

                  <SwiperSlide> 
                    <LilUrlQRForm/>
                  </SwiperSlide>

                  <SwiperSlide>
                    <LilUrlForm />
                  </SwiperSlide>

                  <SwiperSlide>
                     <div className="card">
                      <div className="card-header">
                          <h2 className='bungee-regular'>Business Card</h2>
                      </div>
                      <div className="card-body">
                        <p>Coming soon...</p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Stay tuned!</small>
                    </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="card">
                      <div className="card-header">
                          <h2 className='bungee-regular'>Link-in-Bio Page Builder</h2>
                      </div>
                      <div className="card-body">
                        <p>Coming soon...</p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Stay tuned!</small>
                    </div>
                    </div>
                  </SwiperSlide>

                   <SwiperSlide>
                    <div className="card">
                      <div className="card-header">
                          <h2 className='bungee-regular'>Link Password Protection</h2>
                      </div>
                      <div className="card-body">
                        <p>Coming soon...</p>
                        <i>Input URL + password → only open with correct password.</i>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Stay tuned!</small>
                    </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="card">
                      <div className="card-header">
                          <h2 className='bungee-regular'>Self-Destructing Link</h2>
                      </div>
                      <div className="card-body">
                        <p>Coming soon...</p>
                        <i>One-click link that deletes itself after N uses or minutes.</i>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Stay tuned!</small>
                    </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="card">
                      <div className="card-header">
                          <h2 className='bungee-regular'>Summarize a Link</h2>
                      </div>
                      <div className="card-body">
                        <p>Coming soon...</p>
                        <i>AI generates a short summary (use readability + GPT).</i>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Stay tuned!</small>
                    </div>
                    </div>
                  </SwiperSlide>

                  
                  <SwiperSlide>
                    <div className="card">
                      <div className="card-header">
                          <h2 className='bungee-regular'>Explain a Link </h2>
                      </div>
                      <div className="card-body">
                        <p>Coming soon...</p>
                        <i>Paste a technical URL → get a human-friendly explanation.</i>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Stay tuned!</small>
                    </div>
                    </div>
                  </SwiperSlide>

                  
                  <SwiperSlide>  
                    <div className="card">
                      <div className="card-header">
                          <h2 className='bungee-regular'>Auto-Tweet a Link  </h2>
                      </div>
                      <div className="card-body">
                        <p>Coming soon...</p>
                        <i>Paste URL → AI writes an engaging tweet thread about it.</i>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Stay tuned!</small>
                    </div>
                    </div>
                  </SwiperSlide>

                   <SwiperSlide>
                    <div className="card">
                      <div className="card-header">
                          <h2 className='bungee-regular'>Generate Hashtags from Link</h2>
                      </div>
                      <div className="card-body">
                        <p>Coming soon...</p>
                        <i> Input URL → get suggested tags based on content.</i>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">Stay tuned!</small>
                    </div>
                    </div>
                  </SwiperSlide>

                </Swiper>
              </>
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
