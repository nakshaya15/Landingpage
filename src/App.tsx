import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "./ui/card";

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

    if (!formData.paymentScreenshot) {
      alert("Please upload payment screenshot!");
      return;
    }

    try {
      // Convert file to Base64 string
      const toBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });

      const screenshotBase64 = formData.paymentScreenshot
        ? await toBase64(formData.paymentScreenshot)
        : "";

      // Post data to Google Apps Script Web App URL
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxv0OWT3xoXofloU5MNnyJUoVwkOImeGtIxU-wGSAeORm6hg8gYvc_KYmndgll2orQF/exec",
        {
          method: "POST",
          mode: "no-cors", // Apps Script usually requires this
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            qualification: formData.qualification,
            mobile: formData.mobile,
            email: formData.email,
            working: formData.working,
            transactionId: formData.transactionId,
            paymentScreenshot: screenshotBase64, // storing image as base64
          }),
        }
      );

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
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
        // NOTE: You MUST replace this 'background_video.mp4' with the actual path to your desired background video
        src="/baby ai vedio.mp4" 
      >
        Your browser does not support the video tag.
      </video>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-80 z-10"></div>

      <div className="relative z-20 flex flex-col min-h-screen">
        {/* Header */}
       <header className="bg-purple-900 text-white py-5 shadow-lg">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-3xl font-extrabold tracking-wide">MonsterCoders</h1>
            <span className="font-semibold text-lg">AI Training Program</span>
          </div>
        </header>

        {/* Video Card */}
        <section className="flex justify-center px-2 py-3">
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

        {/* Overview and Advantages Cards Side by Side */}
        <section className="flex justify-center px-1 py-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
            {/* Overview Card */}
            <Card className="p-2 shadow-xl rounded-xl transform transition duration-500 hover:scale-105 hover:shadow-green-400/50 bg-gradient-to-r from-green-400 via-teal-300 to-cyan-200">
              <CardContent className="py-2 px-3">
                <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  A Practical Overview Program 
                  On Job Guaranteed 
                  AI Training
                </h2>
                <p className="text-gray-800 mb-2 text-center text-xs">
                  By <b>Maqs</b>, Alumni of IIM-K with 15 years of IT Expertise, worked @US with{" "}
                  <b>GE, FORD, GM, CATERPILLAR etc</b>.
                </p>
                <div className="mt-2 text-gray-900 text-xs">
                  <div
                    className="grid gap-y-1 gap-x-2 items-start"
                    style={{ gridTemplateColumns: "100px 8px 1fr" }}
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

            {/* Advantages Card */}
            <Card className="p-2 shadow-xl rounded-xl transform transition duration-500 hover:scale-105 hover:shadow-pink-400/50 bg-gradient-to-r from-pink-400 via-red-300 to-yellow-200">
              <CardContent className="py-2 px-3">
                <h2 className="text-lg font-bold text-gray-900 mb-2 text-center">
                  Advantages of This AI Overview Program
                </h2>
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  You will Learn How to:
                </h3>
                <ul className="grid gap-1 text-gray-900 text-xs">
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
          </div>
        </section>

        {/* Registration Form */}
<section className="flex justify-center px-3 py-3">
  <div className="p-4 shadow-xl rounded-lg w-full max-w-md transform transition duration-300 hover:scale-[1.02] hover:shadow-indigo-400/40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
    <h2 className="text-base font-bold mb-3 text-center">Registration Form</h2>

    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-1 gap-y-2 text-[11px]">
      {/* Row 1 */}
      <div className="pr-1">
        <label className="block mb-1 text-gray-200">Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full h-6 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded px-2 text-[11px]"
          placeholder="Your name"
        />
      </div>
      <div className="pl-1">
        <label className="block mb-1 text-gray-200">Qualification</label>
        <input
          name="qualification"
          type="text"
          value={formData.qualification}
          onChange={handleChange}
          className="w-full h-6 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded px-2 text-[11px]"
          placeholder="Your qualification"
        />
      </div>

      {/* Row 2 */}
      <div className="pr-1">
        <label className="block mb-1 text-gray-200">Mobile <span className="text-red-300">*</span></label>
        <input
          name="mobile"
          type="tel"
          value={formData.mobile}
          onChange={handleChange}
          required
          className="w-full h-6 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded px-2 text-[11px]"
          placeholder="Your mobile number"
        />
      </div>
      <div className="pl-1">
        <label className="block mb-1 text-gray-200">Email <span className="text-red-300">*</span></label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full h-6 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded px-2 text-[11px]"
          placeholder="Your email address"
        />
      </div>

      {/* Row 3 */}
      <div className="pr-1">
        <label className="block mb-1 text-gray-200">Working (yes/no)</label>
        <input
          name="working"
          type="text"
          value={formData.working}
          onChange={handleChange}
          className="w-full h-6 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded px-2 text-[11px]"
          placeholder="yes or no"
        />
      </div>
      <div className="pl-1">
        <label className="block mb-1 text-gray-200">Transaction ID</label>
        <input
          name="transactionId"
          type="text"
          value={formData.transactionId}
          onChange={handleChange}
          className="w-full h-6 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded px-2 text-[11px]"
          placeholder="Transaction ID"
        />
      </div>

      {/* Row 4 - Payment Screenshot and QR Code side by side */}
      <div className="pr-1">
        <label className="block mb-1 text-gray-200">Payment Screenshot</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full h-6 bg-white/10 text-white border border-white/20 rounded px-1 text-[11px] file:py-0.5 file:px-2 file:rounded file:border-0 file:text-[11px] file:bg-white/20 file:text-white"
        />
        
        {/* Register Now Button below Payment Screenshot */}
        <div className="flex justify-center mt-9">
          <button
            type="submit"
            disabled={
              !formData.mobile ||
              !formData.email ||
              (!formData.paymentScreenshot && !formData.transactionId)
            }
            className={`w-28 py-1 rounded text-[11px] ${
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
      
      <div className="pl-1 flex flex-col items-start">
        <p className="text-white text-[11px] font-semibold mb-2">Scan QR Code</p>
        <img src="/qr.jpg" alt="QR Code" className="w-28 h-28 rounded shadow mb-1 mx-auto" />
        <p className="font-semibold text-[11px] text-center w-full">Pay: ₹999/-</p>
        <p className="text-[10px] text-center w-full">Duration: 10 Days</p>
        
      </div>
    </form>
  </div>
</section>
        
        {/* Note */}
        <section className="flex justify-center px-2 py-2">
          <Card className="p-1 shadow-md rounded-lg w-full max-w-xl transform transition duration-300 hover:scale-105 hover:shadow-cyan-400/40 bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 text-white">
            <CardContent className="flex flex-col items-center py-2 px-3">
              <h3 className="text-sm font-bold mb-1 text-center">Note:</h3>
              <p className="text-xs text-center">
                After the successful completion of this 10-day Overview on AI, selected candidates will be eligible
                <span className="font-semibold"> for Job Guaranteed AI Training for 3 months </span>.
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