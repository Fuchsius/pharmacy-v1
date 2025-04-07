// src/components/home/FAQ.tsx
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    id: 1,
    question: "What is Pharma and how do I use it?",
    answer:
      "At Pharmix, we believe that taking care of your health should never be a hassle. So whether you're managing a chronic condition or just looking for ways to improve your overall wellbeing, we're here to help you every step of the way. Thank you for choosing us as your trusted source for all your healthcare needs.",
  },
  {
    id: 2,
    question: "What is Pharma and how do I use it?",
    answer:
      "At Pharmix, we believe that taking care of your health should never be a hassle. So whether you're managing a chronic condition or just looking for ways to improve your overall wellbeing, we're here to help you every step of the way.",
  },
  {
    id: 3,
    question: "What is Pharma and how do I use it?",
    answer:
      "At Pharmix, we believe that taking care of your health should never be a hassle. So whether you're managing a chronic condition or just looking for ways to improve your overall wellbeing, we're here to help you every step of the way.",
  },
  {
    id: 4,
    question: "What is Pharma and how do I use it?",
    answer:
      "At Pharmix, we believe that taking care of your health should never be a hassle. So whether you're managing a chronic condition or just looking for ways to improve your overall wellbeing, we're here to help you every step of the way.",
  },
  {
    id: 5,
    question: "What is Pharma and how do I use it?",
    answer:
      "At Pharmix, we believe that taking care of your health should never be a hassle. So whether you're managing a chronic condition or just looking for ways to improve your overall wellbeing, we're here to help you every step of the way.",
  },
  {
    id: 6,
    question: "What is Pharma and how do I use it?",
    answer:
      "At Pharmix, we believe that taking care of your health should never be a hassle. So whether you're managing a chronic condition or just looking for ways to improve your overall wellbeing, we're here to help you every step of the way.",
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  useGSAP(() => {
    gsap.from(".faq-title", {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".faq-section",
        start: "top 80%",
      },
    });

    gsap.from(".faq-description", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".faq-section",
        start: "top 80%",
      },
    });

    gsap.from(".faq-item", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".faq-list",
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section className="faq-section py-16 bg-gray-50">
      <div className="my-container">
        <h2 className="faq-title text-3xl font-bold text-center mb-4">FAQ</h2>
        <p className="faq-description text-center text-gray-600 mb-12">
          Our licensed pharmacists are available to answer any questions you may
          have
        </p>

        <div className="faq-list max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="faq-item mb-4 border-b border-gray-200 pb-4 last:border-b-0"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFaq(faq.id)}
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={openId === faq.id ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
              </div>

              {openId === faq.id && (
                <div className="mt-3 text-gray-600 text-base">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
