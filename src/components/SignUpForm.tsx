import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVaild, setIsValid] = useState(false);
  const navigate = useNavigate();
  const onSubmitSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        baseUrl + "/auth/signup",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("email", email);
      navigate("/todo");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (email.includes("@") && password.length >= 8) setIsValid(true);
    else setIsValid(false);
  }, [email, password]);
  return (
    <>
      <form onSubmit={onSubmitSignUp} className="flex flex-col gap-4 w-60">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="@가 포함된 이메일 주소"
            required
            className="border border-black rounded-xl text-sm h-6 pl-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="8자 이상"
            minLength={8}
            required
            className="border border-black rounded-xl text-sm h-6 pl-2"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {isVaild ? (
          <button className="bg-slate-200 rounded-xl py-2">회원가입</button>
        ) : (
          <button className="bg-slate-200 rounded-xl py-2" disabled>
            회원가입
          </button>
        )}
      </form>
    </>
  );
};
