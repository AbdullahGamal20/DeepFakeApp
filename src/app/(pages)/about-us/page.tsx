import Image from "next/image";
import Neural from "../../assets/neural.png";
import Abdullah from "../../assets/abdullah.jpg";
import Tojo from "../../assets/tojo.jpg";
import Qabany from "../../assets/qabany.jpg";
import Ziad from "../../assets/ziad.jpg";
import Fahd from "../../assets/fahd.jpg";
import Hesham from "../../assets/hesham.jpg";

const page = () => {
  const teamData = [
    {
      id: 1,
      name: "Abdullah Gamal",
      role: "Software Engineer",
      image: Abdullah,
    },
    {
      id: 2,
      name: "Abdulrahman Tarek ",
      role: "Software Engineer",
      image: Tojo,
    },
    {
      id: 3,
      name: "Abdulrahman Hassan ",
      role: "Software Engineer",
      image: Qabany,
    },
    {
      id: 4,
      name: "Ziad Mohamed ",
      role: "Software Engineer",
      image: Ziad,
    },
    {
      id: 5,
      name: "Mohamed Fahd",
      role: "Software Engineer",
      image: Fahd,
    },
    {
      id: 6,
      name: "Abdulrahman Hesham",
      role: "Software Engineer",
      image: Hesham,
    },
  ];
  return (
    <section className=" text-white min-h-screen py-20 mt-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold mb-6">
            About Us
          </h1>
          <p className="text-gray-300 text-lg mt-4 max-w-3xl mx-auto">
            Empowering truth in digital media. Our AI-driven platform ensures
            authenticity by detecting deepfakes with cutting-edge technology.
          </p>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-[#1B3ECC] mb-4">
              Our Mission
            </h2>
            <p className="text-gray-400 text-lg">
              In an era where digital content can be easily manipulated, our
              mission is to empower individuals with AI-driven protection. We
              provide cutting-edge deepfake detection technology that helps
              users identify altered images, verify authenticity, and safeguard
              their digital presence.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src={Neural}
              alt="AI Detection"
              width={500}
              height={400}
              className=" Neural"
              loading="lazy"
            />
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-[#1B3ECC] text-center mb-8">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-white">1. Upload</h3>
              <p className="text-gray-400 mt-2">
                Upload an image or provide a link to the media you want to
                analyze.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-white">2. AI Analysis</h3>
              <p className="text-gray-400 mt-2">
                Our AI scans for pixel inconsistencies, metadata, and deepfake
                markers.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-white">3. Get Results</h3>
              <p className="text-gray-400 mt-2">
                Receive an instant deepfake detection report with authenticity
                scores.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-[#1B3ECC] text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamData.map((teamMember) => (
              <div className="text-center" key={teamMember.id}>
                <Image
                  src={teamMember.image}
                  alt="Team Member 1"
                  className="rounded-full w-[150px] h-[150px] mx-auto mb-4 "
                  loading="lazy"
                />
                <h3 className="text-lg font-bold">{teamMember.name}</h3>
                <p className="text-gray-400">{teamMember.role}</p>
              </div>
            ))}
            {/* Team Member 1 */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
