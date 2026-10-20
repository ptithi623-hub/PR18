import { useEffect, useState } from "react"

const emptyProduct = {
  name: "",
  price: "",
  category: "",
  stock: "",
}

export default function ProductForm({
  selectedProduct,
  onUpdate,
  onAdd,
}) {
  const [formData, setFormData] = useState(emptyProduct)

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        price: String(selectedProduct.price),
        category: selectedProduct.category,
        stock: String(selectedProduct.stock),
      })
    } else {
      setFormData(emptyProduct)
    }
  }, [selectedProduct])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const product = {
      name: formData.name.trim(),
      price: Number(formData.price),
      category: formData.category.trim(),
      stock: Number(formData.stock),
    }

    if (
      !product.name ||
      !product.category ||
      formData.price === "" ||
      formData.stock === "" ||
      !Number.isFinite(product.price) ||
      !Number.isFinite(product.stock) ||
      product.price < 0 ||
      !Number.isInteger(product.stock) ||
      product.stock < 0
    ) {
      return
    }

    if (selectedProduct) {
      onUpdate({
        ...product,
        id: selectedProduct.id,
      })
    } else {
      onAdd(product)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h2>

        <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
          {selectedProduct ? "Editing" : "New"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            maxLength={100}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block font-medium text-gray-700 mb-1"
          >
            Price (₹)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
            maxLength={100}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block font-medium text-gray-700 mb-1"
          >
            Stock Quantity
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            required
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
        >
          {selectedProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  )
}