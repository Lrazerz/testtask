import React, {useState, useEffect} from "react";
//todo delete
// import BannerMobile from '../../images/banner-360.png';
// import BannerMobile2x from '../../images/banner-360-2x.png';
// import BannerMobile3x from '../../images/banner-360-3x.png';
// import BannerTablet from '../../images/banner-768.png';
// import BannerTablet2x from '../../images/banner-768-2x.png';
// import BannerTablet3x from '../../images/banner-768-3x.png';
// import BannerDesktop from '../../images/banner-1024.png';
// import BannerDesktop2x from '../../images/banner-1024-2x.png';
// import BannerDesktop3x from '../../images/banner-1024-3x.png';
import './home-page.scss';
import useWindowDimensions from "../../hooks/use-window-dimensions";
import {useHistory} from 'react-router-dom';
import MainButton from "../../components/main-button";

const HomePage = () => {
  const history = useHistory();
  const {wdth} = useWindowDimensions();

  const [width, setWidth] = useState(wdth);

  const [descriptionText, setDescriptionText] = useState(`We kindly remind you that your test
assignment should be submitted as a link to 
github/bitbucket repository.`);

  useEffect(() => {
    if (width > 767 && width < 1024) {
      setDescriptionText(`We kindly remind you that your test assignment should be
submitted as a link to github/bitbucket repository. Please be
patient, we consider and respond to every application that
meets minimum requirements. We look forward to your
sumbission. Good luck! The photo has to scale in the banner
area on the different screens`);
    } else if (width > 1023) {
      setDescriptionText(`We kindly remind you that your test assignment should be submitted
as a link to github/bitbucket repository. Please be patient, we consider
and respond to every application that meets minimum requirements.
We look forward to your sumbission. Good luck! The photo has to scale
in the banner area on the different screens`);
    }
  }, [width]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(wdth);
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, [wdth]);


  return (
    <div className="wrapper">
      <section className="heading-container">
        <p className="text header-text">
          TEST ASSIGNMENT
        </p>
        <p className="text header-text">
          FOR FRONTEND
        </p>
        <p className="text header-text">
          DEVELOPER POSITION
        </p>
      </section>
      <section className="heading-container">
        <pre className="text description-text">
          {descriptionText}
        </pre>
        <MainButton onClick={() => history.push('/signup')}>
          Sign up now
        </MainButton>
      </section>
    </div>
  );
};

export default HomePage;