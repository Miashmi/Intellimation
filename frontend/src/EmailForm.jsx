import { useState } from "react";
import axios from "axios";

const EmailForm = () => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axios.post("http://127.0.0.1:5000/send-email", emailData);
      setStatus(response.data.status);
    } catch (error) {
      setStatus("Error sending email. Check console for details.");
      console.error("Email Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Send an Email</h2>
      <form onSubmit={sendEmail}>
        <input
          type="email"
          name="to"
          placeholder="Recipient Email"
          value={emailData.to}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={emailData.subject}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={emailData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send Email
        </button>
      </form>
      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
};

export default EmailForm;
