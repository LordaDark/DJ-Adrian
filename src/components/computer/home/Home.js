import React from 'react';
import Header from './header/Header';
import Title from './title/Title';
import Eventi from './eventi/Eventi';
import Service from './service/Service';
import About from './about/About';
import './Home.css';

const Home = () => {
  return (
    <div>
      <div className='Header'>
        <Header />
      </div>
      <div className='Body'>
        <div className='Home'>
          <div id="title">
            <Title />
          </div>
          <div id="about">
            <About />
          </div>
          <div id="eventi">
            <Eventi />
          </div>
          <div id="service">
            <Service />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
