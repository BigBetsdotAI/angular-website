import { useState, useEffect, useCallback } from "react";
import { Star, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import testimonialAvatar from "@/assets/testimonial-avatar.png";

const InternTestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const AUTO_SWIPE_INTERVAL = 5000; // 5 seconds

  const testimonials = [
    {
      quote:
        "The internship at BigBets.AI was an incredible learning experience. I got to work on a real-world project and received amazing mentorship.",
      name: "Anjali Gupta",
      role: "Web Development Intern",
      avatar: "AG",
    },
    {
      quote:
        "Best internship experience! The team was supportive and I learned more in 3 months here than in my entire college curriculum.",
      name: "Rahul Sharma",
      role: "AI/ML Intern",
      avatar: "RS",
    },
    {
      quote:
        "BigBets.AI gave me the opportunity to work on cutting-edge technologies. The hands-on experience was invaluable for my career.",
      name: "Priya Patel",
      role: "Mobile App Intern",
      avatar: "PP",
    },
  ];

  const changeTestimonial = useCallback((newIndex: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 150);
  }, []);

  const nextTestimonial = useCallback(() => {
    changeTestimonial((currentIndex + 1) % testimonials.length);
  }, [currentIndex, testimonials.length, changeTestimonial]);

  const prevTestimonial = () => {
    changeTestimonial(
      (currentIndex - 1 + testimonials.length) % testimonials.length
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
    <section className="py-24 bg-white dark:bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            From Our <span className="text-primary">Interns</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Hear about the experiences of students who started their tech
            careers with us
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-50 dark:bg-card rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Animated Content */}
            <div
              className={`transition-all duration-300 ease-out ${
                isAnimating
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {/* Graduation Cap Icon */}
              <div className="flex justify-center mb-6">
                <GraduationCap className="w-12 h-12 text-primary/50" />
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
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-background flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-background flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-10"
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
                onClick={() => changeTestimonial(index)}
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

export default InternTestimonialsSection;
