import { component$, Slot } from "@builder.io/qwik";
import Header from "../components/header/header";

export default component$(() => {
  return (
    <div className='h-full min-h-screen'>
      <Header />
      <main>
        <Slot />
      </main>
    </div>
  );
});
