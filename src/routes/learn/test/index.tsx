import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div className='m-4'>
      <div className='flex justify-center items-center flex-col mb-10'>
        <img src='logos/qwik-logo.svg' alt='logo' width={100} height={100} />
        <h1 className='text-blue-900 font-bold underline text-center text-4xl'>Learn QWIK</h1>
      </div>
    </div>
  );
});
