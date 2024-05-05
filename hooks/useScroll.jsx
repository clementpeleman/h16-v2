import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

function useScrollToTop() {
	const [showScroll, setShowScroll] = useState(false);
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [scrollDirection, setScrollDirection] = useState('up');

	const checkScrollDirection = () => {
		const currentScrollPos = window.pageYOffset;
		if (Math.abs(currentScrollPos - prevScrollPos) > 400) {
			if (currentScrollPos > prevScrollPos && currentScrollPos > 400) {
				setShowScroll(true);
				setScrollDirection('down');
			} else if (currentScrollPos < prevScrollPos || currentScrollPos <= 400) {
				setShowScroll(true);
				setScrollDirection('up');
			}
			setPrevScrollPos(currentScrollPos);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', checkScrollDirection);
		return function cleanup() {
			window.removeEventListener('scroll', checkScrollDirection);
		};
	}, [prevScrollPos]); // Voeg prevScrollPos toe als een afhankelijkheid

	const backToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.body.scrollHeight - window.innerHeight - (isMobile ? 550 : 400),
			behavior: 'smooth',
		});
	};


	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', checkScrollDirection);
	}

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

	return (
		<>
			{scrollDirection === 'up' ? (
				<FiChevronUp
					className="scrollToTop"
					onClick={backToTop}
					style={{
						height: 40,
						width: 40,
						padding: 7,
						borderRadius: 50,
                        bottom: isMobile ? 30 : 50,
                        right: isMobile ? 20 : 50,
						display: showScroll ? 'flex' : 'none',
					}}
				/>
			) : (
				<div
					className="moreInfoButton"
					onClick={scrollToBottom}
					style={{
						position: 'fixed',
                        bottom: isMobile ? 25 : 45,
                        right: isMobile ? 20 : 50,
						backgroundColor: 'blue',
						color: 'white',
						padding: '10px 20px',
						cursor: 'pointer',
						borderRadius: 5,
						alignItems: 'center',
						display: showScroll ? 'flex' : 'none',

					}}
				>
					Meer info
					<FiChevronDown
						style={{
							height: 28,
							width: 28,
							padding: 1,
							marginTop: 3,
							marginLeft: 8,
                            marginRight: -4,
						}}
					/>
				</div>
			)}
		</>
	);
}



export default useScrollToTop;
