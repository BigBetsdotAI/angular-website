import { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    company: "",
    email: "",
    mobile: "",
    nationality: "",
    interest: "",
    country: "",
    hearAbout: "",
    agreeNewsletter: false,
    agreeSponsors: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registration submitted! Thank you for your interest in FAIDAS 2026.");
  };

  return (
    <section id="register" className="gradient-navy py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12 text-primary-foreground">
          Registration Form
        </h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-navy-light/60 border border-teal/30 text-primary-foreground placeholder:text-teal-light/50 font-body text-sm focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-navy-light/60 border border-teal/30 text-primary-foreground placeholder:text-teal-light/50 font-body text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              required
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-navy-light/60 border border-teal/30 text-primary-foreground placeholder:text-teal-light/50 font-body text-sm focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              required
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-navy-light/60 border border-teal/30 text-primary-foreground placeholder:text-teal-light/50 font-body text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address (Official email only)"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-navy-light/60 border border-teal/30 text-primary-foreground placeholder:text-teal-light/50 font-body text-sm focus:outline-none focus:border-primary"
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-navy-light/60 border border-teal/30 text-primary-foreground placeholder:text-teal-light/50 font-body text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nationality"
              placeholder="Nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-navy-light/60 border border-teal/30 text-primary-foreground placeholder:text-teal-light/50 font-body text-sm focus:outline-none focus:border-primary"
            />
            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-navy-light/60 border border-teal/30 text-primary-foreground font-body text-sm focus:outline-none focus:border-primary"
            >
              <option value="">I am interested in?</option>
              <option value="speaking">Speaking at the Forum</option>
              <option value="attending">Attending the Forum</option>
              <option value="sponsoring">Sponsoring the Forum</option>
            </select>
          </div>
          <select
            name="hearAbout"
            value={formData.hearAbout}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-navy-light/60 border border-teal/30 text-primary-foreground font-body text-sm focus:outline-none focus:border-primary"
          >
            <option value="">Where did you hear about us?</option>
            <option value="email">Email</option>
            <option value="linkedin">LinkedIn</option>
            <option value="google">Google Search</option>
            <option value="friend">Referred by a Friend</option>
            <option value="other">Other</option>
          </select>
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeNewsletter"
                checked={formData.agreeNewsletter}
                onChange={handleChange}
                className="mt-1 accent-primary"
              />
              <span className="text-xs text-teal-light/80">
                Yes, by signing up, I agree to receive Consumex Digital newsletter and other marketing communications through email.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeSponsors"
                checked={formData.agreeSponsors}
                onChange={handleChange}
                className="mt-1 accent-primary"
              />
              <span className="text-xs text-teal-light/80">
                Yes, by signing up, I agree to have my contact information passed on to the sponsors of this event.
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 font-heading font-bold text-sm uppercase tracking-wider bg-primary text-primary-foreground hover:bg-teal-light transition-colors rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
