import { component$, useContext } from "@builder.io/qwik";
import { TodosContext } from "./index";

export default component$(() => {
  const todos = useContext(TodosContext);

  return (
    <ul>
      {todos.items.map((item) => (
        <li>
          {item.name} - {item.phone}
        </li>
      ))}
    </ul>
  );
});
