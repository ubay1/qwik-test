import { component$, useStore, useStyles$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import styles from "./header.css?inline";
import IconMenu from "../../../public/logos/menu.png";

export default component$(() => {
  useStyles$(styles);

  const state = useStore({
    isOpenMenuSm: false,
  });

  const pathname = useLocation().pathname;

  return (
    <header>
      <div class='header-inner'>
        <section class='logo'>
          <a href='/'>Qwik</a>
        </section>
        <button
          aria-label='btn-menu-sm'
          className='bg-white p-2 rounded-md md:hidden'
          onClick$={() => {
            state.isOpenMenuSm = !state.isOpenMenuSm;
          }}
        >
          <img src={IconMenu} alt='' width={20} height={20} />
        </button>
        <nav
          className='<md:hidden'
          class={
            state.isOpenMenuSm
              ? "<md:flex <md:flex-col <md:absolute <md:rounded-md <md:right-3 <md:top-12 <md:bg-sky-900 <md:w-32"
              : "<md:hidden"
          }
        >
          <a href='/learn' class={{ active: pathname.startsWith("/learn") }}>
            Learn
          </a>
          <a href='/blog' class={{ active: pathname.startsWith("/blog") }}>
            Blog
          </a>
          <a href='/docs' class={{ active: pathname.startsWith("/docs") }}>
            Docs
          </a>
          <a href='/api' class={{ active: pathname.startsWith("/api") }}>
            API
          </a>
          <a href='/products/hat' class={{ active: pathname.startsWith("/products") }}>
            Products
          </a>
          <a href='/about-us' class={{ active: pathname.startsWith("/about-us") }}>
            About Us
          </a>
        </nav>
      </div>
    </header>
  );
});
