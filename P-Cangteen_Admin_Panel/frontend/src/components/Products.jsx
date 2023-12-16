import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: '',
    supplier: '',
    price: '',
    imageUrl: '',
    description: '',
    product_location: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = async productId => {
    try {
      await axios.delete(`http://localhost:3001/api/products/${productId}`);
      setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
      setSelectedProduct(null); // Clear selected product after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleProductClick = async productId => {
    try {
      const response = await axios.get(`http://localhost:3001/api/products/${productId}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      if (selectedProduct) {
        const response = await axios.patch(
          `http://localhost:3001/api/products/${selectedProduct._id}`,
          selectedProduct,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = response.data;
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product._id === data._id ? { ...product, ...data } : product
          )
        );
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/products', newProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const addedProduct = response.data;
      setProducts(prevProducts => [...prevProducts, addedProduct]);
      setNewProduct({
        title: '',
        supplier: '',
        price: '',
        imageUrl: '',
        description: '',
        product_location: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  return (
    <div>
      <h2 className='text-3xl underline'>Products</h2>
      <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Supplier</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product._id}>
            <td>{product.title}</td>
            <td>{product.supplier}</td>
            <td>{product.price}</td>
            <td>
              <button onClick={() => handleDelete(product._id)}>Delete</button>{' '}
              <button onClick={() => handleProductClick(product._id)}>View Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

      {selectedProduct && (
        <div>
          <h3>Product Details</h3>
          <form>
            {/* Render form inputs for each field */}
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={selectedProduct.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Supplier:
              <input
                type="text"
                name="supplier"
                value={selectedProduct.supplier}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={selectedProduct.price}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="imageUrl"
                value={selectedProduct.imageUrl}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={selectedProduct.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Product Location:
              <input
                type="text"
                name="productLocation"
                value={selectedProduct.product_location}
                onChange={handleInputChange}
              />
            </label>
          </form>
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      )}

      <div>
        <h3>Add New Product</h3>
        <form>
          {/* Render form inputs for each field */}
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleNewProductChange}
            />
          </label>
          <label>
            Supplier:
            <input
              type="text"
              name="supplier"
              value={newProduct.supplier}
              onChange={handleNewProductChange}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={newProduct.price}
              onChange={handleNewProductChange}
            />
          </label>
          <label>
              Image URL:
              <input
                type="text"
                name="imageUrl"
                value={newProduct.imageUrl}
                onChange={handleNewProductChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleNewProductChange}
              />
            </label>
            <label>
              Product Location:
              <input
                type="text"
                name="productLocation"
                value={newProduct.product_location}
                onChange={handleNewProductChange}
              />
            </label>
        </form>
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default Products;
