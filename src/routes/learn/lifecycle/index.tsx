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
        getImagesRandom(),
        getImagesRandom1(),
        getImagesRandom2(),
        getImagesRandom3(),
        getImagesRandom4(),
        getImagesRandom5(),
      ]);

      const tmpData: any[] = [];
      test.forEach((item: any) => {
        item.message.forEach((item2: any) => {
          tmpData.push(item2);
        });
      });

      state.data = tmpData;

      // const response = await getImagesRandom();
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
        <div className='flex flex-wrap'>
          {state.data.map((item, index) => {
            return <img className='m-2' src={item} alt={`img-anjing${index}`} width={50} height={50} />;
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

export async function getImagesRandom(): Promise<string[]> {
  try {
    const resp = await axios.get(`https://dog.ceo/api/breeds/image/random/3`);
    const json = await resp.data;
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getImagesRandom1(): Promise<string[]> {
  try {
    const resp = await axios.get(`https://dog.ceo/api/breeds/image/random/3`);
    const json = await resp.data;
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getImagesRandom2(): Promise<string[]> {
  try {
    const resp = await axios.get(`https://dog.ceo/api/breeds/image/random/3`);
    const json = await resp.data;
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getImagesRandom3(): Promise<string[]> {
  try {
    const resp = await axios.get(`https://dog.ceo/api/breeds/image/random/3`);
    const json = await resp.data;
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getImagesRandom4(): Promise<string[]> {
  try {
    const resp = await axios.get(`https://dog.ceo/api/breeds/image/random/3`);
    const json = await resp.data;
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getImagesRandom5(): Promise<string[]> {
  try {
    const resp = await axios.get(`https://dog.ceo/api/breeds/image/random/3`);
    const json = await resp.data;
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(error);
  }
}

// https://sehatindonesiaku-api-dev.dto.kemkes.go.id
