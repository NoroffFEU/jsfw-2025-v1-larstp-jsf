import { useState } from "react";
import { useToast } from "../hooks/useToast";

interface FormData {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  subject?: string;
  email?: string;
  message?: string;
}

export function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      addToast("Thank you for your message!", "success");
      setFormData({
        fullName: "",
        subject: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <main className="flex-1 w-full max-w-2xl p-6 mx-auto sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-text-primary">
          Contact Us
        </h1>
        <p className="text-text-secondary">
          Have a question or feedback? We'd love to hear from you!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="fullName"
            className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium border rounded-full border-white/10 bg-black/45 text-text-primary backdrop-blur-2xl"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg outline-none bg-input-bg text-text-primary border-input-border focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/30"
            placeholder="Your name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-text-error">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="subject"
            className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium border rounded-full border-white/10 bg-black/45 text-text-primary backdrop-blur-2xl"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg outline-none bg-input-bg text-text-primary border-input-border focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/30"
            placeholder="What is this about?"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-text-error">{errors.subject}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium border rounded-full border-white/10 bg-black/45 text-text-primary backdrop-blur-2xl"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg outline-none bg-input-bg text-text-primary border-input-border focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/30"
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-text-error">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium border rounded-full border-white/10 bg-black/45 text-text-primary backdrop-blur-2xl"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border rounded-lg outline-none resize-none bg-input-bg text-text-primary border-input-border focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/30"
            placeholder="Your message here..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-text-error">{errors.message}</p>
          )}
        </div>

        <button type="submit" className="w-full px-6 py-3 text-lg app-button">
          Send Message
        </button>
      </form>
    </main>
  );
}
