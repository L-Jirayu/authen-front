import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './css/SignupPage.css';

const SignupPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    tel: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim() || !form.confirmPassword.trim() || !form.name.trim() || !form.tel.trim()) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    if (!form.email.includes('@') || !form.email.includes('.')) {
      alert("รูปแบบอีเมลไม่ถูกต้อง");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }

    if (!/^\d+$/.test(form.tel)) {
      alert("เบอร์โทรต้องเป็นตัวเลขเท่านั้น");
      return;
    }

    try {
      const res = await fetch('https://minifeed-back.onrender.com/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
          tel: form.tel,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert('สมัครสมาชิกไม่สำเร็จ');
        return;
      }

      alert('สมัครสมาชิกสำเร็จ! โปรดล็อกอิน');
      window.location.href = '/';
    } catch (err) {
      alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <h2>สมัครสมาชิก</h2>
      <form onSubmit={handleSignup} autoComplete="off">
        <input type="text" name="fakeusernameremembered" style={{ display: 'none' }} />
        <input type="password" name="fakepasswordremembered" style={{ display: 'none' }} />

        <div className="input-wrapper">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="new-email"
          />
        </div>

        <div className="input-wrapper">
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-eye"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="input-wrapper">
          <div className="password-wrapper">
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="toggle-eye"
              aria-label="Toggle confirm password visibility"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="input-wrapper">
          <input
            type="tel"
            name="tel"
            placeholder="Tel"
            value={form.tel}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <button type="submit" className="signup-btn">Signup</button>
      </form>

      <p className="login-link">
        มีบัญชีอยู่แล้ว? <Link to="/">เข้าสู่ระบบ</Link>
      </p>
    </div>
  );
};

export default SignupPage;
