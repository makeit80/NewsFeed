import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export default function User({ user }) {
    const { displayName, photoURL, uid } = user;
    const navigate = useNavigate()

    return (
        <UserInfo onClick={() => navigate(`/mypage/${uid}`)}>
            {photoURL ? (<img src={photoURL} alt='avatar' />) : (<img src='https://www.lab2050.org/common/img/default_profile.png' alt='avatar' />)}
            {displayName && <p>{displayName}</p>}
        </UserInfo>
    );
}

const UserInfo = styled.button`
/* display: flex;
align-items: center; */

img {
width:2.5rem;
height: 40px;
border-radius: 50%;
}

p {
text-align: right;
display: none;
}
`



