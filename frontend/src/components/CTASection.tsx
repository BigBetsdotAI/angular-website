import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section id="contact" className="py-24 bg-primary relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>

          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
            Let's discuss how we can help you achieve your digital goals with
            our innovative solutions
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/contact">
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-base w-full sm:w-auto">
                Get Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-6 text-base transition-colors w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                View Our Work
              </Button>
            </Link>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white italic">
                24/7
              </p>
              <p className="text-white/70 text-sm mt-1">Support Available</p>
            </div>

            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white italic">
                Free
              </p>
              <p className="text-white/70 text-sm mt-1">Initial Consultation</p>
            </div>

            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white italic">
                100%
              </p>
              <p className="text-white/70 text-sm mt-1">
                Satisfaction Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
