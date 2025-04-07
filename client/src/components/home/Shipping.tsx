// src/components/home/Shipping.tsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";

gsap.registerPlugin(ScrollTrigger);

const Shipping = () => {
  useGSAP(() => {
    gsap.from(".shipping-content", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".shipping-section",
        start: "top 70%",
      },
    });
  }, []);

  return (
    <div className=" my-container mb-24">
      <div className=" rounded-4xl overflow-hidden">
        <section className="shipping-section relative px-10 py-20">
          <div className="absolute inset-0 bg-gray-800/50 z-10"></div>
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-[url('/assets/images/bg2.png')]"
            // style={{
            //   backgroundImage: "url('/assets/images/bg2.png')",
            // }}
          ></div>

          <div className="my-container relative z-20 mx-auto">
            <div className="shipping-content max-w-lg text-white mr-auto">
              <h2 className="text-3xl font-bold mb-4">Fast, Free Shipping.</h2>
              <h3 className="text-xl font-semibold mb-6">
                Contactless Delivery.
              </h3>
              <p className="mb-8">Try it for free, risk free!</p>

              <Link
                to="/products"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                SHOP NOW
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shipping;
