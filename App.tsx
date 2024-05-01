import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
interface currency {
  availableSupply: number
  explorers: string[]
  icon: string
  id: string
  marketCap: number
  name: string
  price: number
  priceBtc: number
  priceChange1d: number
  priceChange1h: number
  priceChange1w: number
  rank: number
  redditUrl: string
  symbol: string
  totalSupply: number
  twitterUrl: string
  volume: number
  websiteUrl: string
}
function App() {
  const [search, setSearch] = useState<string>('')
  const [currency, setCurrency] = useState<currency[]>([])
  useEffect(() => {
    axios
      .get('https://openapiv1.coinstats.app/coins', {
        headers: {
          'X-API-KEY': '+BpwnQHG4lv1XENQnmsukH3/pdhHCSpsBeuHjkYAnbk=',
        },
      })
      .then((res) => {
        setCurrency(res.data.result)
        console.log(res)
      })
      .catch((err) => alert(err))
  }, [])
  const filterCurrency = currency.filter((curr) => {
    const currName = curr.name.toLowerCase()
    const currSearch = search.toLowerCase()
    return currName.includes(currSearch)
  })
  return (
    <div>
      <div className="search ">
        <p className="text-[50px]">Crypto Currency App</p>
        <input
          className="border w-[40%] rounded-full py-[10px] px-[10px] mt-[20px] mb-[50px]"
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="w-full">
        {filterCurrency.length > 0 ? (
          <thead>
            <tr>
              <th>Rank</th>
              <th>Icon</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Market Cap</th>
              <th>Price</th>
              <th>Available Supply</th>
              <th>Volume(24hr)</th>
              <th>Info</th>
            </tr>
          </thead>
        ) : (
          <div className=' w-full flex justify-center items-center'>
            <p className='text-[25px] text-red-600'>Oooooops!! Not Found. Try Again.</p>
          </div>
        )}
        <tbody>
          {filterCurrency.map((curr) => {
            return (
              <tr>
                <td className="py-[30px] px-[15px]">{curr.rank}.</td>
                <td className="px-[20px] text-[16px]">
                  <a href={curr.websiteUrl}>
                    <img className="w-[50px] h-[50px]" src={curr.icon} alt="" />
                  </a>
                </td>
                <td className="py-[30px] px-[15px]">{curr.name}</td>
                <td className="py-[30px] px-[15px]">{curr.symbol}</td>
                <td className="py-[30px] px-[15px]">{curr.marketCap}</td>
                <td className="py-[30px] px-[15px]">{curr.price}</td>
                <td className="py-[30px] px-[15px]">{curr.availableSupply}</td>
                <td className="py-[30px] px-[15px]">{curr.volume}</td>
                <td className="py-[30px] px-[15px]">
                  <a
                    className="hover:text-[#000] py-[10px] px-[10px] border-[3px] border-[#000] rounded-full text-[#000]"
                    href={curr.websiteUrl}
                  >
                    More Info
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
// return (
//   <div className="hover:scale[1.1] flex py-[30px] border-top" key={curr.id}>
//     <p className="py-[10px] px-[10px] ">{curr.rank}.</p>
//     <p className="py-[10px] px-[10px]">
//       <a href={curr.websiteUrl}>
//         <img className="w-[50px] h-[50px]" src={curr.icon} alt="" />
//         {/* <p>{curr.name}</p> */}
//       </a>
//     </p>
//     <p className="py-[10px] px-[10px]">{curr.name}</p>
//     <p className="py-[10px] px-[10px]">{curr.symbol}</p>
//     <p className="py-[10px] px-[10px]">{curr.marketCap}</p>
//     <p className="py-[10px] px-[10px]">{curr.price}</p>
//     <p>{curr.availableSupply}</p>
//     <p className="py-[10px] px-[10px]">{curr.volume}</p>
//     <p className="py-[10px] px-[10px]">
//       <a
//         className="py-[10px] px-[7px] bg-blue-500 rounded-full text-[#000]"
//         href={curr.websiteUrl}
//       >
//         More Info
//       </a>
//     </p>
//   </div>
// )
