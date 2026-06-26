import React from "react";
import { toast } from "react-toastify";
import {
  FaPaperPlane,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaHeadset,
} from "react-icons/fa";

const Contact = () => {
  const [result, setResult] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", "3e49b032-7455-4968-a44e-ae2d6f9d3567");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setResult("Message sent successfully!");
        event.target.reset();
      } else {
        console.log("Error", data);
        toast.error(data.message || "Failed to send message");
        setResult(data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      setResult("Connection error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 py-20 lg:py-32">
      {/* Futuristic Background Elements */}
      <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-primaryColor/5 blur-[120px]" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-slate-900/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Header Section */}
          <div className="mb-16 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primaryColor/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-primaryColor">
              <FaHeadset className="text-sm" />
              Get In Touch
            </span>
            <h2 className="text-4xl font-[1000] tracking-tight text-slate-900 md:text-6xl">
              Let&apos;s Build Your{" "}
              <span className="text-primaryColor">Future</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-500">
              Have questions about our recruitment process or want to partner
              with us? Our team is ready to help you navigate the next step of
              your journey.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {[
                {
                  icon: <FaEnvelope />,
                  title: "Email Us",
                  value: "support@propulse.com",
                  desc: "Response within 24 hours",
                },
                {
                  icon: <FaPhoneAlt />,
                  title: "Call Us",
                  value: "+1 (555) 000-0000",
                  desc: "Mon - Fri, 9am - 6pm",
                },
                {
                  icon: <FaMapMarkerAlt />,
                  title: "Location",
                  value: "New York, NY 10001",
                  desc: "Main Headquarters",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white/80 p-8 backdrop-blur-xl transition-all duration-500 hover:border-primaryColor/20 hover:shadow-xl"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:bg-primaryColor">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {item.value}
                      </p>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form Section */}
            <div className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white p-8 shadow-2xl shadow-slate-200/50 md:p-12">
                <form className="space-y-8" onSubmit={onSubmit}>
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        placeholder="John Doe"
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-6 py-4 text-sm font-bold text-slate-900 outline-none transition-all focus:border-primaryColor/20 focus:bg-white focus:ring-4 focus:ring-primaryColor/5"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="example@gmail.com"
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-6 py-4 text-sm font-bold text-slate-900 outline-none transition-all focus:border-primaryColor/20 focus:bg-white focus:ring-4 focus:ring-primaryColor/5"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      placeholder="Recruitment Inquiry"
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-6 py-4 text-sm font-bold text-slate-900 outline-none transition-all focus:border-primaryColor/20 focus:bg-white focus:ring-4 focus:ring-primaryColor/5"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400"
                    >
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows="5"
                      placeholder="How can we help you?"
                      className="w-full resize-none rounded-2xl border border-slate-100 bg-slate-50/50 px-6 py-4 text-sm font-bold text-slate-900 outline-none transition-all focus:border-primaryColor/20 focus:bg-white focus:ring-4 focus:ring-primaryColor/5"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-between gap-6 pt-4 sm:flex-row">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group/btn relative inline-flex items-center justify-center w-full sm:w-auto"
                    >
                      <div className="flex h-14 w-full items-center justify-center rounded-full bg-slate-900 px-10 text-white shadow-xl shadow-slate-900/20 transition-all duration-500 hover:bg-primaryColor hover:shadow-primaryColor/40 disabled:opacity-50">
                        <span className="text-[13px] font-black uppercase tracking-widest flex items-center gap-3">
                          {isSubmitting ? "Sending..." : "Send Message"}
                          {!isSubmitting && (
                            <FaPaperPlane className="text-xs transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                          )}
                        </span>
                      </div>
                    </button>

                    {result && (
                      <p
                        className={`text-xs font-bold uppercase tracking-widest ${result.includes("successfully") ? "text-green-500" : "text-slate-400"}`}
                      >
                        {result}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
