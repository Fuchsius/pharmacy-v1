import FAQ from "@/components/home/FAQ";

const teamMembers = [
  {
    id: 1,
    name: "Dr. John Doe",
    role: "Chief Medical Officer",
    image: "/assets/images/team/member1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Head Pharmacist",
    image: "/assets/images/team/member2.jpg",
  },
  // Add more team members
];

const AboutPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-myblue overflow-hidden rounded-b-[150px] lg:rounded-b-[10000px] px-4">
        <div className="my-container border-white text-white flex !max-w-4xl">
          <div className="w-full pt-20 pb-28 flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              About Us
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl text-center">
              Leading the way in innovative healthcare solutions and committed
              to improving lives through quality medical services.
            </p>
          </div>
          {/* <div className="w-full hidden sm:block aspect-square">
            <img
              src="/assets/images/doctor2.png"
              alt=""
              className="object-cover w-full h-full"
            />
          </div> */}
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="my-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/assets/images/aboutus.png"
                alt="Our Story"
                className=""
              />
            </div>
            <div>
              {/* <h2 className="text-3xl font-bold mb-6">Our Story</h2> */}
              <div className="space-y-4 text-gray-600">
                <p>
                  At <strong>Polpithigama New Medical,</strong> our mission is
                  to enhance healthcare in Sri Lanka by providing high-quality,
                  safe, and effective medicines to the community. Committed to
                  excellence and innovation, we specialize in offering a wide
                  range of pharmaceutical products that meet the highest
                  standards of quality and safety, ensuring reliable and trusted
                  healthcare for all.
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mt-16">
            Built on a foundation of integrity, trust, and a commitment to
            improving patient well-being, Polpithigama New Medical works closely
            with our partners to ensure that our medicines are sourced,
            distributed, and delivered with the utmost care and precision. Our
            dedicated team is passionate about healthcare, continuously striving
            to uphold the highest industry standards and provide accessible,
            high-quality medical solutions across various therapeutic areas.
          </p>
        </div>
      </section>

      <section className=" my-container ">
        <div className="py-24 px-16 bg-myblue rounded-xl">
          <div className=" w-full flex flex-col md:flex-row items-center text-white gap-x-16 lg:gap-x-32 gap-y-16">
            <div className=" text-5xl text-center md:text-start font-bold text-nowrap">
              Why <br /> Choose Us?
            </div>
            <div className=" text-center md:text-start font-semibold text-lg tracking-tight leading-7">
              Choosing Polpithigama New Medical means trusting a pharmacy that
              prioritizes quality in healthcare. We take pride in providing
              reliable pharmaceutical products that support healthcare
              professionals in delivering better patient care and outcomes. With
              a strong commitment to safety, excellence, and innovation, we
              strive to be a trusted partner in the healthcare community.
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="pt-32 pb-24 bg-gray-50">
        <div className="my-container">
          <h1 className=" text-myblue text-4xl md:text-5xl font-semibold text-center mb-14">
            Our Values
          </h1>
          <div className="grid md:grid-cols-2 gap-8 md:gap-14">
            {[
              {
                image: "/assets/icons/1.png",
                title: "Quality",
                description:
                  "We are relentless in our pursuit of the highest standards in pharmaceutical production and distribution.",
              },
              {
                image: "/assets/icons/2.png",
                title: "Integrity",
                description:
                  "Transparency and honesty guide every decision we make, from sourcing to delivering medicines to our clients.",
              },
              {
                image: "/assets/icons/3.png",
                title: "Innovation",
                description:
                  "We continually evolve to meet the changing needs of the healthcare industry, staying ahead with cutting-edge solutions.",
              },
              {
                image: "/assets/icons/4.png",
                title: "Customer-Centricity",
                description:
                  "Our clients and their patients are at the heart of everything we do, driving us to deliver exceptional service and reliable products.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-[#F0F4FF] p-8 rounded-lg flex gap-4"
              >
                <div className="min-w-12 min-h-12 flex items-start justify-center">
                  <img
                    src={value.image}
                    alt="icon"
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <h3 className="text-2xl text-myblue font-bold mb-4">
                    {value.title}
                  </h3>
                  <p className="text-[#1D1D1D]">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  );
};

export default AboutPage;
