import { useEffect, useState } from 'react'

export function App() {
	const [coins, setCoins] = useState([])
	const [search, setSearch] = useState('')

	const getCoins = async () => {
		await fetch(
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false.io/v2/assets'
		)
			.then(response => response.json())
			.then(data => setCoins(data))
			.catch(error => console.log(error))
	}

	useEffect(() => {
		getCoins()
	}, [])

	const titles = ['#', 'Coin', 'Price', 'Price Change', '24h Volume']

	const filteredCoins = coins.filter(coin =>
		coin.name.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<>
			<h1 className='text-center mt-4'>Coins Market</h1>
			<main>
				<input
					type='text'
					placeholder='Search a Coin'
					className='form-control bg-dark text-light border-0 mt-4 mx-auto w-50 text-center'
					autoFocus
					onChange={e => setSearch(e.target.value)}
				/>
				<table className='table table-dark mt-4 table-hover'>
					<thead>
						<tr>
							{titles.map((title, i) => (
								<td key={i}>{title}</td>
							))}
						</tr>
					</thead>
					<tbody>
						{filteredCoins.map((coin, index) => (
							<tr>
								<td className='text-muted'>{index + 1}</td>
								<td>
									<img
										src={coin.image}
										alt=''
										className='img-fluid me-4'
										style={{ width: '3%' }}
									/>
									<span>{coin.name}</span>
									<span className='ms-3 text-muted'>{coin.symbol}</span>
								</td>

								<td>${coin.current_price.toLocaleString()}</td>

								<td
									className={
										coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'
									}
								>
									{coin.price_change_percentage_24h}
								</td>

								<td>${coin.total_volume.toLocaleString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</main>
		</>
	)
}
