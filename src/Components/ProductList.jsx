export default function ProductList({
  products,
  selectedProduct,
  onSelect,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-bold mb-4">
        Existing Products
      </h2>

      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className={`border rounded-lg p-4 ${
              selectedProduct?.id === product.id
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex justify-between gap-2">
              <button
                type="button"
                onClick={() => onSelect(product)}
                className="text-left flex-1 min-w-0"
              >
                <h3 className="font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {product.category}
                </p>
                <p className="text-indigo-600 font-bold mt-1">
                  ₹{product.price}
                </p>
              </button>

              <button
                type="button"
                onClick={() => onDelete(product.id)}
                className="text-red-600 hover:bg-red-50 px-2 rounded"
                aria-label={`Delete ${product.name}`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-gray-500">
            No products available. Add a new product.
          </p>
        )}
      </div>
    </div>
  )
}