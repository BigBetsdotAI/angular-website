import { useState, useEffect, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import testimonialAvatar from "@/assets/testimonial-avatar.png";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const AUTO_SWIPE_INTERVAL = 5000; // 5 seconds

  const testimonials = [
    {
      quote:
        "Outstanding cloud migration services. BigBets.AI helped us scale our infrastructure seamlessly while reducing costs by 40%.",
      name: "Emily Rodriguez",
      role: "VP Engineering, DataFlow",
      company: "DataFlow",
      avatar: "ER",
    },
    {
      quote:
        "BigBets.AI delivered an exceptional AI-powered solution that transformed our business operations. Their expertise in machine learning is unmatched.",
      name: "Sarah Johnson",
      role: "CTO, TechCorp",
      company: "TechCorp",
      avatar: "SJ",
    },
    {
      quote:
        "Working with BigBets.AI was a game-changer for our startup. They built a scalable platform that handles millions of transactions seamlessly.",
      name: "Michael Chen",
      role: "CEO, FinanceHub",
      company: "FinanceHub",
      avatar: "MC",
    },
    {
      quote:
        "Their team expertise in cloud solutions helped us reduce infrastructure costs by 40% while improving performance significantly.",
      name: "David Park",
      role: "Director of IT, GlobalTech",
      company: "GlobalTech",
      avatar: "DP",
    },
  ];

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto-swipe effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, AUTO_SWIPE_INTERVAL);

    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied
            clients
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-50 dark:bg-card rounded-2xl p-8 md:p-12">
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <Quote className="w-12 h-12 text-primary/30" />
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            {/* Quote Text */}
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl text-center italic mb-8 leading-relaxed">
              &quot;{currentTestimonial.quote}&quot;
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonialAvatar}
                alt={currentTestimonial.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {currentTestimonial.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentTestimonial.role}
                </p>
                <a href="#" className="text-sm text-primary hover:underline">
                  {currentTestimonial.company}
                </a>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-background flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-background flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
