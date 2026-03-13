const products = [
  { id: 1, name: "Milk", price: "₹50 / litre" },
  { id: 2, name: "Paneer", price: "₹400 / kg" },
  { id: 3, name: "Butter", price: "₹250 / pack" },
  { id: 4, name: "Curd", price: "₹80 / bowl" }
];

function App() {
  return (
    <div style={{textAlign:"center", padding:"40px"}}>
      <h1>🥛 Dairy Hub</h1>
      <h3>Fresh Dairy Products</h3>

      {products.map((p)=>(
        <div key={p.id} style={{
          border:"1px solid #ccc",
          padding:"15px",
          margin:"10px",
          borderRadius:"10px"
        }}>
          <h2>{p.name}</h2>
          <p>{p.price}</p>
          <button>Buy</button>
        </div>
      ))}
    </div>
  );
}

export default App;