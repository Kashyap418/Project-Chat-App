// ========================================
// EXTRACT TIME UTILITY - Time Formatting
// ========================================
// Utility functions for formatting timestamps into readable time format
// Used for displaying message timestamps in the chat interface

/**
 * Extracts and formats time from a date string
 * Converts ISO date string to HH:MM format
 * @param {string} dateString - ISO date string to format
 * @returns {string} Formatted time string (HH:MM)
 */
export function extractTime(dateString) {
	// Create Date object from the date string
	const date = new Date(dateString);
	
	// Extract hours and minutes, padding with zeros if needed
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	
	// Return formatted time string
	return `${hours}:${minutes}`;
}

/**
 * Helper function to pad single-digit numbers with a leading zero
 * Ensures consistent two-digit format for time display
 * @param {number} number - Number to pad
 * @returns {string} Padded number string
 */
function padZero(number) {
	return number.toString().padStart(2, "0");
}

// 💡 Usage Examples:
// - extractTime("2024-01-15T14:30:00Z") → "14:30"
// - extractTime("2024-01-15T09:05:00Z") → "09:05"