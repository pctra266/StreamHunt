// LoginPage.tsx
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    flow: 'auth-code',
    scope: [
      'openid',
      'profile',
      'email',
      'https://www.googleapis.com/auth/youtube'
    ].join(' '),
    onSuccess: async (tokenResponse) => {
      const code = tokenResponse.code;
  
      const res = await fetch('http://localhost:8080/api/oauth/google/exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
  
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('access_token', data.access_token);
        alert('Đăng nhập thành công!');
      } else {
        alert('Đăng nhập thất bại!');
      }
    },
    onError: () => {
      alert('Đăng nhập thất bại!');
    },
  });
  

  return (
    <div className="bg-black flex justify-center items-center h-screen">
      <button
        onClick={() => login()}
        className="bg-white text-black px-4 py-2 rounded"
      >
        Đăng nhập với Google
      </button>
    </div>
  );
};

export default LoginPage;
