import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Incomplete from './pages/Incomplete';
import Completed from './pages/Completed';
import Settings from './pages/Settings';
import MainLayout from './layouts/MainLayout';


function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<MainLayout />}>
						<Route path='/' element={<Home />}/>
						<Route path='/incomplete' element={<Incomplete />}/>
						<Route path='/completed' element={<Completed />}/>
						<Route path='/settings' element={<Settings />}/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
