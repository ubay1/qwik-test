/* eslint-disable @typescript-eslint/no-unused-vars */
import { component$, useClientEffect$, useRef, useStore, useWatch$ } from "@builder.io/qwik";

interface IImplicitStore {
  countA: number;
  countB: number;
}
interface IExplicitStore {
  count: number;
  delayCount: number;
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

export const DisplayA = component$((props: { store: IImplicitStore }) => {
  console.log("Render: <DisplayA>");
  return <div>{props.store.countA}</div>;
});

export const DisplayB = component$((props: { store: IImplicitStore }) => {
  console.log("Render: <DisplayB>");
  return <div>{props.store.countB}</div>;
});

export const ExplicitTemplateUpdate = component$(() => {
  const store = useStore({
    count: 0,
    delayCount: 0,
  });
  console.log("Render: <ExplicitTemplateUpdate>");
  useWatch$(({ track }) => {
    track(store, "count");

    const id = setTimeout(() => (store.delayCount = store.count), 2000);
    return () => clearTimeout(id);
  });
  return (
    <div>
      <div className='ml-4 mt-4'>
        <div className='font-semibold'>5b. Memperbarui Template secara Explicit dengan useWatch$</div>
        <p>
          Selain reaktivitas implisit yang dibuat oleh template, Qwik mendukung eksekusi kode secara eksplisit saat
          properti berubah. Ini menggunakan hook useWatch$(). <br />
          <blockquote className='blockquote'>
            hook useWatch$() dijalankan sebelum komponen dirender dan bisa asinkron. Hook juga memiliki fungsi
            pembersihan yang dipanggil pada eksekusi hook berikutnya atau saat komponen dilepas. <br />
            fungsi track untuk mengetahui state pada store mana yang berubah.
          </blockquote>
        </p>

        <div className='bg-blue-200 p-4 mt-4 rounded-md shadow-sm flex flex-col items-start'>
          <div>
            <DisplayCount store={store} />
          </div>
          <div>
            <DisplayDelayCount store={store} />
          </div>
          <button className='bg-sky-700 text-white p-2 rounded-md' onClick$={() => store.count++}>
            +1
          </button>
        </div>
      </div>
    </div>
  );
});

export const DisplayCount = component$((props: { store: IExplicitStore }) => {
  console.log("Render: <DisplayCount>");
  return <>{props.store.count}</>;
});

export const DisplayDelayCount = component$((props: { store: IExplicitStore }) => {
  console.log("Render: <DisplayDelayCount>");
  return <>{props.store.delayCount}</>;
});
