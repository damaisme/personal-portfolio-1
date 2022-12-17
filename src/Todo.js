import {useState, useEffect} from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [activity, setActivity] = useState("");
  const [edit, setEdit] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getLocal = JSON.parse(localStorage.getItem("todos"));
    if (getLocal) {
      setTodos(getLocal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function generateId() {
    return Date.now();
  }

  function saveTodoHandler(event) {
    event.preventDefault();
    if (!activity) {
      return setMessage("Activity jangan kosong");
    }

    if (edit.id) {
      const updatedTodo = {
        ...edit,
        activity,
      };

      const todoIndex = todos.findIndex(function (todo) {
        return todo.id == edit.id;
      });

      const updatedTodos = [...todos];
      updatedTodos[todoIndex] = updatedTodo;
      setTodos(updatedTodos);

      setActivity("");
      setEdit({});
      setMessage("");
      return;
    }

    setTodos([
      {
        id: generateId(),
        activity,
        done: false,
      },
      ...todos,
    ]);
    setMessage("");
    return setActivity("");
  }

  function deleteTodosHandler(todoId) {
    const updateTodos = todos.filter(function (todo) {
      return todo.id != todoId;
    });
    setTodos(updateTodos);
    if (edit.id) {
      setActivity("");
      setEdit({});
    }
  }

  function editTodosHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }

  function cancelEditHandler() {
    setActivity("");
    setMessage("");
    return setEdit({});
  }

  function doneTodoHandler(todo) {
    todo.done ? (todo.done = false) : (todo.done = true);

    const todoIndex = todos.findIndex(function (currentTodo) {
      return currentTodo.id == todo.id;
    });

    const updatedTodos = [...todos];
    updatedTodos[todoIndex] = todo;
    setTodos(updatedTodos);
  }

  return (
    <div className="pt-8 px-24 lg   :px-80 w-100%">
      <h1 className="text-xl font-bold text-center">React Todo List</h1>

      <form onSubmit={saveTodoHandler}>
        <div className="flex mt-4 justify-between">
          <input
            type="text"
            className="block border border-gray-300 bg-gray-50 rounded-lg w-4/6 p-3 text-sm h-10 mr-4"
            placeholder="Activity name"
            value={activity}
            onChange={function (event) {
              setActivity(event.target.value);
            }}
          />

          <div className="w-2/12 flex justify-center">
            <button
              className="block mx-1 bg-blue-500 rounded-md p-2 text-white h-10 w-80%"
              type="submit"
            >
              {!edit.id ? "Add" : "Save"}
            </button>
            {edit.id && (
              <button
                className="block mx-1 bg-red-500 rounded-md p-2 text-white h-10 w-80%"
                type="button"
                onClick={cancelEditHandler}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        {message && (
          <div className="text-xs text-red-500 mt-1 ml-2">{message}</div>
        )}
      </form>

      {todos.length > 0 ? (
        <ul className="mt-8">
          {todos.map(function (item) {
            return (
              <div key={item.id} className="flex justify-between mb-6">
                <input
                  checked={item.done}
                  className="mr-2"
                  type="checkbox"
                  onChange={doneTodoHandler.bind(this, item)}
                ></input>
                <p
                  onClick={doneTodoHandler.bind(this, item)}
                  className="text-lg w-10/12"
                >
                  {item.done ? <strike>{item.activity}</strike> : item.activity}
                </p>
                <div className="w-2/12 flex justify-center">
                  <button
                    onClick={function () {
                      deleteTodosHandler(item.id);
                    }}
                    className="block mx-2 bg-red-500 rounded px-2 py-1 "
                  >
                    X
                  </button>
                  <button
                    onClick={editTodosHandler.bind(this, item)}
                    className="block mx-2 bg-green-500 rounded px-2 py-1"
                  >
                    ✎
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      ) : (
        <div className="flex p-20 justify-center w-100%">
          <p>Tidak ada yang harus dilaukan</p>
        </div>
      )}
    </div>
  );
}

export default Todo;