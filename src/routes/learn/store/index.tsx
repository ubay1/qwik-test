/* eslint-disable @typescript-eslint/no-unused-vars */
import { component$, useClientEffect$, useRef, useStore, useWatch$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div className='m-4 shadow-lg p-4 rounded-md bg-white'>
      <div className='text-pink-900 font-bold text-3xl'>3. Store</div>
      <StoreBasic />
      <StoreRecursive />
    </div>
  );
});

export const StoreBasic = component$(() => {
  const state = useStore({
    count: 0,
    str: "",
  });

  return (
    <div className='ml-4 mt-2'>
      <p className='font-bold'>3a. Basic</p>
      <p>
        di qwik untuk mendefinisikan state menggunakan <b>useStore</b>.
      </p>
      <div className='bg-blue-200 p-4 rounded-md shadow-sm flex flex-col items-center'>
        <p className='text-4xl font-bold'>{state.count}</p>
        <div>
          <button aria-label='btn-add-state-count' onClick$={() => state.count++} className='bg-blue-400 w-10 h-10 p-2'>
            +1
          </button>
          <button
            aria-label='btn-add-state-count'
            onClick$={() => (state.count < 1 ? state.count : state.count--)}
            className='bg-red-400 w-10 h-10 p-2'
          >
            -1
          </button>
        </div>
      </div>
    </div>
  );
});

export const StoreRecursive = component$(() => {
  const state = useStore(
    {
      counter: {
        count: 0,
        str: "",
      },
    },
    { recursive: true },
  );
  return (
    <div className='ml-4 mt-2'>
      <p className='font-bold'>3b. Store Recursive</p>
      <p>
        {" "}
        jika kita memiliki state yang bersarang, kita tidak bisa langsung mengakses state tertetntu. kita harus
        tambahkan <b>recurive: true</b>
      </p>
      <div className='bg-blue-200 p-4 rounded-md shadow-sm flex flex-col items-center'>
        <p className='text-4xl font-bold'>{state.counter.count}</p>
        <div>
          <button
            aria-label='btn-add-state-count'
            onClick$={() => state.counter.count++}
            className='bg-blue-400 w-10 h-10 p-2'
          >
            +1
          </button>
          <button
            aria-label='btn-add-state-count'
            onClick$={() => (state.counter.count < 1 ? state.counter.count : state.counter.count--)}
            className='bg-red-400 w-10 h-10 p-2'
          >
            -1
          </button>
        </div>
      </div>
    </div>
  );
});
