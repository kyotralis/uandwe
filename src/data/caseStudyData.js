export const CASE_STUDIES = [
  {
    id: "autonomous-vehicle-asic",
    title: "Revolutionizing Autonomous Vehicle Perception with Custom ASICs",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80",
    client: "Tier-1 Automotive OEM",
    category: "VLSI",
    impact: "40% Latency Reduction",
    overview: "How we partnered with a leading Tier-1 automotive supplier to design and tape-out a 5nm vision-processing ASIC that reduced latency by 40% while slashing power consumption.",
    author: "Rajesh Kumar",
    role: "Chief Silicon Architect",
    content: "Autonomous driving requires instantaneous processing of massive amounts of sensor data. General-purpose GPUs consume too much power and introduce unacceptable latency. We collaborated with a global Tier-1 supplier to design a custom 5nm ASIC specifically for sensor fusion and vision processing. Our physical design experts managed extreme routing congestion to achieve a tiny die size. The result was a chip that achieved 40% lower latency than off-the-shelf solutions while consuming a fraction of the power, enabling Level 4 autonomy within strict thermal constraints."
  },
  {
    id: "medical-device-firmware",
    title: "Zero-Fault Embedded Firmware for Critical Care Devices",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&auto=format&fit=crop&q=80",
    client: "Global MedTech Leader",
    category: "Embedded Systems",
    impact: "FDA Class III Approval",
    overview: "Redesigning the real-time embedded architecture of a life-critical patient monitoring system to meet strict FDA regulatory compliance with absolute zero-downtime reliability.",
    author: "Elena Rodriguez",
    role: "Head of Embedded Systems",
    content: "When a global medical technology provider needed to upgrade their flagship ICU monitoring hardware, they required firmware that simply could not fail. Our embedded engineering team architected a highly deterministic RTOS environment, separating critical life-support loops from UI processes using strict memory protection units. Through rigorous unit testing, formal verification, and strict MISRA C compliance, we delivered a codebase that successfully passed FDA Class III certification on its first submission, dramatically accelerating time-to-market."
  },
  {
    id: "5g-edge-ai-hardware",
    title: "Scaling 5G Infrastructure with Edge AI Acceleration",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&auto=format&fit=crop&q=80",
    client: "National Telecom Provider",
    category: "Hardware Design",
    impact: "3x Throughput Increase",
    overview: "Engineering a ruggedized, highly thermal-efficient Edge AI hardware module capable of processing localized 5G telemetry data at the cell tower.",
    author: "Dr. Sarah Chen",
    role: "Lead Hardware Architect",
    content: "To reduce cloud dependency, a national telecom provider wanted to process predictive maintenance telemetry directly at the cell tower base station. This required placing high-performance AI accelerators in environments with zero climate control. Our hardware team designed a ruggedized PCB architecture utilizing passive immersion cooling techniques. By tightly integrating Neural Processing Units (NPUs) with custom FPGA bridges, the hardware achieved a 3x increase in localized data throughput while operating flawlessly in temperatures ranging from -40°C to 85°C."
  },
  {
    id: "datacenter-silicon-photonics",
    title: "Breaking the Copper Barrier with Silicon Photonics",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1600&auto=format&fit=crop&q=80",
    client: "Hyperscale Cloud Provider",
    category: "Semiconductor",
    impact: "60% Power Savings",
    overview: "Integrating co-packaged optics (CPO) onto a custom multi-chip module to solve thermal and bandwidth limitations in next-generation AI data centers.",
    author: "Raoul Kubitschek",
    role: "Principal Optical Engineer",
    content: "As AI training clusters scale, traditional copper interconnects become severe bottlenecks due to signal degradation and extreme power draw. We partnered with a hyperscale cloud provider to implement Co-Packaged Optics. By moving optical transceivers directly onto the computing substrate, we shortened electrical trace lengths to millimeters. This highly complex electro-optic integration successfully delivered terabit-scale bandwidth between compute nodes while slashing interconnect power consumption by 60%."
  },
  {
    id: "industrial-robotics-control",
    title: "Real-Time Motor Control for Sub-Millimeter Robotics",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&auto=format&fit=crop&q=80",
    client: "Advanced Manufacturing Co.",
    category: "Hardware & Embedded",
    impact: "99.9% Precision Accuracy",
    overview: "Developing a custom motor control board and dual-core firmware to enable sub-millimeter precision for automated high-speed assembly line robots.",
    author: "Mayura Padmanabhan",
    role: "Fab Systems Director",
    content: "High-speed assembly lines require robotic arms capable of making microscopic adjustments in real-time. Off-the-shelf controllers were introducing too much jitter. Our team developed a custom high-voltage PCB coupled with a dual-core microcontroller architecture. One core was dedicated exclusively to running complex Field-Oriented Control (FOC) algorithms in hard real-time, while the second core managed network communications and safety protocols. The resulting system achieved 99.9% precision accuracy at unprecedented assembly speeds."
  },
  {
    id: "wearable-iot-power",
    title: "Achieving 1-Year Battery Life in Smart Health Wearables",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop&q=80",
    client: "Consumer Tech Startup",
    category: "IoT",
    impact: "5x Battery Life Extension",
    overview: "Optimizing the silicon architecture, board layout, and firmware sleep-states to extend the battery life of a continuous heart-rate monitor from weeks to an entire year.",
    author: "David Lin",
    role: "VP of Engineering",
    content: "A consumer tech startup had a brilliant algorithm for continuous cardiac monitoring, but their prototype died after just two weeks. We conducted a holistic teardown of their system. We migrated their design to an ultra-low-power MCU, redesigned the PCB to eliminate parasitic current draws, and rewrote the firmware to utilize deep-sleep states aggressively, waking up only for microsecond data bursts. This comprehensive optimization extended the wearable's battery life to over a year on a single coin cell."
  }
];
