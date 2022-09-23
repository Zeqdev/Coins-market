import { useEffect, useState } from 'react'

export function App() {
	const [coins, setCoins] = useState([])

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

	return (
		<>
			<h1 className='text-center mt-4'>Coins Market</h1>
			<main></main>
		</>
	)
}
