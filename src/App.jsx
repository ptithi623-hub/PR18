import { useState } from "react"
import Header from "./Components/Header"
import ProductList from "./Components/ProductList"
import ProductForm from "./Components/ProductForm"

const initialProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 55000,
    category: "Electronics",
    stock: 10,
  },
  {
    id: 2,
    name: "Smartphone",
    price: 25000,
    category: "Electronics",
    stock: 15,
  },
  {
    id: 3,
    name: "Headphones",
    price: 1500,
    category: "Accessories",
    stock: 25,
  },
]

export default function App() {
  const [products, setProducts] = useState(initialProducts)
  const [selectedProduct, setSelectedProduct] = useState(
    initialProducts[0]
  )
  const [message, setMessage] = useState("")

  function handleUpdate(updatedProduct) {
    setProducts((previous) =>
      previous.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    )

    setSelectedProduct(updatedProduct)
    setMessage("Product updated successfully!")
  }

  function handleAdd(newProduct) {
    const product = {
      ...newProduct,
      id: Date.now(),
    }

    setProducts((previous) => [...previous, product])
    setSelectedProduct(product)
    setMessage("Product added successfully!")
  }

  function handleDelete(id) {
    const remaining = products.filter(
      (product) => product.id !== id
    )

    setProducts(remaining)

    if (selectedProduct?.id === id) {
      setSelectedProduct(remaining[0] ?? null)
    }

    setMessage("Product deleted successfully!")
  }

  function handleNewProduct() {
    setSelectedProduct(null)
    setMessage("")
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Dashboard
            </h2>
            <p className="text-gray-500 mt-1">
              Manage your product inventory
            </p>
          </div>

          <button
            type="button"
            onClick={handleNewProduct}
            className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-3 rounded-lg font-medium"
          >
            + Add New Product
          </button>
        </div>

        {message && (
          <div
            role="status"
            className="mb-5 rounded-lg bg-green-100 text-green-800 p-3"
          >
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <ProductList
            products={products}
            selectedProduct={selectedProduct}
            onSelect={(product) => {
              setSelectedProduct(product)
              setMessage("")
            }}
            onDelete={handleDelete}
          />

          <ProductForm
            selectedProduct={selectedProduct}
            onUpdate={handleUpdate}
            onAdd={handleAdd}
          />
        </div>

        <div className="mt-6 bg-white rounded-xl shadow p-5">
          <h2 className="font-bold text-lg mb-2">
            Inventory Summary
          </h2>
          <p className="text-gray-600">
            Total products:{" "}
            <span className="font-bold text-indigo-600">
              {products.length}
            </span>
          </p>
          <p className="text-gray-600 mt-1">
            Total stock:{" "}
            <span className="font-bold text-indigo-600">
              {products.reduce(
                (total, product) => total + product.stock,
                0
              )}
            </span>
          </p>
        </div>
      </main>
    </div>
  )
}