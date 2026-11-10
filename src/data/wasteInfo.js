/**
 * Waste Information & Smart Disposal Knowledge Base
 * =================================================
 * Maps each classified waste category to its recommended bin,
 * step-by-step disposal instructions, recycling/reuse ideas,
 * and verified environmental benefits.
 */

export const WASTE_CATEGORIES = ["Plastic", "Paper", "Metal", "Organic Waste"];

export const CATEGORY_COLORS = {
  Plastic: "#0284C7", // Sky blue
  Paper: "#D97706", // Warm amber
  Metal: "#475569", // Slate steel
  "Organic Waste": "#16A34A", // Leaf green
};

/**
 * Normalizes labels returned by Google Teachable Machine so minor variations
 * like "Organic", "organic waste", "PLASTIC", etc. map cleanly to canonical categories.
 */
export function normalizeCategoryLabel(rawLabel) {
  if (!rawLabel || typeof rawLabel !== "string") return "Unknown";
  const cleaned = rawLabel.trim().toLowerCase().replace(/[_-]+/g, " ");

  if (cleaned === "plastic" || cleaned.includes("plastic")) return "Plastic";
  if (cleaned === "paper" || cleaned.includes("paper") || cleaned.includes("cardboard")) {
    return "Paper";
  }
  if (cleaned === "metal" || cleaned.includes("metal") || cleaned.includes("aluminium") || cleaned.includes("aluminum") || cleaned.includes("tin") || cleaned.includes("can")) {
    return "Metal";
  }
  if (
    cleaned === "organic waste" ||
    cleaned === "organic" ||
    cleaned.includes("organic") ||
    cleaned.includes("biodegradable") ||
    cleaned.includes("compost") ||
    cleaned.includes("wet waste") ||
    cleaned.includes("food")
  ) {
    return "Organic Waste";
  }

  return rawLabel.trim();
}

