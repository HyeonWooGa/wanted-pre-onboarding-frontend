import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GNB } from "../components/GNB";

export const Todo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    !localStorage.getItem("access_token") && navigate("/");
  }, []);
  return (
    <>
      <header>
        <GNB hasSigned={true} setHasSigned={() => {}} />
      </header>
    </>
  );
};
