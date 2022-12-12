import axios from "axios";
import {
  Dispatch,
  FormEvent,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";

const baseUrl = process.env.REACT_APP_BASE_URL;

interface IWriteTodo {
  setDoRendering: Dispatch<SetStateAction<boolean>>;
}

export const WriteTodo: FunctionComponent<IWriteTodo> = ({
  setDoRendering,
}) => {
  const [todo, setTodo] = useState("");
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("새로운 할 일을 생성하시겠습니까?")) {
      try {
        await axios.post(
          baseUrl + "/todos",
          {
            todo,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setTodo("");
        setDoRendering((prev) => !prev);
      } catch (error) {
        alert("할 일 작성에 실패했습니다 다시 시도해주세요");
        console.error(error);
      }
    }
  };
  return (
    <div className="w-[720px]">
      <form
        onSubmit={onSubmit}
        className="bg-slate-400 rounded-2xl p-4 flex justify-between items-center"
      >
        <input
          className="w-[300px] ml-[46px]"
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
        />
        <button className="border border-black rounded-lg py-1 px-7 bg-white hover:bg-transparent">
          제출
        </button>
      </form>
    </div>
  );
};