const WASTE_INFO = {
  Plastic: {
    icon: "♻️",
    color: "#0284C7",
    bgColor: "#F0F9FF",
    badgeClass: "bg-sky-100 text-sky-800 border-sky-200",
    barClass: "bg-sky-600",
    barTrackClass: "bg-sky-100",
    binType: "Dry Waste (Recyclable Stream)",
    binColor: "Blue Bin",
    commonExamples: "Plastic bottles, food containers, milk jugs, clean packaging films",
    description:
      "Synthetic polymer items that resist natural decay and require clean sorting into dry recycling streams.",
    disposalSteps: [
      "Empty out any remaining liquid or food residue and give the item a quick rinse.",
      "Separate caps, pumps, or shrink-wrap sleeves if your local recycling facility requires it.",
      "Check the resin identification code (1–7) printed on the base.",
      "Flatten plastic bottles or containers to save bin and transport space.",
      "Place in the Dry Waste / Blue Recyclable Bin or drop off at a plastic collection point.",
    ],
    recyclingSuggestions: [
      "Clean PET bottles (Code 1) and HDPE containers (Code 2) are widely recycled into new packaging or textile fibres.",
      "Reuse sturdy clean tubs and jars for household or school supply storage.",
      "Switch to refillable bottles and cloth bags to cut single-use plastic demand.",
      "Collect clean multi-layer wrappers separately for authorised plastic recovery drives.",
    ],
    environmentalBenefit:
      "Sorting clean plastic for recycling reduces demand for virgin petroleum, lowers manufacturing energy, and prevents plastics from breaking down into microplastics in waterways and soil.",
    decompositionTime: "100 – 450+ years in landfills",
    streamType: "recycling",
    canRecycle: true,
    canCompost: false,
  },
  Paper: {
    icon: "📄",
    color: "#D97706",
    bgColor: "#FFFBEB",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
    barClass: "bg-amber-500",
    barTrackClass: "bg-amber-100",
    binType: "Dry Waste (Recyclable Stream)",
    binColor: "Blue Bin",
    commonExamples: "Newspapers, notebooks, cardboard cartons, paper bags, envelopes",
    description:
      "Wood-pulp and cellulose materials that can be pulped and remanufactured into recycled paper products when kept clean and dry.",
    disposalSteps: [
      "Make sure the paper or cardboard is completely dry and free from oil or food stains.",
      "Remove plastic tape, bubble wrap, metal spiral bindings, or heavy staples.",
      "Flatten cardboard boxes neatly before placing them in the bin.",
      "Keep soiled tissue or greasy pizza boxes out of dry paper recycling (compost clean uncoated scraps instead).",
      "Place clean paper and flattened cartons in the Dry Waste / Blue Recyclable Bin.",
    ],
    recyclingSuggestions: [
      "Use both sides of notebook and printer paper before sending it for recycling.",
      "Reuse sturdy cardboard cartons for storage, moving, or school craft projects.",
      "Donate old textbooks, storybooks, and magazines to school libraries or community centres.",
      "Shred uncoated, non-glossy scrap paper to mix as 'browns' in a compost bin.",
    ],
    environmentalBenefit:
      "Recycling clean paper preserves forest cover, cuts industrial water and electricity consumption compared to virgin wood pulping, and saves substantial landfill volume.",
    decompositionTime: "2 – 6 weeks (if uncontaminated)",
    streamType: "recycling",
    canRecycle: true,
    canCompost: true,
  },
  Metal: {
    icon: "🔩",
    color: "#475569",
    bgColor: "#F8FAFC",
    badgeClass: "bg-slate-100 text-slate-800 border-slate-200",
    barClass: "bg-slate-600",
    barTrackClass: "bg-slate-200",
    binType: "Dry Waste (Recyclable Stream)",
    binColor: "Blue Bin",
    commonExamples: "Aluminium beverage cans, tin food cans, clean foil, metal lids",
    description:
      "Ferrous and non-ferrous metals such as aluminium and steel that can be melted down and reformed repeatedly without losing structural quality.",
    disposalSteps: [
      "Empty and rinse cans or containers to remove sticky beverages or food residue.",
      "Check for sharp edges on opened tin lids and tuck them safely inside the can if needed.",
      "Remove loose paper labels when easy to do so.",
      "Roll clean aluminium foil into a compact ball (palm-sized) so sorting machines can detect it.",
      "Place in the Dry Waste / Blue Recyclable Bin or hand over to a local scrap collector.",
    ],
    recyclingSuggestions: [
      "Aluminium cans are infinitely recyclable and among the highest-value items in municipal recycling.",
      "Keep small metal bottle caps inside a steel can before pinching the top shut so tiny pieces aren't lost at sorting plants.",
      "Donate reusable stainless steel utensils or containers instead of throwing them away.",
      "Bundle clean scrap metal items together for local kabadiwala / metal recovery centres.",
    ],
    environmentalBenefit:
      "Recovering and remelting recycled aluminium requires only a small fraction of the electricity needed to refine raw bauxite ore, sharply lowering mining impact and greenhouse gas emissions.",
    decompositionTime: "50 – 200+ years",
    streamType: "recycling",
    canRecycle: true,
    canCompost: false,
  },
  "Organic Waste": {
    icon: "🌿",
    color: "#16A34A",
    bgColor: "#F0FDF4",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
    barClass: "bg-emerald-600",
    barTrackClass: "bg-emerald-100",
    binType: "Wet Waste (Biodegradable / Compost Bin)",
    binColor: "Green Bin",
    commonExamples: "Fruit & vegetable peels, leftover food scraps, tea leaves, garden trimmings",
    description:
      "Biodegradable kitchen and garden matter that naturally breaks down into nutrient-rich compost instead of generating landfill methane.",
    disposalSteps: [
      "Remove any plastic bags, rubber bands, stickers, or foil wrappers before disposal.",
      "Keep wet organic scraps strictly separated from dry paper, plastic, and metal.",
      "Place food scraps, peels, and garden leaves in a covered Wet Waste / Green Bin.",
      "If composting at home or school, balance wet 'greens' with dry leaves or shredded cardboard ('browns').",
      "Hand over wet waste daily to municipal organic collection or empty into your compost pit.",
    ],
    recyclingSuggestions: [
      "Start a simple home pot composter or school vermicomposting pit using kitchen vegetable peels.",
      "Use finished dark, earthy compost as natural fertiliser for potted plants and gardens.",
      "Dry garden leaves make great moisture-retaining mulch around garden beds.",
      "Plan meal portions carefully and store leftovers properly to cut avoidable food waste at the source.",
    ],
    environmentalBenefit:
      "Diverting organic waste from mixed landfills prevents anaerobic decomposition that releases methane—a potent greenhouse gas—while returning valuable organic nutrients back to the soil.",
    decompositionTime: "2 weeks – 6 months (via composting)",
    streamType: "composting",
    canRecycle: false,
    canCompost: true,
  },
};

export default WASTE_INFO;
