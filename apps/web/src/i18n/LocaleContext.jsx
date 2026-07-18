import React, { createContext, useContext } from 'react';

const LocaleContext = createContext('en');

export function LocaleProvider({ lang, children }) {
	return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
	return useContext(LocaleContext);
}
