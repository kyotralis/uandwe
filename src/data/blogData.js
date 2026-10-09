export const BLOG_POSTS = [
  {
    id: "edge-ai-future",
    title: "The Future of Edge AI: Bringing Intelligence to Silicon",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&auto=format&fit=crop&q=80",
    category: "AI & Data",
    date: "October 12, 2026",
    overview: "Explore how the convergence of embedded systems and machine learning is redefining what's possible at the edge, reducing latency and enhancing privacy.",
    author: "Dr. Sarah Chen",
    role: "Lead Hardware Architect",
    content: "Edge AI is rapidly moving from theory to reality. By running neural networks directly on the device rather than relying on a cloud connection, we achieve deterministic latency, robust offline functionality, and complete data privacy. But the hardware constraints are severe. The challenge lies in designing custom silicon accelerators—NPU blocks within SoCs—that provide high TOPS/W (Tera Operations Per Second per Watt). At UANDWE, our architecture teams are implementing mixed-precision quantization techniques directly into hardware, allowing complex vision models to run on battery-powered devices. The convergence of TinyML frameworks and specialized ASIC design is paving the way for ubiquitous intelligence."
  },
  {
    id: "cpo-silicon-photonics",
    title: "Co-Packaged Optics (CPO) at Scale: Silicon Photonics in Next-Gen Compute",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80",
    category: "Semiconductor",
    date: "August 25, 2026",
    overview: "How co-packaged optics and integrated silicon photonics are breaking through copper interconnect limits to power AI datacenter workloads.",
    author: "Raoul Kubitschek",
    role: "Principal Optical Engineer",
    content: "As artificial intelligence clusters grow into hundreds of thousands of GPUs, traditional electrical copper interconnects face severe physical limitations in bandwidth, thermal dissipation, and reach. Co-Packaged Optics (CPO) integrates optical transceivers directly onto the multi-chip module substrate alongside the compute silicon. This drastically slashes electrical trace lengths from inches to millimeters, delivering an order-of-magnitude reduction in interconnect power. At UANDWE, our silicon photonics team is architecting electro-optic co-design methodologies that achieve sub-picojoule-per-bit energy efficiency."
  },
  {
    id: "subfab-infrastructure",
    title: "The Role of Subfab Infrastructure in Modern 3nm Semiconductor Fabs",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&auto=format&fit=crop&q=80",
    category: "Hardware",
    date: "August 24, 2026",
    overview: "Uncovering the critical role of subfab abatement, chemical delivery, and vacuum subsystems in maintaining yield at leading-edge nodes.",
    author: "Mayura Padmanabhan",
    role: "Fab Systems Director",
    content: "Behind the pristine cleanroom floors of modern wafer fabs lies the intricate subfab infrastructure. Subfab vacuum pumps, gas abatement scrubbers, and ultra-pure chemical distribution networks run 24/7 to maintain the extreme vacuum levels required by extreme ultraviolet (EUV) lithography scanners. At sub-3nm nodes, any minor pressure fluctuation or chemical contamination causes devastating yield drops. UANDWE partners with leading equipment makers to deliver automated telemetry and closed-loop process control systems."
  },
  {
    id: "software-defined-vehicles",
    title: "Zonal Architectures & AUTOSAR: Powering Software-Defined Vehicles",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop&q=80",
    category: "Automotive",
    date: "August 18, 2026",
    overview: "Transitioning from dozens of decentralized ECUs to high-performance centralized domain controllers over Automotive Ethernet.",
    author: "David Lin",
    role: "VP of Automotive Engineering",
    content: "The automotive industry is undergoing its greatest paradigm shift in a century. Modern vehicles are transitioning from fragmented networks of 100+ decentralized microcontrollers to centralized zonal architectures anchored by high-performance compute clusters. Running AUTOSAR Adaptive on Linux/QNX alongside real-time Classic AUTOSAR cores enables over-the-air firmware updates and rapid feature rollout. UANDWE engineers vehicle software architectures adhering strictly to ISO 26262 ASIL-D functional safety standards."
  },
  {
    id: "3nm-timing-closure",
    title: "Achieving PPA & Timing Closure at Advanced 3nm GAA FinFET Nodes",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1600&auto=format&fit=crop&q=80",
    category: "VLSI",
    date: "August 12, 2026",
    overview: "Strategies for managing extreme interconnect resistance, electro-migration, and multi-corner multi-mode timing signoff.",
    author: "Dr. Rajesh Kumar",
    role: "Chief Silicon Architect",
    content: "Shrinking transistor gate lengths to 3nm and introducing Gate-All-Around (GAA) nanosheet devices delivers remarkable density improvements, but physical design complexity escalates exponentially. Interconnect parasitic resistance increases exponentially in thin metal layers, making clock tree synthesis (CTS) and timing signoff immensely challenging. UANDWE’s physical design methodology incorporates machine-learning-assisted placement and early signoff parasitic extraction, ensuring first-pass tapeout success."
  },
  {
    id: "medical-firmware-safety",
    title: "Deterministic RTOS and IEC 62304 Compliance in Connected Medical Devices",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&auto=format&fit=crop&q=80",
    category: "Healthcare",
    date: "July 30, 2026",
    overview: "Architecting zero-failure embedded firmware for point-of-care diagnostics and life-critical patient monitoring devices.",
    author: "Elena Rodriguez",
    role: "Head of Embedded Systems",
    content: "In medical device engineering, software bugs aren't just inconvenient—they can be life-threatening. Developing firmware for ventilators, infusion pumps, and wearable telemetry monitors demands absolute determinism and strict adherence to IEC 62304 Class C development standards. UANDWE’s embedded healthcare division specializes in formal verification, memory-safe embedded architectures, and secure medical IoT communications protocols."
  }
];
