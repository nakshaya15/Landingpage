import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    mobile: "",
    email: "",
    working: "",
    transactionId: "",
    paymentScreenshot: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;
    if (type === "file") return;
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, paymentScreenshot: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address!");
      return;
    }
    try {
      await axios.post("http://localhost:8081/api/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registered successfully!");
      setFormData({
        name: "",
        qualification: "",
        mobile: "",
        email: "",
        working: "",
        transactionId: "",
        paymentScreenshot: null,
      });
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error(error);
      alert("Registration failed, try again!");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url('/ai1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-80"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 text-white py-5 shadow-lg">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-3xl font-extrabold tracking-wide">MonsterCoders</h1>
            <span className="font-semibold text-lg">AI Training Program</span>
          </div>
        </header>

        {/* Video Card */}
        <section className="flex justify-center px-4 py-6">
          <Card className="p-0 shadow-2xl rounded-3xl w-full max-w-3xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-purple-500/50 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
            <video
              className="w-full h-72 object-cover"
              controls
              muted
              loop
              autoPlay
              src="/vedios/vedio.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </Card>
        </section>

        {/* Overview Card */}
        <section className="flex justify-center px-4 py-4">
          <Card className="p-3 shadow-xl rounded-2xl w-full max-w-3xl transform transition duration-500 hover:scale-105 hover:shadow-green-400/50 bg-gradient-to-r from-green-400 via-teal-300 to-cyan-200">
            <CardContent>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                A Practical Overview Program On Job Guaranteed AI Training
              </h2>
              <p className="text-gray-800 mb-3 text-center text-sm">
                By <b>Maqs</b>, Alumni of IIM-K with 15 years of IT Expertise, worked @US with{" "}
                <b>GE, FORD, GM, CATERPILLAR etc</b>.
              </p>
              <div className="mt-4 text-gray-900 text-sm">
                <div
                  className="grid gap-y-2 gap-x-4 items-start"
                  style={{ gridTemplateColumns: "140px 12px 1fr" }}
                >
                  <div className="font-semibold">Duration</div>
                  <div className="text-center">:</div>
                  <div>10 days</div>
                  <div className="font-semibold">Timings</div>
                  <div className="text-center">:</div>
                  <div>8–10pm (Mon–Fri)</div>
                  <div className="font-semibold">Sat &amp; Sun</div>
                  <div className="text-center">:</div>
                  <div>10:00am – 6:00pm</div>
                  <div className="font-semibold">Venue</div>
                  <div className="text-center">:</div>
                  <div className="text-xs">
                    15th Floor, Segment Spaces, Manjeera Trinity Corporate, KPHB, Hyd-72 (Next to Lulu Mall)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Advantages Card */}
        <section className="flex justify-center px-4 py-4">
          <Card className="p-3 shadow-xl rounded-2xl w-full max-w-3xl transform transition duration-500 hover:scale-105 hover:shadow-pink-400/50 bg-gradient-to-r from-pink-400 via-red-300 to-yellow-200">
            <CardContent>
              <h2 className="text-xl font-bold text-gray-900 mb-3 text-center">
                Advantages of This AI Overview Program
              </h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                You will Learn How to:
              </h3>
              <ul className="grid gap-2 md:grid-cols-2 text-gray-900 text-sm">
                <li>✅ Generate revenue using AI</li>
                <li>✅ Learn effective AI prompting</li>
                <li>✅ Create PPTs, Excel sheets, Websites</li>
                <li>✅ Create Hollywood style videos</li>
                <li>✅ Create Music using AI</li>
                <li>✅ Build AI chatbots</li>
                <li>✅ Overview of AI business opportunities</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Registration Form */}
        <section className="flex justify-center px-3 py-4">
          <div className="p-3 shadow-xl rounded-xl w-full max-w-lg transform transition duration-300 hover:scale-[1.02] hover:shadow-indigo-400/40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <form
              className="flex flex-col md:flex-row gap-4 p-0"
              onSubmit={handleSubmit}
            >
              <div className="flex-1">
                <div className="w-full text-center">
                  <h2 className="text-xl font-bold mb-3 text-center">Registration Form</h2>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <label className="text-gray-200 text-sm block mb-1">
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-200 text-sm block mb-1">
                      Qualification
                    </label>
                    <input
                      name="qualification"
                      type="text"
                      placeholder="Your qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-200 text-sm block mb-1">
                      Mobile <span className="text-red-300">*</span>
                    </label>
                    <input
                      name="mobile"
                      type="tel"
                      placeholder="Your mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-200 text-sm block mb-1">
                      Email <span className="text-red-300">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-200 text-sm block mb-1">
                      Working (yes/no)
                    </label>
                    <input
                      name="working"
                      type="text"
                      placeholder="yes or no"
                      value={formData.working}
                      onChange={handleChange}
                      className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-gray-200 text-sm block mb-1">
                        Payment Screenshot
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded px-3 py-2 text-sm file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-white/20 file:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-gray-200 text-sm block mb-1">
                        Transaction ID
                      </label>
                      <input
                        name="transactionId"
                        type="text"
                        placeholder="Transaction ID"
                        value={formData.transactionId}
                        onChange={handleChange}
                        className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center md:border-l md:border-white/20 md:pl-4">
                <p className="text-white text-sm font-semibold mb-2">
                  Scan QR Code
                </p>
                <img
                  src="/qr.jpg"
                  alt="QR Code"
                  className="w-36 h-36 rounded-lg shadow mb-2"
                />
                <div className="text-white text-center">
                  <p className="font-semibold text-sm">Pay: ₹999/-</p>
                  <p className="text-xs">Duration: 10 Days</p>
                </div>
              </div>
            </form>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={
                  !formData.mobile ||
                  !formData.email ||
                  (!formData.paymentScreenshot && !formData.transactionId)
                }
                className={`w-36 text-white text-sm py-2 rounded ${
                  formData.mobile &&
                  formData.email &&
                  (formData.paymentScreenshot || formData.transactionId)
                    ? "bg-indigo-700 hover:bg-indigo-800"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                Register Now
              </button>
            </div>
          </div>
        </section>

        {/* Note */}
        <section className="flex justify-center px-3 py-2">
          <Card className="p-3 shadow-md rounded-xl w-full max-w-4xl transform transition duration-300 hover:scale-105 hover:shadow-cyan-400/40 bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 text-white">
            <CardContent className="flex flex-col items-center">
              <h3 className="text-base font-bold mb-2 text-center">Note:</h3>
              <p className="text-sm text-center whitespace-nowrap overflow-hidden text-ellipsis">
                After the successful completion of 10-day Overview on AI, selected candidates will be offered 
                <span className="font-semibold"> Job Guaranteed AI Training of 3 months duration</span>.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-3 text-center text-xs">
          © {new Date().getFullYear()} MonsterCoders. All rights reserved.
        </footer>
      </div>
    </div>
  );
}