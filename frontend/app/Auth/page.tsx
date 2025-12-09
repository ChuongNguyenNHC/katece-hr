"use client";

import React, { useState } from 'react';

export default function TestPage() {
    const [loginData, setLoginData] = useState({ login: '', password: '' });
    const [registerData, setRegisterData] = useState({
        username: '', email: '', password: '', fullName: '', position: '', phone: '', cccd: ''
    });

    const handleLogin = async (e :any) => {
        e.prevenDefault();
        const res = await fetch('http://localhost:5000/api/taikhoan/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });

        const result = await res.json();
        console.log('Login Result:', result);
        alert(JSON.stringify(result));
    }

    const handleRegister = async (e: any) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/taikhoan/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerData)
        });

        const result = await res.json();
        // console.log('Register Result:', result);
        console.log('Đăng ký thành công');
        // alert(JSON.stringify(result));
        alert('Đăng ký thành công');
    }

    return (
        <div style={{ display: "flex", gap: "40px", padding: "40px", fontFamily: "sans-serif",}}>

      {/* LOGIN FORM */}
      <form
        onSubmit={handleLogin}
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          width: "300px",
          borderRadius: "8px",
        }}>
        <h2>Login</h2>

        <label>Username / Email</label>
        <input
          type="text"
          value={loginData.login}
          onChange={(e) =>
            setLoginData({ ...loginData, login: e.target.value })
          }
          style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
        />

        <label>Password</label>
        <input
          type="password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "8px",
            background: "black",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      {/* REGISTER FORM */}
      <form
        onSubmit={handleRegister}
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          width: "300px",
          borderRadius: "8px",
        }}
      >
        <h2>Register</h2>

        <label>Username</label>
        <input
          type="text"
          value={registerData.username}
          onChange={(e) =>
            setRegisterData({ ...registerData, username: e.target.value })
          }
          style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
        />

        <label>Email</label>
        <input
          type="email"
          value={registerData.email}
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
          style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
        />

        <label>Password</label>
        <input
          type="password"
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
          style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
        />

        <label>Full Name</label>
        <input
          type="text"
          value={registerData.fullName}
          onChange={(e) =>
            setRegisterData({ ...registerData, fullName: e.target.value })
          }
          style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
        />

        <label>Position</label>
        <input
          type="text"
          value={registerData.position}
          onChange={(e) =>
            setRegisterData({ ...registerData, position: e.target.value })
          }
          style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
        />
        <label>Phone</label>
        <input
          type="text"
          value={registerData.phone}
          onChange={(e) =>
            setRegisterData({ ...registerData, phone: e.target.value })
          }
          style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
        />
        <label>CCCD</label>
        <input
          type="text"
          value={registerData.cccd}
          onChange={(e) =>
            setRegisterData({ ...registerData, cccd: e.target.value })
          }
          style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "8px",
            background: "green",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}