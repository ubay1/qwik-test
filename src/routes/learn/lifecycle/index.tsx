// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { component$, useCleanup$, useClientEffect$, useServerMount$, useStore } from "@builder.io/qwik";
import axios from "axios";

type Employee = {
  nilai: number;
  show: boolean;
  data: string[];
};

export default component$(() => {
  const state = useStore<Employee>({
    nilai: 0,
    show: true,
    data: [],
  });

  useServerMount$(async () => {
    try {
      const test = await Promise.all([
        getUserRandom(),
        getUserRandom1(),
        getUserRandom2(),
        getUserRandom3(),
        getUserRandom4(),
        getUserRandom5(),
      ]);

      const tmpData: any[] = [];
      test.forEach((item: any) => {
        tmpData.push(item);
      });

      state.data = tmpData;

      // const response = await getUserRandom();
      // console.log(response.message);

      // state.data = response.message;
    } catch (error) {
      console.log(error);
    }
  });

  // useClientEffect$(() => {
  //   console.log(state.nilai);
  // });

  return (
    <div className='m-4 shadow-lg p-4 rounded-md bg-white'>
      <div className='text-pink-900 font-bold text-3xl'>7. Lifecycle</div>

      <div className='mt-4'>
        <div className='flex flex-wrap gap-4'>
          {state.data.map((item: any, index) => {
            return (
              <div className='bg-blue-200 shadow-md rounded-md p-2 flex flex-col justify-center items-center'>
                <img className='m-2' src={item.image} alt={`img-anjing${index}`} width={50} height={50} />
                <p>{`${item.firstName} ${item.lastName}`}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className='mt-4'>
        <button className='bg-blue-200 p-1' onClick$={() => (state.show = !state.show)}>
          Toggle
        </button>
        {state.show ? <UseMount /> : null}
      </div>
    </div>
  );
});

export const UseMount = component$(() => {
  useCleanup$(() => {
    console.log("UseMount dihapus!");
  });

  return (
    <div>
      <div className='font-bold'>1. UseMount</div>
      <p>
        useMount dijalankan ketika component dibentuk. <br />
        Penggunaan umum untuk useMount$() adalah untuk mengambil data yang diperlukan untuk rendering awal. <br />
        <br />
        variasi useMount$(): <br />
        useServerMount$() hook yang dijalankan pada pemasangan komponen saat berada di lingkungan server. Ini berguna
        karena server sering kali memiliki API yang berbeda untuk mengambil data.
      </p>
    </div>
  );
});

export function randomNumber() {
  const min = 1;
  const max = 100;

  const randomNum = Math.floor(Math.random() * (max - min) + min);

  return randomNum;
}

export async function getUserRandom(): Promise<string[]> {
  try {
    const resp = await axios.get(`https://dummyjson.com/users/${randomNumber()}`);
    const json = await resp.data;
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getUserRandom1(): Promise<string[]> {
  try {
    const resp = await axios.get(`https://dummyjson.com/users/${randomNumber()}`);
    const json = await resp.data;
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getUserRandom2(): Promise<string[]> {
  try {
    const resp = await axios.get(`https://dummyjson.com/users/${randomNumber()}`);
    const json = await resp.data;
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getUserRandom3(): Promise<string[]> {
  try {
    const resp = await axios.get(`https://dummyjson.com/users/${randomNumber()}`);
    const json = await resp.data;
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getUserRandom4(): Promise<string[]> {
  try {
    const resp = await axios.get(`https://dummyjson.com/users/${randomNumber()}`);
    const json = await resp.data;
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getUserRandom5(): Promise<string[]> {
  try {
    const resp = await axios.get(`https://dummyjson.com/users/${randomNumber()}`);
    const json = await resp.data;
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(error);
  }
}

// https://sehatindonesiaku-api-dev.dto.kemkes.go.id
