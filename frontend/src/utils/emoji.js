// ========================================
// EMOJI UTILITY - Fun Emoji Collection
// ========================================
// Collection of fun emojis and utility function for random selection
// Used for adding playful elements to the chat interface

/**
 * Array of fun emojis for random selection
 * Includes various categories: gaming, celebrations, sports, activities
 */
export const funEmojis = [
	// Gaming and Entertainment
	"👾", "⭐", "🌟",
	
	// Celebrations and Parties
	"🎉", "🎊", "🎈", "🎁", "🎂", "🎄", "🎃",
	
	// Awards and Recognition
	"🎗", "🎟", "🎫", "🎖", "🏆", "🏅", "🥇", "🥈", "🥉",
	
	// Sports and Activities
	"⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱", "🏓", "🏸", "🥅",
	"🏒", "🏑", "🏏", "⛳", "🏹", "🎣", "🥊", "🥋", "🎽", "⛸", "🥌",
	"🛷", "🎿", "⛷", "🏂", "🏋️", "🤼", "🤸", "🤺", "⛹️", "🤾", "🏌️",
	"🏇", "🧘",
];

/**
 * Returns a random emoji from the funEmojis array
 * Used for adding variety and fun to the chat experience
 * @returns {string} Random emoji from the collection
 */
export const getRandomEmoji = () => {
	// Generate random index within array bounds
	return funEmojis[Math.floor(Math.random() * funEmojis.length)];
};

// 💡 Usage Examples:
// - getRandomEmoji() → "🎉" (random celebration emoji)
// - getRandomEmoji() → "⚽" (random sports emoji)
// - getRandomEmoji() → "🌟" (random star emoji)