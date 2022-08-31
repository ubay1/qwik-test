import { component$, useStyles$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import styles from "./learn.css?inline";

export default component$(() => {
  useStyles$(styles);

  const menu = [
    {
      text: "Component",
      link: "/learn/component",
    },
    {
      text: "Event",
      link: "/learn/event",
    },
    {
      text: "Store",
      link: "/learn/store",
    },
    {
      text: "Props",
      link: "/learn/props",
    },
    {
      text: "Reactivity",
      link: "/learn/reactivity",
    },
    {
      text: "useContext",
      link: "/learn/useContext",
    },
    {
      text: "Lifecycle",
      link: "/learn/lifecycle",
    },
  ];

  return (
    <div className='m-6'>
      <div className='flex justify-center items-center flex-col mb-10'>
        <img src='logos/qwik-logo.svg' alt='logo' width={100} height={100} />
        <h1 className='text-white font-bold text-center text-4xl'>Latihan QWIK</h1>
      </div>

      <div>
        {menu.map((item) => {
          return (
            <a href={item.link} class='bg-glass mb-4 h-20 px-6 flex justify-between items-center'>
              <div class='text-white text-xl'>{item.text}</div>
              <svg width='32' height='32' viewBox='0 0 24 24'>
                <path fill='white' d='M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42Z' />
              </svg>
            </a>
          );
        })}
      </div>
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "Learn qwik",
  };
};
