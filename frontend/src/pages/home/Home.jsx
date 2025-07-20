// ========================================
// HOME PAGE COMPONENT - Main Chat Interface
// ========================================
// This is the main chat page that displays the sidebar and message container
// Provides the primary user interface for the chat application

import MessageContainer from "../../components/messages/MessageContainer.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";

/**
 * Home Component - Main Chat Interface
 * Renders the complete chat application with sidebar and message area
 * @returns {JSX.Element} The main chat interface
 */
const Home = () => {
	return (
		<div className='flex flex-col sm:flex-row h-[100vh] sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			{/* 💡 Layout Structure:
				- flex flex-col sm:flex-row: Stack vertically on mobile, side-by-side on larger screens
				- h-[100vh] sm:h-[450px] md:h-[550px]: Full height on mobile, fixed height on larger screens
				- rounded-lg overflow-hidden: Rounded corners with hidden overflow
				- backdrop-filter backdrop-blur-lg: Glass morphism effect */}
			
			{/* Sidebar Component - User list and navigation */}
			<Sidebar />
			
			{/* Message Container - Chat messages and input */}
			<MessageContainer />
		</div>
	);
};

export default Home;