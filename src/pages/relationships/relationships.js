import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {fetchUsers} from "../../redux/actions/users-actions";
import UserCard from "../../components/user-card";
import useWindowDimensions from "../../hooks/use-window-dimensions";
import MainButton from "../../components/main-button";
import './relationships.scss';
import Spinner from "../../components/spinner";

const Relationships = () => {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const {width} = useWindowDimensions();

  const users = useSelector(state => state.users);
  const usersLoading = useSelector(state => state.usersLoading);
  const usersError = useSelector(state => state.usersError);
  const totalPages = useSelector(state => state.totalPages);

  useEffect(() => {
    if (width > 767) {
      setCount(6);
    } else {
      setCount(3);
    }
  })

  useEffect(() => {
    if (count != 0) {
      dispatch(fetchUsers(count, page));
    }
  }, [dispatch, count, page, fetchUsers])

  const showMoreClickHandler = () => {
    setPage(prevState => prevState + 1);
  }

  const showMoreButton = totalPages != page;

  if (usersLoading) {
    return (<Spinner/>);
  }

  return (
    <div className="container">
      <p className="title">Our cheerful users</p>
      <p className="subtitle">Attention! Sorting users by registration date</p>
      <div className="users-container">
        {users && users.map(user => (<UserCard key={user.id} id={user.id} user={user}/>))}
      </div>
      {showMoreButton && (
        <MainButton onClick={showMoreClickHandler} styles={{marginTop: '10px'}}>Show more</MainButton>)}
    </div>
  );
};

export default Relationships;