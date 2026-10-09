import aiImage from "../assets/images/aiimage.png";
import aiCloudDoc from "../assets/AI_and_Cloud_Digital_Transformation.docx";

// Centralized whitepaper data — add new whitepapers here
export const WHITEPAPERS = [
  {
    id: "accelerating-digital-transformation",
    title: "Accelerating Digital Transformation with AI and Cloud",
    category: "Cloud & AI",
    date: "November 10, 2026",
    image: aiImage,
    fileUrl: aiCloudDoc,
    author: "Niket Kumar",
    role: "Technical Lead",
    overview: "Artificial Intelligence (AI) and Cloud Computing are transforming the way organizations operate. By combining scalable cloud infrastructure with intelligent automation, businesses can improve efficiency, reduce costs, and enhance decision-making.",
    keyBenefits: [
      "Streamlined operations through automation",
      "Reduced infrastructure and maintenance costs",
      "Faster application development and deployment",
      "Data-driven business insights",
      "Improved customer experiences and satisfaction"
    ],
    businessImpact: "Organizations adopting AI and cloud technologies can achieve greater agility, increased productivity, and improved scalability while maintaining security and compliance standards.",
    conclusion: "AI and cloud technologies are critical enablers of digital transformation. Businesses that embrace these innovations are better positioned to drive growth, improve operational excellence, and remain competitive in a rapidly evolving digital landscape."
  },
  {
    id: "hybrid-silicon-architectures",
    title: "Hybrid Silicon Architectures for Next-Gen Neural Processing",
    category: "Silicon",
    date: "October 05, 2026",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80",
    fileUrl: aiCloudDoc, // Reuse the doc for demo purposes
    author: "Dr. Sarah Chen",
    role: "Lead Hardware Architect",
    overview: "An exhaustive technical analysis of implementing mixed-precision quantization natively within ASIC architecture to maximize TOPS/W for edge intelligence.",
    keyBenefits: [
      "Sub-picojoule energy per inference",
      "Deterministic execution timing",
      "Enhanced physical security at the edge"
    ],
    businessImpact: "Dramatically lowers the thermal footprint of edge devices while extending battery life by up to 5x.",
    conclusion: "Native mixed-precision quantization is no longer optional for competitive edge ML deployments."
  },
  {
    id: "automotive-ethernet-standards",
    title: "Zonal Compute and Automotive Ethernet Standards",
    category: "Automotive",
    date: "September 22, 2026",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop&q=80",
    fileUrl: aiCloudDoc, // Reuse the doc for demo purposes
    author: "David Lin",
    role: "VP of Engineering",
    overview: "Comprehensive benchmarking data comparing traditional CAN-FD networks against Gigabit Automotive Ethernet in central domain architectures.",
    keyBenefits: [
      "100x bandwidth increase over CAN",
      "Significant reduction in wire harness weight",
      "Simplified OTA firmware deployments"
    ],
    businessImpact: "Reduces manufacturing complexity and enables software-defined features previously impossible due to bandwidth bottlenecks.",
    conclusion: "Automotive Ethernet is the definitive backbone for Level 3+ autonomous platforms."
  }
];
