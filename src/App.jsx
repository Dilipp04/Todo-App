import { useState } from "react";

export default function TodoApp() {

  // ── State ────────────────────────────────────────────────────────
  const [todos, setTodos] = useState([
    { id: 1, text: "Buy groceries" },
    { id: 2, text: "Complete React assignment" },
    { id: 3, text: "Call the bank" },
  ]);

  const [inputText, setInputText] = useState("");  // controlled input for the add field

  const [editId, setEditId] = useState(null);  // id of the todo being edited (null = none)
  const [editText, setEditText] = useState("");     // current text inside the edit input


  // ── TODO 1: handleAdd ────────────────────────────────────────────
  // Called when the "Add" button is clicked.
  // Should:
  //   a) Do nothing if inputText is empty (or only spaces) — use .trim()
  //   b) Add a new todo object { id, text } to the todos array
  //      Hint for unique id: Date.now()  gives a unique number each time
  //   c) Clear the inputText back to ""
  //
  function handleAdd() {
    // your code here

    setTodos([...todos, { id: todos.length + 1, text: inputText }])
    setInputText("")
  }


  // ── TODO 2: handleDelete ─────────────────────────────────────────
  // Called with the id of the todo to remove.
  // Should remove that one todo from the array and keep the rest.
  // Hint: setTodos( todos.filter(...) )
  //
  function handleDelete(id) {
    // your code heres
    setTodos(todos.filter((val, i) => val.id != id))

  }


  // ── TODO 3a: handleEditStart ─────────────────────────────────────
  // Called when the ✏️ pencil button is clicked.
  // Should tell the app which todo is being edited and pre-fill the edit input.
  // Hint: setEditId(id)  and  setEditText(currentText)
  //
  function handleEditStart(id, currentText) {
    // your code here
    setEditId(id)
    setEditText(currentText)

  }


  // ── TODO 3b: handleEditSave ──────────────────────────────────────
  // Called when the "Save" button is clicked during editing.
  // Should:
  //   a) Update the text of the todo whose id === editId
  //      Hint: setTodos( todos.map(t => t.id === editId ? { ...t, text: editText } : t) )
  //   b) Reset editId to null and editText to "" so we exit edit mode
  //
  function handleEditSave() {
    const updatedTodos = todos.map((todo) =>
      todo.id === editId
        ? { ...todo, text: editText }
        : todo
    );

    setTodos(updatedTodos);
    setEditId("");
    setEditText("");
  }


  // ── Styles (no need to change) ───────────────────────────────────
  const s = {
    page: {
      minHeight: "100vh",
      background: "#f5f3ff",
      display: "flex",
      justifyContent: "center",
      padding: "48px 16px",
      fontFamily: "sans-serif",
    },
    card: {
      background: "#fff",
      borderRadius: 18,
      padding: 28,
      width: "100%",
      maxWidth: 480,
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      height: "fit-content",
    },
    title: {
      fontSize: 26,
      fontWeight: 700,
      color: "#4c1d95",
      marginBottom: 22,
    },
    row: {
      display: "flex",
      gap: 8,
      marginBottom: 24,
    },
    textInput: {
      flex: 1,
      padding: "10px 14px",
      fontSize: 15,
      border: "2px solid #ede9fe",
      borderRadius: 10,
      outline: "none",
      color: "#111",
    },
    addBtn: {
      padding: "10px 20px",
      background: "#7c3aed",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      fontSize: 15,
      fontWeight: 600,
      cursor: "pointer",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    item: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "#faf5ff",
      border: "1.5px solid #ede9fe",
      borderRadius: 12,
      padding: "12px 14px",
    },
    itemText: {
      flex: 1,
      fontSize: 15,
      color: "#1a1a1a",
    },
    editInput: {
      flex: 1,
      fontSize: 15,
      padding: "4px 8px",
      border: "1.5px solid #7c3aed",
      borderRadius: 8,
      outline: "none",
      color: "#111",
    },
    iconBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 18,
      padding: 4,
      borderRadius: 6,
      lineHeight: 1,
    },
    saveBtn: {
      padding: "4px 12px",
      background: "#7c3aed",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
    },
    empty: {
      textAlign: "center",
      color: "#a78bfa",
      fontSize: 14,
      padding: "24px 0",
    },
  };

  // ── JSX (UI already written) ─────────────────────────────────────
  return (
    <div style={s.page}>
      <div style={s.card}>
        <h1 style={s.title}>📝 My Todo List</h1>

        {/* Add new todo */}
        <div style={s.row}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={inputText}
            style={s.textInput}
            onChange={e => setInputText(e.target.value)}
          />
          <button style={s.addBtn} onClick={handleAdd}>
            Add
          </button>
        </div>

        {/* Todo list */}
        {todos.length === 0 ? (
          <p style={s.empty}>No tasks yet — add one above!</p>
        ) : (
          <ul style={s.list}>
            {todos.map(todo => (
              <li key={todo.id} style={s.item}>

                {/* If this todo is being edited, show an input + Save button */}
                {editId === todo.id ? (
                  <>
                    <input
                      style={s.editInput}
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                    />
                    <button style={s.saveBtn} onClick={handleEditSave}>
                      Save
                    </button>
                  </>
                ) : (
                  /* Otherwise show the todo text + action buttons */
                  <>
                    <span style={s.itemText}>{todo.text}</span>

                    {/* ✏️ Pencil — clicking this should start editing */}
                    <button
                      style={s.iconBtn}
                      title="Edit"
                      onClick={() => handleEditStart(todo.id, todo.text)}
                    >
                      ✏️
                    </button>

                    {/* 🗑 Delete — clicking this should remove the todo */}
                    <button
                      style={s.iconBtn}
                      title="Delete"
                      onClick={() => handleDelete(todo.id)}
                    >
                      🗑️
                    </button>
                  </>
                )}

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}