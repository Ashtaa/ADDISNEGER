import React from 'react';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">About ShopNow</h1>

      <p className="text-gray-700 text-lg mb-6 text-center">
        Welcome to <span className="font-semibold text-blue-500">ShopNow</span>, your one-stop destination for the latest trends and high-quality products.
        We're passionate about delivering exceptional value and customer satisfaction.
      </p>

      <div className="grid md:grid-cols-2 gap-10 mt-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At ShopNow, our mission is to make shopping enjoyable, affordable, and effortless. We carefully curate our products
            to meet the highest standards, ensuring that you always receive the best in fashion, electronics, and more.
          </p>
        </div>

        <img
          src="https://source.unsplash.com/featured/?ecommerce,shop"
          alt="Our Mission"
          className="w-full rounded-xl shadow-lg"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-10 mt-16 items-center">
        <img
          src="https://source.unsplash.com/featured/?team,office"
          alt="Our Team"
          className="w-full rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-3">Our Team</h2>
          <p className="text-gray-700 leading-relaxed">
            We're a diverse team of developers, designers, and creatives working hard to provide you with an exceptional online shopping experience.
            Our commitment is to keep improving every step of the way, so you can shop with confidence and ease.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-2">Thank You for Choosing ShopNow 💙</h2>
        <p className="text-gray-700">
          Your support inspires us to keep growing and innovating. Happy shopping!
        </p>
      </div>
    </div>
  );
};

export default About;
