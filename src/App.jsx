import ApiEntry from './ApiEntry'
import './styles/app.scss'
import { useState, useEffect } from 'react'
import { API_URL } from './constants'

export default function App() {
	const [categories, setCategories] = useState([])
	const [category, setCategory] = useState('All')

	const auths = ['All', 'apiKey', 'OAuth']
	const [auth, setAuth] = useState('All')

	const [entries, setEntries] = useState([])
	useEffect(() => {
		fetch(`${API_URL}/categories`)
			.then((resp) => resp.json())
			.then((resp) => {
				setCategories(resp.categories)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	useEffect(() => {
		let url = `${API_URL}/entries`
		let hasQueryParam = false
		if (auth != 'All') {
			url += `?auth=${auth}`
			hasQueryParam = true
		}
		if (category != 'All') {
			url += hasQueryParam ? '&' : '?'
			url += `category=${category}`
		}
		fetch(url)
			.then((resp) => resp.json())
			.then((resp) => {
				console.log(resp)
				setEntries(resp)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [category, auth])

	const handleCategoryChange = (e) => {
		setCategory(e.target.value)
	}

	const handleAuthChange = (e) => {
		setAuth(e.target.value)
	}

	return (
		<div className='app'>
			<form>
				<div>
					<label
						style={{
							fontWeight: 'bold',
							fontSize: 'large',
							margin: 5,
						}}
					>
						Category:
						<select
							value={category}
							style={{ marginLeft: 20 }}
							onChange={handleCategoryChange}
						>
							<option value='All'>All</option>
							{categories.map((category) => {
								return (
									<option key={category} value={category}>
										{category}
									</option>
								)
							})}
						</select>
					</label>
					<label
						style={{
							fontWeight: 'bold',
							fontSize: 'large',
							margin: 5,
						}}
					>
						Auth:
						<select
							value={auth}
							style={{ marginLeft: 20 }}
							onChange={handleAuthChange}
						>
							{auths.map((temp) => {
								return (
									<option key={temp} value={temp}>
										{temp}
									</option>
								)
							})}
						</select>
					</label>
				</div>
			</form>
			{entries.count > 0 ? (
				<ul className='page'>
					{entries.entries.map((entry) => {
						return <ApiEntry key={entry.Link} entry={entry} />
					})}
				</ul>
			) : (
				<h1>No hay apis que mostrar</h1>
			)}
		</div>
	)
}
