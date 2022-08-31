import { component$, createContext, useContextProvider, useStore } from "@builder.io/qwik";
import GetContext from "./getContext";

export default component$(() => {
  return (
    <div className='m-4 shadow-lg p-4 rounded-md bg-white'>
      <div className='text-pink-900 font-bold text-3xl'>6. useContext</div>
      <p>
        Gunakan konteks untuk meneruskan data dari parent ke komponen anak tanpa secara eksplisit meneruskannya melalui
        komponen (dikenal sebagai prop drilling). <br /> Konteks berguna untuk berbagi data yang diperlukan di seluruh
        komponen aplikasi. Misalnya informasi gaya, status aplikasi, atau pengguna yang saat ini masuk.
      </p>

      <ContohContext />
    </div>
  );
});

// contoh context
export interface TodosStore {
  items: { name: string; phone: number }[];
}

export const TodosContext = createContext<TodosStore>("Todos");
export const ContohContext = component$(() => {
  useContextProvider(
    TodosContext,
    useStore<TodosStore>({
      items: [
        { name: "ubay", phone: 123 },
        { name: "khansa", phone: 4421 },
      ],
    }),
  );

  return (
    <div className='bg-blue-200 p-4 rounded-md shadow-sm flex flex-col items-center'>
      <GetContext />
    </div>
  );
});
