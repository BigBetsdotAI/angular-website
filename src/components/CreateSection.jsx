import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/CreateSection.css";
import createImg from "../assets/images/create.png";
import TypeWriter from "./TypeWriter";

const tabs = [
  { icon: "📄", label: "Create" },
  { icon: "💡", label: "Distribute" },
  { icon: "📋", label: "Collect" },
  { icon: "🔍", label: "Analyze" },
];

function CreateSection() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <section>
      <div className="create-hero">
        <span className="create-label">BUILT FOR PEOPLE</span>
        <h2 className="create-heading">Easy For Beginners. Powerful For Experts.</h2>
        <nav className="tab-bar" style={{ position: "relative" }}>
          <ul className="tab-list">
            {tabs.map((tab) => (
              <motion.li
                key={tab.label}
                className={`tab${selectedTab.label === tab.label ? " active" : ""}`}
                onClick={() => setSelectedTab(tab)}
                style={{ position: "relative" }}
              >
                <span className="tab-icon" role="img" aria-label={tab.label}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                {selectedTab.label === tab.label && (
                  <motion.div
                    className="tab-underline"
                    layoutId="underline"
                    style={{
                      position: "absolute",
                      bottom: -8,
                      left: "12%",
                      right: "12%",
                      height: "5px",
                      borderRadius: "4px",
                      background: "#ff4747",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="create-bg">
        <div className="create-feature">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab.label}
              className="create-feature-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <h3><TypeWriter key={`title-${selectedTab.label}`} text={selectedTab.label} speed={100} /></h3>
              <b>
                <TypeWriter 
                  key={`subtitle-${selectedTab.label}`}
                  text={
                    selectedTab.label === "Create" ? "Advanced research software" :
                    selectedTab.label === "Distribute" ? "Distribute smarter" :
                    selectedTab.label === "Collect" ? "Collect data easily" :
                    "Analyze like a pro"
                  }
                  speed={80}
                  delay={selectedTab.label.length * 100 + 200}
                />
              </b>
              <p>
                <TypeWriter 
                  key={`description-${selectedTab.label}`}
                  text={
                    selectedTab.label === "Create" ? 
                      "Ask the right questions and get the answers you need with the most secure and collaborative survey platform on the market featuring powerful logic, sophisticated analytics, and built-in automation and integration." :
                    selectedTab.label === "Distribute" ? 
                      "Share your forms and surveys across every platform with distribution tools designed for maximum reach and control." :
                    selectedTab.label === "Collect" ? 
                      "Seamlessly collect responses in real-time, with tools for easy tracking, filtering, and exporting your data." :
                      "Turn responses into insights using powerful, intuitive analytics and rich visual reporting tools."
                  }
                  speed={30}
                  delay={selectedTab.label.length * 100 + 400 + (selectedTab.label === "Create" ? "Advanced research software" : selectedTab.label === "Distribute" ? "Distribute smarter" : selectedTab.label === "Collect" ? "Collect data easily" : "Analyze like a pro").length * 80}
                />
              </p>
              <button className="create-btn">Get started for free</button>
            </motion.div>
          </AnimatePresence>
          <div className="create-feature-right">
            <img src={createImg} alt={`${selectedTab.label} feature`} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateSection;
