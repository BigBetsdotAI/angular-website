import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import heroBg from "@/assets/hero-bg.png";
import { useState } from "react";
import { register } from "@/services/api";
import { toast } from "sonner"; // Assuming sonner is used for notifications based on package.json

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.type === "checkbox" ? "id" : "type"]: e.target.value, // This line was incorrect in thought, fixing below
      [e.target.type === "email"
        ? "email"
        : e.target.type === "text"
        ? "name"
        : "password"]: e.target.value, // this is too complex, let's just use name attribute
    }));
  };

  // Correction: using name attribute is standard and easier
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      await register({ name, email, password });
      toast.success("Account created successfully!");
      navigate("/"); // Redirect to dashboard or home
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar alwaysOpaque />

        <div className="flex-grow pt-32 pb-16 px-4">
          <RevealOnScroll>
            <div className="max-w-md mx-auto bg-white dark:bg-card rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-border">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Create Account
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Join BigBets.AI to start your journey
                </p>
              </div>

              <form className="space-y-6" onSubmit={onSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 dark:text-white"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 dark:text-white"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 dark:text-white"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 dark:text-white"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-500 dark:text-gray-400"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms-of-service"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  className="w-full h-12 text-lg font-medium"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}{" "}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary font-semibold hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </div>
          </RevealOnScroll>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Signup;
