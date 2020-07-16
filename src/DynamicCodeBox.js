import React from 'react';

import Heading from './components/Heading';
import ExplanatorySection from './components/ExplanatorySection';
import CodeBox from './components/CodeBox';

export default ({ data: { title, tabs, explanatories, codes } }) => {
	const [annotationMode, setAnnotationMode] = React.useState('static');

	const [activeTab, setActiveTab] = React.useState(tabs[0]);
	const [activePhrase, setActivePhrase] = React.useState(
		explanatories[activeTab.name].length - 1
	);
	const [lockedPhrase, setLockedPhrase] = React.useState();

	const handles = {
		heading: {
			changeTab: function (e) {
				const { value } = e.target;
				const meta_tab = tabs.find((tab) => {
					return tab.name === value;
				});
				setActiveTab(meta_tab);
			},
			changeAnnotationMode: function (e) {
				const { value } = e.target;
				setAnnotationMode(value);
			},
		},
		explanatorySection: {
			mouseOver: function (e) {
				if (annotationMode !== 'dynamic') return;

				if (lockedPhrase) return;
				const { index } = e.target.dataset;
				setActivePhrase(parseInt(index));
			},
			singleClick: function (e) {
				if (annotationMode !== 'dynamic') return;

				const { index } = e.target.dataset;
				if (e.shiftKey) {
					if (!lockedPhrase) {
						setLockedPhrase(index);
						setActivePhrase(index);
					} else {
						setLockedPhrase(undefined);
					}
				} else {
					if (lockedPhrase) return;
					setActivePhrase((prev) => {
						if (prev < explanatories[activeTab.name].length - 1)
							return parseInt(prev + 1);
						return 0;
					});
				}
			},
		},
	};

	function getCode() {
		return annotationMode !== 'dynamic'
			? codes[activeTab.name][codes[activeTab.name].length - 1]
			: codes[activeTab.name][activePhrase];
	}

	return (
		<div>
			{annotationMode}
			{activePhrase}
			{'\n'}
			{lockedPhrase ? lockedPhrase : 'none'}
			<Heading
				title={title}
				tabs={tabs}
				actions={handles.heading}
				annotationMode={annotationMode}
			/>
			<ExplanatorySection
				phrases={explanatories[activeTab.name]}
				actions={handles.explanatorySection}
				colors={[activePhrase, lockedPhrase]}
				annotationMode={annotationMode}
			/>
			<hr />
			<CodeBox code={getCode()} />
		</div>
	);
};
