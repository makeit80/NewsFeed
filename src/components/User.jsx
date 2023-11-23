import React from 'react';
import { styled } from 'styled-components';

export default function User({ user }) {
    console.log(user);
    const { displayName, photoURL } = user;
    return (
        <UserInfo>
            {photoURL ? (<img src={photoURL} alt='avatar' />) : (<img src='https://www.lab2050.org/common/img/default_profile.png' alt='avatar' />)}
            {displayName && <p>{displayName}</p>}
        </UserInfo>
    );
}

const UserInfo = styled.div`
   display: flex;
   align-items: center;
   img{
    width:2.5rem;
    height: 2.5rem;
    padding:0.3rem;
    border-radius: 50%;
   }
`



