import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";

const speakers = [
  { name: "Rupessh Goel", title: "Managing Director", company: "US Bank GCC", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Vivek Rajagopal", title: "Group Chief Analytics & AI Officer", company: "Narayana Health", img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Amrish Kumar", title: "Chief Product & Technology Officer", company: "Ascent Health Solutions", img: "https://randomuser.me/api/portraits/men/22.jpg" },
  { name: "Srinivas Achyutuni", title: "Chief Technology Officer", company: "Omendon Holding Limited", img: "https://randomuser.me/api/portraits/men/55.jpg" },
  { name: "Vivek Zakarde", title: "Head- Data Strategy, AI & Privacy Officer", company: "India First Life", img: "https://randomuser.me/api/portraits/men/61.jpg" },
  { name: "Dr. Vamshi Krishna", title: "Chief Growth Officer", company: "Apollo Radiology International", img: "https://randomuser.me/api/portraits/men/75.jpg" },
  { name: "Dr. Anish Agarwal", title: "VP and Global Head of AI & Automation", company: "Warner Bros. Discovery", img: "https://randomuser.me/api/portraits/men/36.jpg" },
  { name: "Aditya Ranjan Patro", title: "AI Innovation & Strategy Leader", company: "", img: "https://randomuser.me/api/portraits/men/41.jpg" },
  { name: "Mukesh Rathi", title: "Chief Advisor", company: "Mukesh Rathi Advisory Services", img: "https://randomuser.me/api/portraits/men/52.jpg" },
  { name: "Vikram Peruka", title: "Global Head of Product Modernization", company: "Cigna Healthcare", img: "https://randomuser.me/api/portraits/men/64.jpg" },
  { name: "Dilip Manepalli", title: "VP - Innovation & Analytics", company: "Vodafone", img: "https://randomuser.me/api/portraits/men/71.jpg" },
  { name: "Anurag Garg", title: "SVP and GCC Head of Technology", company: "Ryan", img: "https://randomuser.me/api/portraits/men/15.jpg" },
  { name: "Nitin Kumar Satankar", title: "AVP Industrial AI and IOT Edge Platforms", company: "JioThings", img: "https://randomuser.me/api/portraits/men/28.jpg" },
  { name: "Vijay Morampudi", title: "Senior Vice President", company: "MARSH GCC", img: "https://randomuser.me/api/portraits/men/33.jpg" },
  { name: "Ranan Bhattacharya", title: "Head of Intelligent Automation", company: "Shell", img: "https://randomuser.me/api/portraits/men/48.jpg" },
  { name: "Aditya Srivastava", title: "Senior Associate Director", company: "HSBC", img: "https://randomuser.me/api/portraits/men/57.jpg" },
  { name: "Arun Soni", title: "EVP and Country Manager", company: "ConnX Communications", img: "https://randomuser.me/api/portraits/men/67.jpg" },
  { name: "Sajid Husain", title: "Asst. Director – Digital Transformation", company: "EY", img: "https://randomuser.me/api/portraits/men/77.jpg" },
  { name: "Supriya Naik", title: "Senior Vice President - AI Products", company: "Opzen", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Harshad Prabhakar Sawant", title: "Director", company: "Global Cybersecurity Engineering", img: "https://randomuser.me/api/portraits/men/82.jpg" },
];

const SpeakersSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerAnimation(speakers.length);

  return (
    <section className="section-white py-20">
      <div className="container mx-auto px-4">
        <div ref={titleRef}>
          <h2
            className={`font-heading font-bold text-3xl md:text-4xl text-center mb-12 text-secondary opacity-0 ${
              titleVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Speakers & Panelists
          </h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {speakers.map((s, i) => (
            <div
              key={s.name}
              className={`text-center group opacity-0 ${gridVisible ? "animate-scale-fade-in" : ""}`}
              style={gridVisible ? getDelay(i) : {}}
            >
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3 group-hover:scale-105 transition-transform shadow-lg ring-2 ring-primary/20 group-hover:ring-primary/50">
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h4 className="font-heading font-bold text-sm text-secondary">{s.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{s.title}</p>
              {s.company && (
                <p className="text-xs font-semibold text-primary mt-0.5">{s.company}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
