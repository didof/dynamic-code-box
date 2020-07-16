// dependencies
import React from 'react';

export default ({ title, tabs, actions, annotationMode }) => {
	return (
		<div>
			<h2>{title}</h2>
			<select onChange={actions.changeTab}>
				{tabs.map((tab, i) => {
					return (
						<option key={`${title}-tab-${i}`} value={tab.name}>
							{tab.name} ({tab.type})
						</option>
					);
				})}
			</select>
			<select
				defaultValue={annotationMode}
				onChange={actions.changeAnnotationMode}
			>
				<option value='dynamic'>dynamic annotation</option>
				<option value='static'>static annotation</option>
			</select>
		</div>
	);
};
