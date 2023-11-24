import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export default function User() {
    const userData = useSelector((state) => state.userData);
    const { photoURL, uid } = userData;
    const navigate = useNavigate()

    return (
        <UserInfo onClick={() => navigate(`/mypage/${uid}`)}>
            <img src={photoURL} alt='avatar' />
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



