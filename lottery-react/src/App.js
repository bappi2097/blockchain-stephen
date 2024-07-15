import "./App.css"
import React, { useEffect, useState } from "react"
import web3 from "./web3"
import lottery from "./lottery"

const App = () => {
  const [manager, setManager] = useState('')
  const [message, setMessage] = useState('')
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState(0)
  const [amount, setAmount] = useState(0)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("Waiting on transaction success...");
    try {
      const accounts = await web3.eth.getAccounts();
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(amount.toString(), 'ether')
      })
      setMessage("You have been entered!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  const pickWinner = async () => {
    setMessage("Waiting on transaction success...");
    try {
      const accounts = await web3.eth.getAccounts();
      await lottery.methods.pickWinner().send({
        from: accounts[0]
      })
      setMessage("Winner has been picked!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  const fetchData = async () => {
    const resManager = await lottery.methods.manager().call();
    const resPlayers = await lottery.methods.getPlayers().call();
    const resBalance = await web3.eth.getBalance(lottery.options.address);

    setManager(resManager)
    setPlayers(resPlayers)
    setBalance(resBalance)
  }
  
  console.log(manager, players, balance)

  useEffect(() => {
    fetchData()
  }, [])

  return (
   <div>
    <h2>Lottery Contract</h2>
    <p>This contract is managed by: {manager}</p>
    <p>There are currently {players.length} people entered, competing to win {web3.utils.fromWei(balance, 'ether')} ether!</p>
    <hr/>
    <form onSubmit={handleSubmit}>
      <h4>Want to try your luck?</h4>
      <div>
        <label>Amount of ether to enter</label>
        <input type="number" value={amount} onChange={event => setAmount(event.target.value)} />
      </div>
      <button type="submit">Enter</button>
    </form>
    <hr />
    <h4>Ready to pick a winner?</h4>
    <button onClick={() => pickWinner()}>Pick a winner</button>
    <hr />
    <h1>{message}</h1>
   </div>
  )
}
export default App
