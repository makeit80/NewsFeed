import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requireUser }) {
    const userData = useSelector((state) => state.userData);
    //유저가 필수인 상태 + 유저 id 존재하면 마이페이지 보여줌.
    //유저가 필수 상태가 아님 + 유저 id 존재 안하면 회원가입 안보여줌. 
    //마이페이지에서 새로고침하면 유저 데이터 정보를 뒤늦게 받아와서 홈으로 이동하는 문제 발생.. 
    if ((requireUser && userData.uid) || (!requireUser && !userData.uid)) return children;
    return <Navigate to='/' replace />;


}
