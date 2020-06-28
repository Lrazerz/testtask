import React, {useReducer, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import './sign-up.scss';
import Spinner from "../../components/spinner";
import {fetchPositions, signupUser, USER_REGISTERED} from "../../redux/actions/users-actions";
import MainButton from "../../components/main-button";
import ModalAlert from "../../components/modal-alert";
import useWindowDimensions from "../../hooks/use-window-dimensions";

const initialState = {
  inputValues: {
    name: null,
    email: null,
    phone: '+380 ',
    position: null,
    photo: null,
  },
  inputValidities: {
    name: false,
    email: false,
    phone: false,
    position: false,
    photo: false,
  },
  inputTouched: {
    name: null,
    email: null,
    phone: null,
    position: null,
    photo: null,
  },
  formIsValid: false,
  validationHints: {
    name: 'Name should be 2-60 characters length',
    email: 'Invalid email',
    phone: 'Invalid phone number',
    photo: 'Photo should be jpg/jpeg image, with resolution at least 70x70px and size must not exceed 5MB',
  }
}

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const FORM_INPUT_TOUCHED = "FORM_INPUT_TOUCHED";

const formStateReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE: {
      const updatedValues = {
        ...state.inputValues,
        [action.inputId]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.inputId]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      console.log('updated Validities', updatedValidities);
      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: updatedFormIsValid,
      };
    }
    case FORM_INPUT_TOUCHED: {
      return {
        ...state,
        inputTouched: {
          ...state.inputTouched,
          [action.inputId] : true,
        }
      }
    }
    default: {
      return state;
    }
  }
};

