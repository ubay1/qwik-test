/* eslint-disable @typescript-eslint/no-unused-vars */
import { component$, useClientEffect$, useRef, useStore, useWatch$ } from "@builder.io/qwik";

interface AppStore {
  countA: number;
  countB: number;
}

export default component$(() => {
  return (
    <div className='m-4 shadow-lg p-4 rounded-md bg-white'>
      <div className='text-pink-900 font-bold text-3xl'>5. Reactivity</div>
      <ImplicitTemplateUpdate />
      <ExplicitTemplateUpdate />
    </div>
  );
});

export const ImplicitTemplateUpdate = component$(() => {
  const store = useStore({
    countA: 0,
    countB: 0,
  });
  console.log("Render: <ImplicitTemplateUpdate>");

  return (
    <div className='ml-4 mt-4'>
      <div className='font-semibold'>5a. Memperbarui Template secara Implicit</div>
      <div className='bg-blue-200 p-4 rounded-md shadow-sm'>
        <button className='bg-red-700 text-white p-1' onClick$={() => store.countA++}>
          a++
        </button>
        <DisplayA store={store} />
        <hr className='my-2 border border-black' />
        <button className='bg-red-700 text-white p-1' onClick$={() => store.countB++}>
          b++
        </button>
        <DisplayB store={store} />
      </div>
      <p className='mt-2'>
        Contoh diatas menunjukkan bagaimana store yang bermutasi secara otomatis memperbarui template. <br />
        Selama rendering SSR, server perlu merender semua komponen dalam aplikasi. <br />
        <br />
        <blockquote className='blockquote'>
          Misalnya, saat <b>DisplayA</b> membaca properti <b>countA</b> dari store, Qwik mencatatnya sebagai
          subscription. Qwik sekarang mengetahui bahwa jika <b>countA</b> berubah maka <b>DisplayA</b> perlu dirender
          ulang. Rendering template akan secara otomatis mengatur subscription di store.{" "}
          <i> Setiap kali template dirender ulang, subscription lama dibuang dan subscription baru dibuat. </i>
        </blockquote>
      </p>
    </div>
  );
});

export const DisplayA = component$((props: { store: AppStore }) => {
  console.log("Render: <DisplayA>");
  return <div>{props.store.countA}</div>;
});

export const DisplayB = component$((props: { store: AppStore }) => {
  console.log("Render: <DisplayB>");
  return <div>{props.store.countB}</div>;
});

export const ExplicitTemplateUpdate = component$(() => {
  return (
    <div>
      <div className='ml-4 mt-4'>
        <div className='font-semibold'>5b. Memperbarui Template secara Explicit</div>
      </div>
    </div>
  );
});
