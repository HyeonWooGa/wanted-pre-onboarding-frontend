import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IGNB {
  hasSigned: boolean;
  setHasSigned: Dispatch<SetStateAction<boolean>>;
}

export const GNB: FunctionComponent<IGNB> = ({ hasSigned, setHasSigned }) => {
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);
  const onClickSignUp = () => {
    setHasSigned(false);
    navigate("/");
  };
  const onClickTodo = () => {
    navigate("/todo");
  };
  const onClickLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.clear();
      navigate("/");
    }
  };
  const onClickSignIn = () => {
    setHasSigned(true);
    navigate("/");
  };
  return (
    <div className="w-screen flex justify-between items-baseline gap-2 px-8 py-4">
      <ul className="flex gap-4">
        <li>
          {email ? (
            <button
              disabled
              onClick={onClickSignUp}
              className={pathname === "/" && !hasSigned ? "text-slate-400" : ""}
            >
              회원가입
            </button>
          ) : (
            <button
              onClick={onClickSignUp}
              className={pathname === "/" && !hasSigned ? "text-slate-400" : ""}
            >
              회원가입
            </button>
          )}
        </li>
        <li>
          {email ? (
            <button
              onClick={onClickTodo}
              className={pathname === "/todo" ? "text-slate-400" : ""}
            >
              투두 리스트
            </button>
          ) : (
            <button
              disabled
              onClick={onClickTodo}
              className={pathname === "/todo" ? "text-slate-400" : ""}
            >
              투두 리스트
            </button>
          )}
        </li>
      </ul>
      <div className="flex gap-2 items-baseline">
        {email ? (
          <>
            <span>{email}</span>
            <button onClick={onClickLogout} className="text-xs">
              로그아웃 ＞
            </button>
          </>
        ) : (
          <>
            <span>
              <button
                onClick={onClickSignIn}
                className={
                  pathname === "/" && hasSigned ? "text-slate-400" : ""
                }
              >
                로그인 ＞
              </button>
            </span>
          </>
        )}
      </div>
    </div>
  );
};
