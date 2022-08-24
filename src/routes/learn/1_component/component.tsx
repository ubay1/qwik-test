import { component$ } from "@builder.io/qwik";

export const Component = component$(() => {
  const siku = `{ nama_state }`;
  const contohLexical = `
  void fun() {
    int x = 5;

    void fun2() {
      printf("%d", x);
    }
  }
  `;
  const contohInlinEComponent = `
  export const App = component$(() => {
    return (
      <div>
        <Greeter />
      </div>
    );
  });
  
  export const Greeter = () => {
    return <div>Hello World!</div>;
  };
  `;

  return (
    <div className='mb-4'>
      <div className='text-pink-900'>1. Component</div>
      <p>
        a. di qwik untuk membuat component menggunakan <b>component$</b>
      </p>
      <p>
        b. binding di qwik dengan <b>{siku}</b>
      </p>
      <p>
        c. Salah satu kekuatan super Qwik terletak pada fitur lazy-loading-nya.
        <div className='ml-4'>
          <div className='mb-2'>
            1. Independen hierarki: Komponen dapat dimuat secara tidak berurutan. Misalnya, kode untuk komponen turunan
            dapat dimuat sebelum kode induknya.
          </div>
          <div className='mb-2'>
            2. Berdasarkan interaksi: Pemuatan kode ditangguhkan hingga pengguna berinteraksi dengan komponen.
          </div>
          <div className='mb-2'>
            3. Lebih dari sekedar komponen:
            <b>$</b> menandai sebagai lazy-loadable. Misalnya metode component$ membuat komponen menjadi lazy-loadable.
            Saat Anda melihat $ dalam kode Qwik, Anda melewati batas pemuatan lambat dan harus mengetahui aturan khusus:{" "}
            <br />
            <div className='ml-6'>
              <div className='mt-2'>
                a. variabel yang dicakup secara leksikal harus dideklarasikan sebagai <b>const.</b> <br /> contoh
                lexical scope. setiap inner level didalam dapat mengakses outer level: <br />
              </div>
              <pre className='bg-slate-800 whitespace-pre-wrap break-words text-left text-xs p-2'>
                <code className='text-white'> {contohLexical} </code>
              </pre>
              <div className='mt-2'>
                b. variabel/simbol yang ditangkap harus berupa: <br />
              </div>
              <div className='ml-4'>- Serializable</div>
              <div className='ml-4'>
                - dapat diimport (Baik dari file lain sebagai impor atau dari file ini menggunakan ekspor)
              </div>
              <br />
              <b>contoh inline component</b>
              <pre className='bg-slate-800 whitespace-pre-wrap break-words text-left text-xs p-2'>
                <code className='text-white'>{contohInlinEComponent} </code>
              </pre>
            </div>
          </div>
        </div>
      </p>
    </div>
  );
});
