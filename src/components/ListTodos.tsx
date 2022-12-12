import axios from "axios";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { ITodo } from "../pages/Todo";

const baseUrl = process.env.REACT_APP_BASE_URL;

interface IListTodos {
  todos: ITodo[] | null;
  setDoRendering: Dispatch<SetStateAction<boolean>>;
}

export const ListTodos: FunctionComponent<IListTodos> = ({
  todos,
  setDoRendering,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoId, setEditTodoId] = useState(0);
  const [editTodo, setEditTodo] = useState("");
  const [editIsCompleted, setEditIsCompleted] = useState(false);
  const onClickEdit = (todo: ITodo) => {
    setIsEditing(true);
    setEditTodoId(todo.id);
    setEditTodo(todo.todo);
    setEditIsCompleted(todo.isCompleted);
  };
  const onClickCancleEdit = () => {
    setIsEditing(false);
    setEditTodoId(0);
    setEditTodo("");
    setEditIsCompleted(false);
  };
  const onClickSubmitEdit = async () => {
    try {
      await axios.put(
        baseUrl + `/todos/${editTodoId}`,
        {
          todo: editTodo,
          isCompleted: editIsCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setIsEditing(false);
      setEditTodoId(0);
      setEditTodo("");
      setEditIsCompleted(false);
      setDoRendering((prev) => !prev);
    } catch (error) {
      alert("할 일 수정에 실패했습니다 다시 시도해주세요");
      console.error(error);
    }
  };
  const onClickCompleted = async (todo: ITodo) => {
    setEditIsCompleted(todo.isCompleted);
    if (window.confirm("아직 완료하지 못 하셨습니까?")) {
      try {
        await axios.put(
          baseUrl + `/todos/${todo.id}`,
          {
            todo: todo.todo,
            isCompleted: !todo.isCompleted,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setEditIsCompleted(!todo.isCompleted);
        setDoRendering((prev) => !prev);
      } catch (error) {
        alert("오류가 발생했습니다 다시 시도해주세요");
        console.error(error);
      }
    }
  };
  const onClickTodo = async (todo: ITodo) => {
    setEditIsCompleted(todo.isCompleted);
    if (window.confirm("완료 하셨습니까?")) {
      try {
        await axios.put(
          baseUrl + `/todos/${todo.id}`,
          {
            todo: todo.todo,
            isCompleted: !todo.isCompleted,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setEditIsCompleted(!todo.isCompleted);
        setDoRendering((prev) => !prev);
      } catch (error) {
        alert("오류가 발생했습니다 다시 시도해주세요");
        console.error(error);
      }
    }
  };
  const onClickDelete = async (todo: ITodo) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(baseUrl + `/todos/${todo.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setDoRendering((prev) => !prev);
      } catch (error) {
        alert("할 일 삭제에 실패했습니다 다시 시도해주세요");
        console.error(error);
      }
    }
  };
  return (
    <>
      {isEditing ? (
        <div className="w-[720px]">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className={`${
                todo.isCompleted ? "bg-slate-200" : "bg-slate-400"
              } rounded-2xl p-4 flex justify-between items-center mb-4`}
            >
              {editTodoId === todo.id ? (
                <>
                  <div className="flex gap-2 items-center">
                    {todo.isCompleted ? (
                      <button
                        onClick={() => onClickCompleted(todo)}
                        className="border border-black rounded-lg p-1 hover:bg-white"
                      >
                        완료
                      </button>
                    ) : (
                      <button
                        onClick={() => onClickTodo(todo)}
                        className="border border-black rounded-lg p-1 bg-white hover:bg-transparent"
                      >
                        할일
                      </button>
                    )}
                    <input
                      className={`${
                        todo.isCompleted ? "line-through" : ""
                      } w-[300px]`}
                      value={editTodo}
                      onChange={(event) => setEditTodo(event.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={onClickSubmitEdit}
                      className="border border-black rounded-lg p-1 bg-white hover:bg-transparent"
                    >
                      제출
                    </button>
                    <button
                      onClick={onClickCancleEdit}
                      className="border border-black rounded-lg p-1 bg-white hover:bg-transparent"
                    >
                      취소
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-2 items-center">
                    {todo.isCompleted ? (
                      <button
                        onClick={() => onClickCompleted(todo)}
                        className="border border-black rounded-lg p-1 hover:bg-white"
                      >
                        완료
                      </button>
                    ) : (
                      <button
                        onClick={() => onClickTodo(todo)}
                        className="border border-black rounded-lg p-1 bg-white hover:bg-transparent"
                      >
                        할일
                      </button>
                    )}
                    <span className={todo.isCompleted ? "line-through" : ""}>
                      {todo.todo}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => onClickEdit(todo)}
                      className="border border-black rounded-lg p-1 bg-white hover:bg-transparent"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => onClickDelete(todo)}
                      className="border border-black rounded-lg p-1 bg-white hover:bg-transparent"
                    >
                      삭제
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-[720px]">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className={`${
                todo.isCompleted ? "bg-slate-200" : "bg-slate-400"
              } rounded-2xl p-4 flex justify-between items-center mb-4`}
            >
              <div className="flex gap-2 items-center">
                {todo.isCompleted ? (
                  <button
                    onClick={() => onClickCompleted(todo)}
                    className="border border-black rounded-lg p-1 hover:bg-white"
                  >
                    완료
                  </button>
                ) : (
                  <button
                    onClick={() => onClickTodo(todo)}
                    className="border border-black rounded-lg p-1 bg-white hover:bg-transparent"
                  >
                    할일
                  </button>
                )}
                <span className={todo.isCompleted ? "line-through" : ""}>
                  {todo.todo}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => onClickEdit(todo)}
                  className="border border-black rounded-lg p-1 bg-white hover:bg-transparent"
                >
                  수정
                </button>
                <button
                  onClick={() => onClickDelete(todo)}
                  className="border border-black rounded-lg p-1 bg-white hover:bg-transparent"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
