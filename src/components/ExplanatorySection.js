import React from 'react';

export default ({
	phrases,
	actions,
	colors: [activePhrase, lockedPhrase],
	annotationMode,
}) => {
	const styles = {
		active: {
			backgroundColor: 'grey',
			color: 'black',
		},
		locked: {
			backgroundColor: 'black',
			color: 'white',
		},
	};

	function addStyle(i) {
		if (annotationMode !== 'dynamic') return;
		if (lockedPhrase && parseInt(lockedPhrase) === i) {
			return styles.locked;
		} else if (parseInt(activePhrase) === i) {
			return styles.active;
		} else {
			return;
		}
	}

	return (
		<div>
			{phrases.map((p, i) => {
				return (
					<span
						key={i}
						data-index={i}
						onMouseOver={actions.mouseOver}
						onClick={actions.singleClick}
						style={addStyle(i)}
					>
						{p}{' '}
					</span>
				);
			})}
		</div>
	);
};
