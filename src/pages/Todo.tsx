import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GNB } from "../components/GNB";
import { ListTodos } from "../components/ListTodos";
import { WriteTodo } from "../components/WriteTodo";

const baseUrl = process.env.REACT_APP_BASE_URL;

export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export const Todo = () => {
  const [todos, setTodos] = useState<ITodo[] | null>(null);
  const [doRendering, setDoRendering] = useState(false);
  const getTodos = async () => {
    try {
      const res = await axios.get(baseUrl + "/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setTodos(res.data);
    } catch (error) {
      alert("할 일 목록을 불러오는 데 실패했습니다");
      console.error(error);
    }
  };
  useEffect(() => {
    localStorage.getItem("access_token") && getTodos();
  }, [doRendering]);
  const navigate = useNavigate();
  useEffect(() => {
    !localStorage.getItem("access_token") && navigate("/");
  }, []);
  return (
    <>
      <header>
        <GNB hasSigned={true} setHasSigned={() => {}} />
      </header>
      <main className="w-screen h-screen flex flex-col items-center mt-20 gap-8">
        <section className="flex flex-col gap-1">
          <label>할일 생성</label>
          <WriteTodo setDoRendering={setDoRendering} />
        </section>
        <section className="flex flex-col gap-1">
          <label>할일 목록</label>
          <ListTodos todos={todos} setDoRendering={setDoRendering} />
        </section>
      </main>
    </>
  );
};
