import React from "react";
import './about-me.scss';
import ManLaptop from '../../images/man-laptop-v1.svg';
import useWindowDimensions from "../../hooks/use-window-dimensions";
import {useHistory} from 'react-router-dom';

const AboutMe = () => {
  const history = useHistory();
  const { width } = useWindowDimensions();

  let DescriptionTextTablet1 = () => (<p className="description">'We will evaluate how clean your approach to writing
    CSS and Javascript code is. You can use any CSS and Javascript 3rd party libraries without any restrictions.</p>)

  let DescriptionTextTablet2 = () => (<p className="description">If 3rd party css/javascript libraries are added to
    the project via bower/npm/yarn you will get bonus points. If you use any task runner (gulp/webpack) you will
    get bonus points as well. Slice service directory page PSD mockup into HTML5/CSS3.</p>);

  if(width > 1023) {
    DescriptionTextTablet1 = () => (<pre className="description">{`We will evaluate how clean your approach to writing CSS and Javascript
code is. You can use any CSS and Javascript 3rd party libraries without any
restrictions.`}</pre>);
    DescriptionTextTablet2 = () => (<pre className="description">{`If 3rd party css/javascript libraries are added to the project via
bower/npm/yarn you will get bonus points. If you use any task runner
(gulp/webpack) you will get bonus points as well. Slice service directory
page PSD mockup into HTML5/CSS3.`}</pre>);
  }



  return (
    <div className="full-wrapper">
      <div className="title-container">
        <p className="title">Let's get acquainted</p>
      </div>
      <div className="main-content-container">
        <img className="man-image" src={ManLaptop} alt="man with laptop" />
        <div className="content-without-image">
          <p class="subtitle">I am cool frontend developer</p>
          <DescriptionTextTablet1 />
          <DescriptionTextTablet2 />
          <p className="description signup-button" style={{cursor: 'pointer'}}
             onClick={() => history.push('/signup')}>
            Sign up now
          </p>
        </div>
      </div>

    </div>
  );
};

export default AboutMe;