import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GNB } from "../components/GNB";
import { SignInForm } from "../components/SignInForm";
import { SignUpForm } from "../components/SignUpForm";

export const Auth = () => {
  const [hasSigned, setHasSigned] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("access_token") && navigate("/todo");
  }, []);
  return (
    <>
      <header className="w-screen">
        <GNB hasSigned={hasSigned} setHasSigned={setHasSigned} />
      </header>
      <main className="w-screen h-screen flex justify-center mt-40">
        {hasSigned ? <SignInForm /> : <SignUpForm />}
      </main>
    </>
  );
};
