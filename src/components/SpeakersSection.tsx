const speakers = [
  { name: "Rupessh Goel", title: "Managing Director", company: "US Bank GCC" },
  { name: "Vivek Rajagopal", title: "Group Chief Analytics & AI Officer", company: "Narayana Health" },
  { name: "Amrish Kumar", title: "Chief Product & Technology Officer", company: "Ascent Health Solutions" },
  { name: "Srinivas Achyutuni", title: "Chief Technology Officer", company: "Omendon Holding Limited" },
  { name: "Vivek Zakarde", title: "Head- Data Strategy, AI & Privacy Officer", company: "India First Life" },
  { name: "Dr. Vamshi Krishna", title: "Chief Growth Officer", company: "Apollo Radiology International" },
  { name: "Dr. Anish Agarwal", title: "VP and Global Head of AI & Automation", company: "Warner Bros. Discovery" },
  { name: "Aditya Ranjan Patro", title: "AI Innovation & Strategy Leader", company: "" },
  { name: "Mukesh Rathi", title: "Chief Advisor", company: "Mukesh Rathi Advisory Services" },
  { name: "Vikram Peruka", title: "Global Head of Product Modernization", company: "Cigna Healthcare" },
  { name: "Dilip Manepalli", title: "VP - Innovation & Analytics", company: "Vodafone" },
  { name: "Anurag Garg", title: "SVP and GCC Head of Technology", company: "Ryan" },
  { name: "Nitin Kumar Satankar", title: "AVP Industrial AI and IOT Edge Platforms", company: "JioThings" },
  { name: "Vijay Morampudi", title: "Senior Vice President", company: "MARSH GCC" },
  { name: "Ranan Bhattacharya", title: "Head of Intelligent Automation", company: "Shell" },
  { name: "Aditya Srivastava", title: "Senior Associate Director", company: "HSBC" },
  { name: "Arun Soni", title: "EVP and Country Manager", company: "ConnX Communications" },
  { name: "Sajid Husain", title: "Asst. Director – Digital Transformation", company: "EY" },
  { name: "Supriya Naik", title: "Senior Vice President - AI Products", company: "Opzen" },
  { name: "Harshad Prabhakar Sawant", title: "Director", company: "Global Cybersecurity Engineering" },
];

const getInitials = (name: string) => {
  return name
    .replace(/Dr\.\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const SpeakersSection = () => {
  return (
    <section className="section-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12 text-secondary">
          Speakers & Panelists
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {speakers.map((s) => (
            <div key={s.name} className="text-center group">
              <div className="w-24 h-24 mx-auto rounded-full gradient-teal flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <span className="font-heading font-bold text-xl text-primary-foreground">
                  {getInitials(s.name)}
                </span>
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
