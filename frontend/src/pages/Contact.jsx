import React from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "3e49b032-7455-4968-a44e-ae2d6f9d3567");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Form Submitted Successfully");
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section className="bg-[#F5F8FA]">
      <div className="bg-white rounded-lg p-[3rem] mx-auto max-w-screen-md shadow-panelShadow">
        <h2 className="heading font-extrabold text-center">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-[500] leading-6 text-center text__para ">
          Submit the form below to get in touch with us. Got a question or
          proposal? Fill out the form and we&apos;ll get back to you as soon as
          possible.
        </p>

        <form action="#" className="space-y-8" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="form__label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="form__input mt-1"
            />
          </div>

          <div>
            <label htmlFor="subject" className="form__label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Let us know how we can help you"
              className="form__input mt-1"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">
              Your Message
            </label>
            <textarea
              rows="6"
              type="text"
              id="message"
              placeholder="Leave a comment....."
              className="form__input mt-1"
            />
          </div>

          <button type="submit" className="btn rounded sm:w-fit">
            Submit
          </button>

          <p className="text-center text-sm text-gray-500">{result}</p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
