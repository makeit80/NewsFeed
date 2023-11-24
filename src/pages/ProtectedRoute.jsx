import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requireUser }) {
    const userData = useSelector((state) => state.userData);
    //requireUser가 트루이면 마이페이지 보여주고 false일 때만 회원가입을 보여줌. 
    //유저가 필수인 상태 + 유저 id 존재하면 마이페이지 보여줌.
    //유저가 필수 상태가 아님 + 유저 id 존재 안하면 회원가입 안보여줌. 
    if ((requireUser && userData.uid) || (!requireUser && !userData.uid)) return children;
    return <Navigate to='/' replace />;
}