const SignUp = () => {

  const dispatch = useDispatch();

  const positions = useSelector(state => state.positions);
  const isPositionsLoading = useSelector(state => state.positionsLoading);
  const isPositionsError = useSelector(state => state.positionsError);

  const userRegistered = useSelector(state => state.userRegistered);

  const {width} = useWindowDimensions();

  let isImageLoading = false;

  const [reactState, reactDispatch] = useReducer(formStateReducer, initialState);

  const {inputValues, inputValidities, inputTouched, validationHints} = reactState;

  useEffect(() => {
    dispatch(fetchPositions());
  },[dispatch]);

  let subtitleText = `Attention! After successful registration
and alert, update the list of users in the
block from the top`;

  if(width > 767) {
    subtitleText = `Attention! After successful registration and alert, update the 
list of users in the block from the top`
  }

  const regPhone = /((\+380)? \d{2} \d{3} \d{2} \d{2})/;

  const emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  const handleNumberChange = (value) => {

      // auto formatting with spaces
      if(value.length === 4 && inputValues.phone.length === 3
        || value.length === 7 && inputValues.phone.length === 6
        || value.length === 11 && inputValues.phone.length === 10
        || value.length === 14 && inputValues.phone.length === 13) {
        value += ' ';
      } // deleting space causes to deleting space and last number
      else if(value.length === 4 && inputValues.phone.length === 5
        || value.length === 7 && inputValues.phone.length === 8
        || value.length === 11 && inputValues.phone.length === 12
        || value.length === 14 && inputValues.phone.length === 15) {
        value = value.substring(0, value.length - 1);
      }

      const strWithoutPlusAndSpaces = value.substring(1).replace(/ /g,'');

      if (isNaN(strWithoutPlusAndSpaces) || value.length < 5 || !value.startsWith('+380 ')) {
        reactDispatch({type: FORM_INPUT_UPDATE, inputId: 'phone', value: inputValues.phone,
          isValid: false});
      } else {
        reactDispatch({type: FORM_INPUT_UPDATE, inputId: 'phone', value: value, isValid: true})
      }

  }

  const handleNameChange = (value) => {
    if(value.length < 2) {
      reactDispatch({type: FORM_INPUT_UPDATE, inputId: 'name', value: value, isValid: false})
    } else if (value.length > 60) {
      reactDispatch({type: FORM_INPUT_UPDATE, inputId: 'name', value: inputValues.name, isValid: false})
    } else {
      reactDispatch({type: FORM_INPUT_UPDATE, inputId: 'name', value: value, isValid: true})
    }
  }

  const handleEmailChange = (value) => {
    reactDispatch({type: FORM_INPUT_UPDATE, inputId: 'email', value: value, isValid: true});
  }

  const handleEmailBlur = (value) => {
    if(!emailReg.test(value)) {
      reactDispatch({type: FORM_INPUT_UPDATE, inputId: 'email', value: value, isValid: false});
    }
  }

  const handleNumberBlur = (value) => {
    if(!regPhone.test(value)) {
      reactDispatch({type:FORM_INPUT_UPDATE, inputId: 'phone', value:value, isValid: false});
    }
  };

  const inputTouchedHandler = (target) => {
    if(!inputTouched[`${target}`]) {
      reactDispatch({type: FORM_INPUT_TOUCHED, inputId: target})
    }
  }

  const handlePhotoChange = (fileInfo, value) => {

    isImageLoading = true;
    //check file dimensions
    const _URL = window.URL || window.webkitURL;
    let img = new Image();
    const objectUrl = _URL.createObjectURL(fileInfo);
    img.onload = function () {
      if(img.width < 70 || img.height < 70) {
        validationHints.photo = 'Resolution should be at least 70x70px';
        reactDispatch({type: FORM_INPUT_UPDATE, inputId: 'photo', value: "", isValid: false});
      }
      _URL.revokeObjectURL(objectUrl);
      isImageLoading = false;
    };
    img.src = objectUrl;


    //check file size
    if(fileInfo.size > 5242880) {
      validationHints.photo = 'Size must not exceed 5MB';
      reactDispatch({type: FORM_INPUT_UPDATE, inputId: 'photo', value: "", isValid: false});
    } else {
      reactDispatch({type: FORM_INPUT_UPDATE, inputId: 'photo', value: value, isValid: true});
    }

  }

  const handlePositionChange = (value) => {
    reactDispatch({type: FORM_INPUT_UPDATE, inputId: 'position', value: value, isValid: true});
  }

  const handleSubmit = () => {
    if(reactState.formIsValid) {

      let formData = new FormData();
      let fileField = document.querySelector('input[type="file"]');

      formData.append('position_id', inputValues.position);
      formData.append('name', inputValues.name);
      formData.append('email', inputValues.email);
      formData.append('phone', inputValues.phone.replace(/ /g,''));
      formData.append('photo', fileField.files[0]);

      dispatch(signupUser(formData));
    }
  }

  const handleModalClose = () => {
    dispatch({type: USER_REGISTERED, registered: false});
  }

  if(isPositionsLoading || isImageLoading) {
    return (<Spinner />);
  }

  const blurSettings = userRegistered ? {filter: 'blur(5px) brightness(0.4)'} : null;

  return (
    <>
      <div className="signup-wrapper" style={blurSettings}>
        <p className="title">
          Register to get a work
        </p>
        <pre className="subtitle">
          {subtitleText}
        </pre>
        <form>
          <label htmlFor="name" className="label">Name</label>
          <input className="input" type="text" id="name" name="name" minLength="2" maxLength="60"
                 placeholder="Your name" required onFocus={e => inputTouchedHandler(e.target.id)}
                 value={inputTouched.name ? inputValues.name : ""}
                 onChange={e => handleNameChange(e.target.value)} disabled={userRegistered}
          />
          <p className="hint">{inputTouched.name && !inputValidities.name && validationHints.name}</p>

          <label htmlFor="email" className="label">Email</label>
          <input className="input" type="email" id="email" name="email" minLength="2" maxLength="60"
                 placeholder="Your email" required onFocus={e => inputTouchedHandler(e.target.id)}
                 value={inputTouched.email ? inputValues.email : ""} disabled={userRegistered}
                 onChange={e => handleEmailChange(e.target.value)} onBlur={e => handleEmailBlur(e.target.value)} />
          <p className="hint">{inputTouched.email && !inputValidities.email && validationHints.email}</p>

          <label htmlFor="phone" className="label">Phone number</label>
          <input className="input" type="tel" id="phone" name="phone" minLength="17" maxLength="17"
                 placeholder="+380 XX XXX XX XX" required onFocus={e => inputTouchedHandler(e.target.id)}
                 value={inputTouched.phone ? inputValues.phone : ""} disabled={userRegistered}
                 onChange={e => handleNumberChange(e.target.value)}
                 onBlur={e => handleNumberBlur(e.target.value)}/>
          <p className="hint">{inputTouched.phone && !inputValidities.phone && validationHints.phone}</p>

          <div className="positions-container">
            <label className="label">Select your position</label>
            {positions.length > 0 && positions.map(position => (
              <div className="label position" key={position.id}>
                <input type="radio" id={position.id} name="position" value={position.id}
                       onChange={e => handlePositionChange(e.target.value)} required disabled={userRegistered}/>
                <label className="position-label" htmlFor={position.id}>{position.name}</label>
              </div>
            ))}
          </div>

          <label htmlFor="photo" className="label">Photo</label>
          <input className="photo" type="file" id="photo" name="photo" required accept="image/png, image/jpeg"
                 value={inputValues.photo == "" ? "" : null} disabled={userRegistered}
                 onFocus={e => inputTouchedHandler(e.target.id)}
                 onChange={e => handlePhotoChange(e.target.files[0], e.target.value)}/>
           <p className="hint">{inputTouched.photo && !inputValidities.photo && validationHints.photo}</p>
        </form>
        <MainButton onClick={handleSubmit}>Sign up now</MainButton>
        {!reactState.formIsValid && inputValues.email && (<p className="hint">Fill up form with valid values first</p>)}
      </div>
    {userRegistered && <ModalAlert onClick={handleModalClose}/>}
  </>
  )
}

export default SignUp;