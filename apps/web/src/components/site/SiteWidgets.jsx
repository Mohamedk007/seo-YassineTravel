import React from 'react';
import { HOME_SECTION_COMPONENTS, getSectionContext } from '@/components/home/HomeSections';

// Widgets added from /admin at the bottom of blog, service, tour and
// destination pages: the same parts as the home page ({ id, type, hidden, ... }).
export function SiteWidgets({ widgets, lang }) {
	const visible = Array.isArray(widgets) ? widgets.filter((widget) => widget && !widget.hidden && HOME_SECTION_COMPONENTS[widget.type]) : [];
	if (!visible.length) return null;
	const context = getSectionContext(lang);
	return visible.map((widget, index) => {
		const Widget = HOME_SECTION_COMPONENTS[widget.type];
		return <Widget key={widget.id || index} section={widget} isMainHero={false} {...context} />;
	});
}
