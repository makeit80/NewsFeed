import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export default function User({target}) {
    const navigate = useNavigate()
    return (
        <UserInfo onClick={() => navigate(`/mypage/${target.uid}`)}>
            <img src={target?.photoURL} alt='avatar' />
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



