"use client";
import { Section } from "@/app/lib/types";
import { FormEvent } from "react";
import { useState } from "react";

interface ContactFormSection extends Section {
  content: {
    introduction: string;
    title: string;
  };
}

interface ContactFormProps {
  section: ContactFormSection;
  siteId: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ section, siteId }) => {
  const { introduction, title } = section?.content || {};
  const [sent, setSent] = useState(false);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch(`https://api.headlesshost.com/sites/${siteId}/contact`, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      setSent(true);
    }
  }
  return (
    <div className="mb-14">
      <div className="text-3xl mb-6">{title}</div>
      <p>{introduction}</p>

      {sent ? (
        <div className="text-green-500 mt-10">Thank you your message has been sent! Expect a reply shortly.</div>
      ) : (
        <form className="w-full  mt-10" onSubmit={onSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                First Name
              </label>
              <input required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="Firstname" type="text" placeholder="First name" />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                Last Name
              </label>
              <input required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="Surname" type="text" placeholder="Surname" />
            </div>
          </div>
          <div className="w-full">
            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Email
            </label>
            <input required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="Email" type="email" placeholder="Email" />
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 mt-10">
            <div className="w-full px-3">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Message
              </label>
              <textarea required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="Message" placeholder="Message" rows={10} />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                Send
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
