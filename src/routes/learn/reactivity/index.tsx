/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  component$,
  useStore,
  useWatch$,
  useMount$,
  useClientEffect$,
  useRef,
  Resource,
  useServerMount$,
} from "@builder.io/qwik";
import axios from "axios";
import store from "../store";

interface IImplicitStore {
  countA: number;
  countB: number;
}
interface IExplicitUseWatchStore {
  count: number;
  delayCount: number;
}
interface IExplicitUseWResourceStore {
  animeTitle: string;
  loading: boolean;
  data: string[];
  errorMessage: string;
}

export default component$(() => {
  return (
    <div className='m-4 shadow-lg p-4 rounded-md bg-white'>
      <div className='text-pink-900 font-bold text-3xl'>5. Reactivity</div>
      <ImplicitTemplateUpdate />
      <ExplicitTemplateUpdateUseWatch />
      <ExplicitTemplateUpdateUseResource />
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

export const ExplicitTemplateUpdateUseWatch = component$(() => {
  const store = useStore({
    count: 0,
    delayCount: 0,
  });
  console.log("Render: <ExplicitTemplateUpdateUseWatch>");
  useWatch$(({ track }) => {
    track(store, "count");

    const id = setTimeout(() => (store.delayCount = store.count), 2000);
    return () => clearTimeout(id);
  });
  return (
    <div className='ml-4 mt-4'>
      <div className='font-semibold'>5b. Memperbarui Template secara Explicit dengan useWatch$</div>
      <p>
        Selain reaktivitas implisit yang dibuat oleh template, Qwik mendukung eksekusi kode secara eksplisit saat
        properti berubah. Ini menggunakan hook useWatch$(). <br />
        <blockquote className='blockquote'>
          hook useWatch$() dijalankan sebelum komponen dirender dan bisa asinkron. Hook juga memiliki fungsi pembersihan
          yang dipanggil pada eksekusi hook berikutnya atau saat komponen dilepas. <br />
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
  );
});

export const DisplayCount = component$((props: { store: IExplicitUseWatchStore }) => {
  console.log("Render: <DisplayCount>");
  return <>{props.store.count}</>;
});

export const DisplayDelayCount = component$((props: { store: IExplicitUseWatchStore }) => {
  console.log("Render: <DisplayDelayCount>");
  return <>{props.store.delayCount}</>;
});

export const ExplicitTemplateUpdateUseResource = component$(() => {
  const state = useStore<IExplicitUseWResourceStore>({
    animeTitle: "",
    loading: false,
    data: [],
    errorMessage: "",
  });

  useServerMount$(async () => {
    if (state.animeTitle !== "") {
      const response = await getRepositories(state.animeTitle);

      state.data = response;
    }
  });

  // const reposResource = useResource$<string[]>(({ track, cleanup }) => {
  //   // We need a way to re-run fetching data whenever the `github.org` changes.
  //   // Use `track` to trigger re-running of this data fetching function.
  //   track(state, "animeTitle");

  //   // A good practice is to use `AbortController` to abort the fetching of data if
  //   // new request comes in. We create a new `AbortController` and register a `cleanup`
  //   // function which is called when this function re-runs.
  //   // const controller = new AbortController();
  //   cleanup(() => state);

  //   // Fetch the data and return the promises.
  //   return getRepositories(state.animeTitle);
  // });

  useWatch$(({ track }) => {
    track(state, "animeTitle");
  });

  const aHref = useRef();
  useClientEffect$(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      console.log(JSON.parse(JSON.stringify(state)));
      changeAnime(state);
    };
    aHref.current?.addEventListener("click", handler);
    return () => aHref.current?.removeEventListener("click", handler);
  });

  return (
    <div className='ml-4 mt-4'>
      <div className='font-semibold'>5c. Memperbarui Template secara Explicit dengan useResource$</div>

      <div>
        <span>
          <label htmlFor='input-anime'>Judul Anime</label>
          <div className='border flex rounded-md border-gray-700'>
            <input
              id='input-anime'
              className='w-full px-1  rounded-l-md focus:outline-none'
              value={state.animeTitle}
              onKeyUp$={(e) => (state.animeTitle = (e.target as HTMLInputElement).value)}
            />
            <button className='bg-blue-200 px-2 rounded-r-md focus:outline-none' ref={aHref}>
              cari
            </button>
          </div>
        </span>
        <div>
          {/* <Resource
            resource={reposResource}
            onPending={() => <>Loading...</>} // pending
            onRejected={(error) => <>Error: {error.message}</>} // promise reject
            onResolved={(repos: any[]) => (
              <div>
                {repos.map((repo: { anime: string; character: string; quote: string }) => {
                  return (
                    <div className='bg-blue-200 p-2 shadow-md rounded-md my-2'>
                      <div>Anime: {repo.anime}</div>
                      <div>Character: {repo.character}</div>
                      <div>
                        Quote: <p className='italic'>"{repo.quote}"</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          /> */}
          <div>
            {state.loading ? (
              <div>Loading ..</div>
            ) : state.errorMessage ? (
              <p>Error: {state.errorMessage}</p>
            ) : (
              <div>
                {(state.data as any).map((repo: { anime: string; character: string; quote: string }) => {
                  return (
                    <div className='bg-blue-200 p-2 shadow-md rounded-md my-2'>
                      <div>Anime: {repo.anime}</div>
                      <div>Character: {repo.character}</div>
                      <div>
                        Quote: <p className='italic'>"{repo.quote}"</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export async function getRepositories(title: string): Promise<string[]> {
  try {
    const resp = await axios.get(`https://animechan.vercel.app/api/quotes/anime?title=${title}`);
    const json = await resp.data;
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const changeAnime = async (props: IExplicitUseWResourceStore) => {
  props.loading = true;
  try {
    const res = await getRepositories(props.animeTitle);
    props.data = res;
    props.errorMessage = "";
  } catch (error) {
    console.log(error);
    props.errorMessage = (error as any).message;
  } finally {
    props.loading = false;
  }
};
