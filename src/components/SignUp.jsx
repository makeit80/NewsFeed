import React, { useState } from 'react';
import { signUp } from 'api/firebase';
import { styled } from 'styled-components';

export default function SignUp() {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    return (
        <StyleForm onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email'>Email : </label>
                <input type="email" id='email' placeholder='email' name='email' value={form.email} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='password'>Password : </label>
                <input type='password' id='password' placeholder='6자 이상 입력하세요' name='password' value={form.password} onChange={handleChange} />
            </div>
            <button onClick={() => signUp(form.email, form.password)}>회원가입</button>
        </StyleForm>
    );
}

const StyleForm = styled.form`
    display:flex;
    flex-direction:column;
`
