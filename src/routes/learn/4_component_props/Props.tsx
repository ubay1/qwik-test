/* eslint-disable @typescript-eslint/no-unused-vars */
import { component$, mutable, useClientEffect$, useRef, useStore, useWatch$ } from "@builder.io/qwik";

interface IPropsBasic {
  name: string;
}
interface IDisplayProps {
  count: number;
}

export const Props = component$(() => {
  const state = useStore<IDisplayProps>({
    count: 0,
  });

  return (
    <div className='mb-4'>
      <div className='text-pink-900'>4. Component Props</div>
      <PropsBasic name={"ubay delonge"} />

      <div className='ml-4 mt-4'>
        <p className='font-bold'>4b. Mutable Props</p>

        <button aria-label='btn-add-state-count' onClick$={() => state.count++} className='bg-blue-400 w-10 h-10 p-2'>
          +1
        </button>
      </div>
      <MutableProps count={mutable(state.count)} />
      <PassingStore />
    </div>
  );
});

export const PropsBasic = component$((props: IPropsBasic) => {
  const contohProps = `
  export const App = component$(() => {
    return (
      <div>
        <PropsBasic name="ubay delonge"/>
      </div>
    );
  });
  
  interface IPropsBasic {
    name: string;
  }

  export const PropsBasic = (props: IPropsBasic) => {
    return <div>{props.name}</div>;
  };
  `;
  return (
    <div className='ml-4 mt-2'>
      <p className='font-bold'>4a. Passing data ke component</p>
      <p>untuk props di qwik mirip seperti react</p>
      <p className='font-bold text-3xl mb-4'>
        hasil props {`->`} {props.name}
      </p>

      <pre className='bg-slate-800 whitespace-pre-wrap break-words text-left text-xs p-2'>
        <code className='text-white'> {contohProps} </code>
      </pre>
    </div>
  );
});

export const MutableProps = component$((props: IDisplayProps) => {
  const contohMutableProps = `
  interface IDisplayProps {
    count: number;
  }

  export const App = component$(() => {
    const state = useStore<IDisplayProps>({
      count: 0,
    });

    return (
      <div>
        <button onClick$={() => state.count++}>
          +1
        </button>
        <Mutableprops count={state.count}/> // tanpa mutable
        <Mutableprops count={mutable(state.count)}/> // dengan mutable
      </div>
    );
  });

  export const Mutableprops = (props: IDisplayProps) => {
    return <div>hasil props = {props.count}</div>;
  };
  `;

  return (
    <div className='ml-4 mt-2'>
      <p>Hasil props = {props.count}</p>
      <hr className='my-4' />

      <pre className='bg-slate-800 whitespace-pre-wrap break-words text-left text-xs p-2'>
        <code className='text-white'> {contohMutableProps} </code>
      </pre>
      <p>
        Contoh di atas adalah penghitung sederhana. Dalam hal ini, komponen <b>Display</b> hanya bertanggung jawab untuk
        menampilkan nilai hitungan. <br />
        Saat Anda mengklik tombol +1, <b>store.count</b> bertambah, tetapi tidak ada yang terjadi. <br />
        Tindakan ini seharusnya menyebabkan komponen <b>App dan Display</b> dirender ulang, tetapi tidak dengan
        implementasi saat ini. <br />
        <br />
        Secara default, Qwik menganggap semua pengikatan properti bersifat statis. Saat ini, tidak ada cara bagi runtime
        untuk mengetahui apakah suatu properti statis atau berubah selama masa pakai aplikasi. <br />
        <br />
        Semua properti dianggap statis kecuali jika ditandai dengan <b>mutable()</b>.
      </p>
    </div>
  );
});

export const PassingStore = component$(() => {
  const contohPassingStore = `
  interface CountStore {
    count: number;
  }
  export const App = component$(() => {
    const store = useStore<CountStore>({ count: 0 });
  
    return (
      <>
        <button onClick$={() => store.count++}>+1</button>
        <Display store={store} />
      </>
    );
  });
  
  interface DisplayProps {
    store: CountStore;
  }
  export const Display = component$((props: DisplayProps) => {
    return <div>The count is: {props.store.count}</div>;
  });
  `;

  return (
    <div className='ml-4 mt-4'>
      <p className='font-bold'>4c. Passing Stores</p>

      <pre className='bg-slate-800 whitespace-pre-wrap break-words text-left text-xs p-2'>
        <code className='text-white'> {contohPassingStore} </code>
      </pre>

      <hr className='my-4' />

      <p>
        penjelasan sebelumnya yaitu <b>mutable()</b> menunjukkan bahwa Qwik menganggap semua props statis agar tetap
        efisien. <br /> <br />
        Di luar fakta bahwa mengetik <b>mutable()</b> adalah pekerjaan ekstra, contoh sebelumnya juga tidak efisien
        dengan caranya sendiri. <br /> <br />
        Saat Anda mengklik tombol +1, <b>App</b> dirender ulang untuk memperbarui binding <b>Display</b>. Re-rendering
        <b>App</b> diperlukan untuk memperbarui props <b>Display</b>, tetapi proses ini tidak memperbarui apa yang
        dilihat pengguna, sehingga membuang-buang sumber daya. Pendekatan yang lebih baik adalah dengan hanya merender
        ulang komponen <b>Display</b> dengan meneruskan <b>interface CountStore</b> daripada nilai hitungan. <br />
        Karena referensi state tidak pernah berubah, komponen <b>App</b> tidak perlu dirender ulang.
      </p>
    </div>
  );
});
