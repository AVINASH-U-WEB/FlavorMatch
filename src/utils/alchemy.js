/**
 * Calculates the Flavor Harmony Index between two ingredients.
 * 
 * Algorithm Logic:
 * 1. Flavor Balance (0-50): Rewards contrasting but complementary flavors (Sweet+Sour, Salty+Sweet).
 * 2. Texture Interplay (0-20): Bonus for differing textures.
 * 3. Affinity Bonus (0-30): Checks if one ingredient lists the other as an affinity.
 * 4. Complexity Boost (0-10): Bonus for high total flavor profile sums (Umami bomb, etc).
 * 
 * @param {Object} ing1 - First ingredient object
 * @param {Object} ing2 - Second ingredient object
 * @returns {Object} { score: number, label: string, reasoning: string[], color: string }
 */
export function calculateHarmony(ing1, ing2) {
  if (!ing1 || !ing2) return { score: 0, label: "Unknown", reasoning: [], color: "gray" };

  let score = 0;
  const reasoning = [];

  // 1. Flavor Balance Analysis
  // Sweet & Sour Balance
  const sweetSour = (ing1.profile.sweet * ing2.profile.sour) + (ing2.profile.sweet * ing1.profile.sour);
  if (sweetSour > 10) {
    score += 15;
    reasoning.push("Classic Sweet & Sour balance");
  }

  // Sweet & Salty Contrast
  const sweetSalty = (ing1.profile.sweet * ing2.profile.salty) + (ing2.profile.sweet * ing1.profile.salty);
  if (sweetSalty > 8) {
    score += 15;
    reasoning.push("Addictive Salty-Sweet contrast");
  }

  // Fats (Umami) & Acids (Sour)
  const umamiSour = (ing1.profile.umami * ing2.profile.sour) + (ing2.profile.umami * ing1.profile.sour);
  if (umamiSour > 10) {
    score += 10;
    reasoning.push("Richness cuts through acidity");
  }
  
  // Bitter & Sweet (Masking)
  const bitterSweet = (ing1.profile.bitter * ing2.profile.sweet) + (ing2.profile.bitter * ing1.profile.sweet);
  if (bitterSweet > 10) {
    score += 10;
    reasoning.push("Sweetness tames the bitterness");
  }

  // Spicy & Sweet (Cooling)
  const spicySweet = (ing1.profile.spicy * ing2.profile.sweet) + (ing2.profile.spicy * ing1.profile.sweet);
  if (spicySweet > 10) {
    score += 10;
    reasoning.push("Heat balanced by sweetness");
  }

  // Cap flavor score at 50
  score = Math.min(score, 50);

  // 2. Texture Interplay
  if (ing1.texture !== ing2.texture) {
    score += 15;
    reasoning.push(`Nice textural contrast: ${ing1.texture} vs ${ing2.texture}`);
  } else {
    // Similar textures can be okay, but less exciting unless it's a specific goal
    score += 5;
  }

  // 3. Known Affinity Bonus
  const ing1HasIng2 = ing1.affinities.includes(ing2.slug) || ing1.affinities.includes(ing2.id);
  const ing2HasIng1 = ing2.affinities.includes(ing1.slug) || ing2.affinities.includes(ing1.id);
  
  if (ing1HasIng2 || ing2HasIng1) {
    score += 30; // Huge bonus for known good pairings
    reasoning.push("Scientifically verified affinity");
  }

  // 4. Complexity/Umami Synergy
  const totalUmami = ing1.profile.umami + ing2.profile.umami;
  if (totalUmami > 12) {
    score += 10;
    reasoning.push("Umami synergy bomb");
  }

  // Normalization
  score = Math.min(score, 100);
  
  // Categorize
  let label = "Questionable";
  let color = "bg-gray-500";
  
  if (score >= 90) { label = "Divine Match"; color = "bg-purple-600"; }
  else if (score >= 75) { label = "Excellent Pairing"; color = "bg-green-600"; }
  else if (score >= 50) { label = "Good Potential"; color = "bg-yellow-500"; }
  else if (score >= 30) { label = "Experimental"; color = "bg-orange-500"; }
  else { label = "Risky Clash"; color = "bg-red-600"; }

  return {
    score,
    label,
    reasoning: [...new Set(reasoning)], // Unique constraints
    color
  };
}
