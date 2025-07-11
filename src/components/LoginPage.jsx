import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/LoginPage.css';

const LoginPage = ({ setIsAuthenticated }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/user/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
          navigate('/interface');
        }
      })
      .catch((err) => {
        console.log('No login session:', err);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      alert("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domainRegex = /\./;

    if (!emailRegex.test(form.email) || !domainRegex.test(form.email)) {
      alert("รูปแบบอีเมลไม่ถูกต้อง");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        credentials: 'include', // สำคัญ! เพื่อให้รับ/ส่ง cookie
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.json();
        alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        setForm({ email: '', password: '' });
        return;
      }

      // Login สำเร็จ ถึงเปลี่ยนหน้า
      navigate('/interface');
    } 
    catch (err) {
      console.error(err);
      alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
      setForm({ email: '', password: '' });
    }
  };

  return (
    <div className="login-container">
      <h2>เข้าสู่ระบบ</h2>
      <form onSubmit={handleLogin} autoComplete="off">
        {/* ป้องกัน browser auto-fill อย่างแรง */}
        <input type="text" name="fakeusernameremembered" style={{ display: 'none' }} />
        <input type="password" name="fakepasswordremembered" style={{ display: 'none' }} />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <button type="submit" className="login-btn">Login</button>
      </form>

      <p className="signup-redirect">
        ยังไม่มีบัญชี? <Link to="/signup">สมัครเลย</Link>
      </p>
    </div>
  );
};

export default LoginPage;
