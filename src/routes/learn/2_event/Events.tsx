/* eslint-disable @typescript-eslint/no-unused-vars */
import { component$, useClientEffect$, useRef, useStore, useWatch$ } from "@builder.io/qwik";

export const Events = component$(() => {
  return (
    <div className='mb-4'>
      <EventListener />
      <GlobalEvent />
      <PreventDefault />
      <SynchronusEvent />
    </div>
  );
});

export const EventListener = component$(() => {
  const state = useStore({
    count: 0,
    str: "",
  });
  return (
    <div>
      <div className='text-pink-900'>2. Events</div>
      <div className='bg-blue-200 p-4 rounded-md shadow-sm'>
        <span className='font-bold bg-red-400 p-2'>{state.count}</span>
        <div>
          <button className='bg-blue-400 rounded-md p-2 mt-2' onClick$={() => state.count++}>
            +1
          </button>
        </div>

        <div className='flex flex-col'>
          <label for='input'>Event Input</label>
          <input
            type='text'
            id='input'
            className='w-40'
            value={state.str}
            onKeyUp$={(e) => (state.str = (e.target as HTMLInputElement).value)}
          />
          {state.str}
        </div>
      </div>
    </div>
  );
});

export const GlobalEvent = component$(() => {
  const store = useStore({ x: 0, y: 0 });

  return (
    <div className='ml-4 mt-4'>
      <div className='font-semibold'>2a. Global Event</div>
      <p>global event itu conttohnya seperti: deteksi posisi mouse, scroll to top </p>
      <p>
        Qwik punya prefix <b>document:</b> dan <b>window:</b> untuk menggunakan global event
      </p>

      <div className='bg-blue-200 p-4 rounded-md shadow-sm'>
        <div
          window:onMouseMove$={(event) => {
            store.x = event.x;
            store.y = event.y;
          }}
        >
          Your mouse location is ({store.x}, {store.y}).
        </div>

        {/* <div window:onScroll$={(event) => event.}></div> */}
      </div>
    </div>
  );
});

export const PreventDefault = component$(() => {
  const store = useStore({
    email: "",
    password: "",
  });

  return (
    <div className='ml-4 mt-4'>
      <div className='font-semibold'>2b. Event PreventDefault</div>
      <a
        href='/'
        className='bg-red-700 text-white p-1'
        preventdefault:click
        onClick$={() => alert("prefent default click.")}
      >
        click me!
      </a>

      <form
        preventDefault:submit
        onSubmit$={(e) => {
          store.email = (e.target as HTMLInputElement | any)[0].value;
          store.password = (e.target as HTMLInputElement | any)[1].value;
        }}
        className='bg-blue-200 p-4 mt-4 rounded-md shadow-md flex flex-col justify-center items-center'
      >
        <div className='w-1/2'>
          <div className='flex flex-col'>
            <label for='form-email'>Email</label>
            <input
              type='email'
              name='email'
              id='form-email'
              value={store.email}
              placeholder='masukan email'
              className='h-9 px-2'
            />
          </div>
          <div className='flex flex-col mt-4'>
            <label for='form-password'>Password</label>
            <input
              type='password'
              name='password'
              id='form-password'
              value={store.password}
              placeholder='masukan password'
              className='h-9 px-2'
            />
          </div>
          <button type='submit' className='bg-red-700 hover:bg-red-800 text-white w-full mt-4 h-9 px-2'>
            Simpan
          </button>
        </div>
        <div>
          <p>Email: {store.email}</p>
          <p>Password: {store.password}</p>
        </div>
      </form>
    </div>
  );
});

export const SynchronusEvent = component$(() => {
  const store = useStore({
    isDisabled: true,
    email: "",
    password: "",
  });

  useWatch$(({ track }) => {
    const trackEmail = track(store, "email");
    const trackPass = track(store, "password");
    store.isDisabled = trackEmail !== "" && trackPass !== "" ? false : true;
  });

  const aHref = useRef();
  useClientEffect$(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      console.log(JSON.parse(JSON.stringify(store)));
    };
    aHref.current!.addEventListener("click", handler);
    return () => aHref.current!.removeEventListener("click", handler);
  });

  return (
    <div className='ml-4 mt-4'>
      <div className='font-semibold'>2c. Synchronus Event</div>

      <form className='bg-blue-200 p-4 mt-4 rounded-md shadow-md flex flex-col justify-center items-center'>
        <div className='w-1/2'>
          <div className='flex flex-col'>
            <label for='form-email-sync-event'>Email</label>
            <input
              type='email'
              name='email'
              id='form-email-sync-event'
              value={store.email}
              onKeyDown$={(e) => (store.email = (e.target as HTMLInputElement).value)}
              placeholder='masukan email'
              className='h-9 px-2'
            />
          </div>
          <div className='flex flex-col mt-4'>
            <label for='form-password-sync-event'>Password</label>
            <input
              type='password'
              name='password'
              id='form-password-sync-event'
              value={store.password}
              onKeyDown$={(e) => (store.password = (e.target as HTMLInputElement).value)}
              placeholder='masukan password'
              className='h-9 px-2'
            />
          </div>
          <button
            ref={aHref}
            disabled={store.isDisabled}
            className={` bg-red-700 hover:bg-red-800 text-white w-full mt-4 h-9 px-2 disabled:bg-gray-300`}
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
});
