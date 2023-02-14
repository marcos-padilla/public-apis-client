import ApiEntry from './ApiEntry'
import entries from './mock/entries.json'
import './styles/app.scss'

export default function App() {
	return (
		<div>
			<ul className='page'>
				{entries.entries.map((entry) => {
					return <ApiEntry key={entry.Link} entry={entry} />
				})}
			</ul>
		</div>
	)
}
