import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImageSection from './components/ImageSection';
import Footer from './components/Footer';
import './styles/App.css';
import BrandSection from './components/BrandSection';
import CreateSection from './components/CreateSection';
import Contact from './components/Contact';
import ClickSpark from "./components/ClickSpark";


function App() {
  return (
    
    <div>
      <ClickSpark
      sparkColor="#ff4747"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
      easing="ease-out"
      extraScale={1}
    >
      <Navbar />
      <Hero />
      <BrandSection />
      <ImageSection />
      <CreateSection />
      <Contact />
      <Footer />
      </ClickSpark>
    </div>
  );
}

export default App;
