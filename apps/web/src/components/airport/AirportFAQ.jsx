import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/**
 * Renders an airport's FAQ list as an accordion. FAQPage JSON-LD is generated
 * from this exact same `faqs` array via buildFaqSchema (seo/schemas.js) at the
 * page level — one data source, no separately-maintained schema copy.
 */
export function AirportFAQ({ faqs }) {
	if (!faqs || faqs.length === 0) return null;

	return (
		<Accordion type="single" collapsible>
			{faqs.map(([question, answer], index) => (
				<AccordionItem key={index} value={`faq-${index}`} className="border-b border-border">
					<AccordionTrigger className="text-left font-display text-base font-medium md:text-lg">{question}</AccordionTrigger>
					<AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
