import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './page/Landing';
import ISBN from './page/ISBN';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/isbn" element={<ISBN />} />
			</Routes>
		</BrowserRouter>
	);
}
