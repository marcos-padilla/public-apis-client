import './styles/apientry.scss'

export default function ApiEntry({ entry }) {
	const handleClick = () => {
		window.open(entry.Link)
	}
	return (
		<li className='entry' onClick={handleClick}>
			<div className='title'>
				<h2>{entry.API}</h2>
				<span>{entry.Category}</span>
			</div>
			<div className='data'>
				{entry.Auth && (
					<span className='auth'>
						Auth: <span>{entry.Auth}</span>
					</span>
				)}
				<span className='https'>
					HTTPS:{' '}
					<span
						style={{
							background: entry.HTTPS ? 'green' : 'red',
						}}
					>
						{entry.HTTPS ? 'True' : 'False'}
					</span>
				</span>
			</div>
			<div className='description'>
				<span>Description: </span>
				<p>{entry.Description}</p>
			</div>
			<br />
			<span>URL: </span>
			<a href={entry.Link}>{entry.Link}</a>
		</li>
	)
}
