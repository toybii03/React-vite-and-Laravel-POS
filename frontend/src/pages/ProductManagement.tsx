import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function ProductManagement() {
  const [products] = useState<Product[]>([
    { id: 1, name: "Iced Latte", price: 120, stock: 10 },
    { id: 2, name: "Tuna Sandwich", price: 95, stock: 5 },
    { id: 3, name: "Chocolate Cake", price: 80, stock: 8 },
  ]);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h2 className="mb-4">Product Management</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>₱{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
