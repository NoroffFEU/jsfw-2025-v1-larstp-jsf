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
    // Clear error for this field when user starts typing
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
    <main className="flex-1 max-w-2xl mx-auto p-6 sm:px-6 lg:px-8 w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          Contact Us
        </h1>
        <p className="text-text-secondary">
          Have a question or feedback? We'd love to hear from you!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-input-bg text-text-primary border border-input-border rounded-lg outline-none focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/30"
            placeholder="Your name"
          />
          {errors.fullName && (
            <p className="text-text-error text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-input-bg text-text-primary border border-input-border rounded-lg outline-none focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/30"
            placeholder="What is this about?"
          />
          {errors.subject && (
            <p className="text-text-error text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-input-bg text-text-primary border border-input-border rounded-lg outline-none focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/30"
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-text-error text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 bg-input-bg text-text-primary border border-input-border rounded-lg outline-none focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/30 resize-none"
            placeholder="Your message here..."
          />
          {errors.message && (
            <p className="text-text-error text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 text-lg font-semibold border-2 rounded-lg shadow-lg bg-orange-accent text-dark-bg border-orange-accent hover:bg-orange-accent/90 focus:outline-none focus:ring-4 focus:ring-orange-accent/20"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
