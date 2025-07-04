export default function Featured() {
  return (
    <section className="border-b-border  inset-0 flex w-full flex-col items-center justify-center border-b-4 bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] font-base relative">
      <div className="absolute top-4 right-4 text-black flex items-center  font-normal sm:font-semibold">
        Featured by
        <svg
          width="50"
          height="20"
          viewBox="0 0 118 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.153238 36.3927C-0.369524 34.8204 0.481232 33.1221 2.05345 32.5994C3.62568 32.0766 5.324 32.9274 5.84676 34.4996L0.153238 36.3927ZM97.0226 2L117.444 29.9815L83.0006 33.6762L97.0226 2ZM5.84676 34.4996C6.83465 37.4707 10.2634 41.7732 15.4966 46.0445C20.6211 50.2271 27.0389 54.0211 33.404 56.1681C39.8344 58.337 45.7561 58.6801 50.2477 56.6558C54.5345 54.7237 58.2703 50.2802 59.6834 41.0724L65.614 41.9825C63.994 52.5384 59.3892 59.117 52.713 62.1259C46.2417 65.0425 38.578 64.2453 31.4864 61.8534C24.3295 59.4394 17.2885 55.2519 11.7027 50.6928C6.22567 46.2224 1.69284 41.0231 0.153238 36.3927L5.84676 34.4996ZM59.6834 41.0724C61.0029 32.4744 57.1657 24.9716 50.8532 18.9834C44.5135 12.9694 35.9629 8.79687 28.8322 7.0693C25.2497 6.20137 22.2622 6.00901 20.2145 6.35063C18.0982 6.70369 17.8415 7.41037 17.7921 7.61078C17.6534 8.17387 17.762 9.90714 20.2361 13.3109C22.6006 16.5639 26.7206 20.7771 33.1957 26.0201L29.42 30.6831C22.7521 25.2841 18.1838 20.6922 15.3828 16.8387C12.6913 13.1359 11.1571 9.46103 11.9662 6.17588C12.8647 2.52806 16.1464 0.946391 19.2272 0.432418C22.3767 -0.0930072 26.245 0.268913 30.245 1.238C38.2792 3.18447 47.8002 7.81698 54.9825 14.6304C62.1921 21.4696 67.3275 30.8167 65.614 41.9825L59.6834 41.0724ZM33.1957 26.0201C49.7717 39.4419 63.9905 43.2506 74.7946 42.0938C85.5941 40.9375 93.3817 34.7942 97.2469 27.4461L102.557 30.2393C97.7853 39.3109 88.2731 46.685 75.4334 48.0597C62.5983 49.4339 46.8385 44.7872 29.42 30.6831L33.1957 26.0201Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="mx-auto w-container max-w-full px-4 py-20 lg:py-[100px]">
        <h2 className="text-2xl  lg:mb-15 lg:text-5xl text-black text-left sm:text-center">
          <span className="font-black">DeProbo</span> empowers{" "}
          <span className="font-black">your predictions</span>
          <div className="mt-1">
            <span className="font-black">Earn</span> real returns{" "}
            <span className="font-black">on your insights</span>
          </div>
          <div className="mt-1">
            Not just promises —{" "}
            <span className="font-black text-[#FF6467]">Real Rewards</span>
          </div>
        </h2>
      </div>
    </section>
  );
}
