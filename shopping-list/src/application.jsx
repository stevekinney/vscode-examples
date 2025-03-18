import React, { useEffect, useState } from 'react';

const calculateTotal = (items) => {
  let sum = 0;
  for (const item of items) {
    sum += item.price;
  }
  return sum;
};

function Application() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = calculateTotal(items);
    setTotal(total);
  }, [items, setTotal]);

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, { name: newItem, price: Math.floor(Math.random() * 100) }]);
      setNewItem('');
    }
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">Shopping List</h1>
      <form
        className="flex mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          addItem();
        }}
      >
        <div className="w-full flex focus-within:ring-2 focus-within:ring-purple-500/50 rounded-lg">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="flex-grow px-3 py-2 border border-slate-300 rounded-l-lg focus:outline-none"
            placeholder="Add an item..."
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-r-lg transition-colors outline-none focus:bg-purple-600"
          >
            Add
          </button>
        </div>
      </form>
      {items.length > 0 ? (
        <ul className="divide-y divide-slate-200">
          {items.map((item, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <span className="font-medium">{item.name}</span>
              <div className="flex items-center">
                <span className="text-green-600 font-medium mr-3">${item.price}</span>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-center py-4">Your shopping list is empty</p>
      )}
      {items.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
          <span className="font-bold text-slate-700">Total:</span>
          <span className="text-lg font-bold text-green-600">${total}</span>
        </div>
      )}
    </div>
  );
}

export default Application;
