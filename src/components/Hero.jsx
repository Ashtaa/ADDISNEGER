function Hero() {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-20 max-w-7xl mx-auto">
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Discover Stylish Deals<br />
          For Every Season
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-600">
          Shop the latest fashion trends with unbeatable discounts.
        </p>
        <a href="#shop" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition">
          Shop Now
        </a>
      </div>
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Featured Product" className="w-full max-w-md mx-auto rounded-2xl shadow-lg" />
      </div>
    </section>
  );
}

export default Hero;