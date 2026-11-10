/**
 * Environmental Facts and Educational Content
 * Used in the Eco Awareness and Recycling Guide sections.
 */

export const DID_YOU_KNOW_FACTS = [
  "Every year, approximately 8 million tonnes of plastic enter the world's oceans.",
  "Recycling one aluminium can saves enough energy to listen to a full album on your phone.",
  "Glass can be recycled endlessly without any loss in quality or purity.",
  "The average person generates about 0.74 kg of waste per day globally.",
  "Composting can divert up to 30% of household waste from landfills.",
  "It takes about 450 years for a plastic bottle to decompose in a landfill.",
  "Paper can be recycled up to 5–7 times before the fibres become too short.",
  "Producing recycled paper uses 70% less energy than making it from raw materials.",
  "Food waste in landfills generates methane, a greenhouse gas 25 times more potent than CO₂.",
  "India generates over 62 million tonnes of waste annually, of which only 20% is processed.",
  "A single recycled plastic bottle can save enough energy to power a computer for 25 minutes.",
  "Aluminium takes 200–500 years to decompose but can be recycled in just 60 days.",
  "Nearly one-third of all food produced globally is wasted every year.",
  "E-waste is the fastest-growing waste stream in the world.",
  "If all newspapers were recycled, 250 million trees could be saved each year."
];

export const AWARENESS_CONTENT = {
  whySegregation: {
    title: "Why Waste Segregation Matters",
    content: "Waste segregation is the process of separating different types of waste at the source. When waste is properly segregated, recyclable materials can be recovered efficiently, organic waste can be composted, and hazardous waste can be handled safely. Without segregation, all waste ends up in landfills where recyclable materials are lost and organic waste produces harmful methane gas. Proper segregation is the first and most important step toward sustainable waste management.",
    points: [
      "Reduces the amount of waste sent to landfills",
      "Makes recycling more efficient and cost-effective",
      "Prevents contamination of recyclable materials",
      "Reduces greenhouse gas emissions from landfills",
      "Conserves natural resources by enabling material recovery"
    ]
  },
  wetVsDry: {
    title: "Wet Waste vs Dry Waste",
    wet: {
      description: "Wet waste refers to biodegradable or organic waste that decomposes naturally.",
      examples: ["Food scraps and leftovers", "Fruit and vegetable peels", "Tea leaves and coffee grounds", "Garden waste and flowers", "Eggshells"]
    },
    dry: {
      description: "Dry waste refers to non-biodegradable or recyclable waste that does not decompose easily.",
      examples: ["Plastic bottles and packaging", "Paper, cardboard and newspapers", "Metal cans and foil", "Glass bottles and jars", "Rubber and leather items"]
    }
  },
  recyclingBenefits: {
    title: "Benefits of Recycling",
    points: [
      { title: "Conserves Natural Resources", description: "Recycling reduces the need to extract raw materials from the Earth, preserving forests, water and minerals." },
      { title: "Saves Energy", description: "Manufacturing products from recycled materials uses significantly less energy than using virgin materials." },
      { title: "Reduces Pollution", description: "Recycling reduces air and water pollution associated with extracting and processing raw materials." },
      { title: "Creates Jobs", description: "The recycling industry creates employment opportunities in collection, processing and manufacturing." },
      { title: "Reduces Landfill Waste", description: "Recycling diverts materials from landfills, extending their lifespan and reducing land use." }
    ]
  },
  plasticPollution: {
    title: "Plastic Pollution Awareness",
    content: "Plastic pollution is one of the most pressing environmental challenges of our time. Single-use plastics — bags, bottles, straws and packaging — account for a large portion of plastic waste. These items are used for minutes but persist in the environment for centuries. Microplastics have been found in the deepest oceans, on the highest mountains, in drinking water and even in human blood. Reducing plastic consumption and ensuring proper disposal and recycling are essential steps everyone can take.",
    impacts: [
      "Marine animals mistake plastic for food, leading to injury and death",
      "Microplastics enter the food chain and affect human health",
      "Plastic production contributes to greenhouse gas emissions",
      "Landfills leach toxic chemicals from plastic into soil and groundwater",
      "Plastic waste damages tourism and local economies in coastal areas"
    ]
  },
  composting: {
    title: "Composting Basics",
    content: "Composting is the natural process of recycling organic matter into nutrient-rich soil amendment. It is one of the simplest and most effective ways to reduce household waste while creating valuable fertiliser for gardens.",
    steps: [
      "Choose a composting method — bin, tumbler or open pile",
      "Add a balanced mix of 'greens' (nitrogen-rich) and 'browns' (carbon-rich)",
      "Greens include fruit scraps, vegetable peels and grass clippings",
      "Browns include dry leaves, cardboard, newspaper and wood chips",
      "Keep the compost moist but not waterlogged",
      "Turn the pile regularly to provide air circulation",
      "Compost is ready when it is dark, crumbly and earthy-smelling (typically 2–6 months)"
    ]
  },
  sustainableHabits: {
    title: "Simple Sustainable Habits",
    habits: [
      { habit: "Carry a Reusable Bag", description: "Avoid single-use plastic bags by keeping a cloth or jute bag with you." },
      { habit: "Use a Refillable Water Bottle", description: "A single reusable bottle can replace hundreds of plastic bottles per year." },
      { habit: "Say No to Straws", description: "Skip the straw or use a reusable metal or bamboo alternative." },
      { habit: "Buy in Bulk", description: "Purchasing in larger quantities reduces packaging waste." },
      { habit: "Compost at Home", description: "Turn food scraps into nutrient-rich soil for your garden." },
      { habit: "Repair Before Replacing", description: "Fix items when possible instead of discarding and buying new ones." },
      { habit: "Choose Digital Over Print", description: "Opt for digital receipts, tickets and documents when available." },
      { habit: "Support Local and Seasonal", description: "Buying local and seasonal produce reduces transportation emissions and packaging." }
    ]
  }
};

export const SDG_GOALS = [
  {
    number: 11,
    title: "Sustainable Cities and Communities",
    description: "Make cities and human settlements inclusive, safe, resilient and sustainable. EcoVision AI helps by promoting responsible waste disposal within communities.",
    color: "#F99D26"
  },
  {
    number: 12,
    title: "Responsible Consumption and Production",
    description: "Ensure sustainable consumption and production patterns. EcoVision AI encourages users to think about how their waste is disposed and recycled.",
    color: "#CF8D2A"
  },
  {
    number: 13,
    title: "Climate Action",
    description: "Take urgent action to combat climate change and its impacts. Proper waste management reduces methane emissions from landfills and decreases the need for energy-intensive raw material extraction.",
    color: "#48773E"
  }
];
