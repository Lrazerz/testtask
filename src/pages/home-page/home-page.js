import React from "react";
import BannerPhoto from '../../images/banner-photo.jpg';
import './home-page.scss';
import useWindowDimensions from "../../hooks/use-window-dimensions";
import {useHistory} from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();
  const { width } = useWindowDimensions();

  let descriptionText = `We kindly remind you that your test
assignment should be submitted as a link to 
github/bitbucket repository.`

  if(width > 767) {
    descriptionText = `We kindly remind you that your test assignment should be
submitted as a link to github/bitbucket repository. Please be
patient, we consider and respond to every application that
meets minimum requirements. We look forward to your
sumbission. Good luck! The photo has to scale in the banner
area on the different screens`;
  }

  if(width > 1023) {
    descriptionText = `We kindly remind you that your test assignment should be submitted
as a link to github/bitbucket repository. Please be patient, we consider
and respond to every application that meets minimum requirements.
We look forward to your sumbission. Good luck! The photo has to scale
in the banner area on the different screens`;
  }

  return (
    <div className="wrapper" style={{backgroundImage: `url(${BannerPhoto})`}}>
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
        <button className="signup-button" onClick={() => history.push('/signup')}>
          Sign up now
        </button>
      </section>
    </div>
  );
};

export default HomePage;