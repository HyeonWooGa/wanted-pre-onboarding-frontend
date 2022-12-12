import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";

const baseUrl = process.env.REACT_APP_BASE_URL;

interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export const ListTodos = () => {
  const [todos, setTodos] = useState<ITodo[] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoId, setEditTodoId] = useState(0);
  const [editTodo, setEditTodo] = useState("");
  const [editIsCompleted, setEditIsCompleted] = useState(false);
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
      console.error(error);
    }
  };
  useEffect(() => {
    getTodos();
  }, [doRendering]);
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
        console.error(error);
      }
    }
  };
  return (
    <>
      {isEditing ? (
        <div className="w-[720px] border">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className="bg-slate-400 rounded-2xl p-4 flex justify-between items-center mb-4"
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
                        className="border border-black rounded-lg p-1 hover:bg-white"
                      >
                        할것
                      </button>
                    )}
                    <input
                      className={todo.isCompleted ? "line-through" : ""}
                      value={editTodo}
                      onChange={(event) => setEditTodo(event.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={onClickSubmitEdit}
                      className="border border-black rounded-lg p-1 hover:bg-white"
                    >
                      제출
                    </button>
                    <button
                      onClick={onClickCancleEdit}
                      className="border border-black rounded-lg p-1 hover:bg-white"
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
                        className="border border-black rounded-lg p-1 hover:bg-white"
                      >
                        할것
                      </button>
                    )}
                    <span className={todo.isCompleted ? "line-through" : ""}>
                      {todo.todo}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => onClickEdit(todo)}
                      className="border border-black rounded-lg p-1 hover:bg-white"
                    >
                      수정
                    </button>
                    <button className="border border-black rounded-lg p-1 hover:bg-white">
                      삭제
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-[720px] border">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className="bg-slate-400 rounded-2xl p-4 flex justify-between items-center mb-4"
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
                    className="border border-black rounded-lg p-1 hover:bg-white"
                  >
                    할것
                  </button>
                )}
                <span className={todo.isCompleted ? "line-through" : ""}>
                  {todo.todo}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => onClickEdit(todo)}
                  className="border border-black rounded-lg p-1 hover:bg-white"
                >
                  수정
                </button>
                <button className="border border-black rounded-lg p-1 hover:bg-white">
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
