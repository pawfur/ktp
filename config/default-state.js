window.KedaiConfig = {
  version: '26.09.12.0200',
  defaultState: {
    menu: [
      { id: 'prod_1', name: 'Seblak Biasa', price: 8000, order: 0 },
      { id: 'prod_2', name: 'Seblak Ceker', price: 10000, order: 1 },
      { id: 'prod_3', name: 'Seblak Mie', price: 9000, order: 2 },
      { id: 'prod_4', name: 'Seblak Telur', price: 8500, order: 3 },
      { id: 'prod_5', name: 'Seblak Basreng', price: 10000, order: 4 },
      { id: 'prod_6', name: 'Seblak Keju', price: 10000, order: 5 },
      { id: 'prod_7', name: 'Seblak Bakso', price: 10000, order: 6 },
      { id: 'prod_8', name: 'Kentang Goreng', price: 9000, order: 7 },
      { id: 'prod_9', name: 'French Fries', price: 9000, order: 8 },
      { id: 'prod_10', name: 'Toast Keju', price: 8500, order: 9 },
      { id: 'prod_11', name: 'Toast Cokelat', price: 8500, order: 10 },
      { id: 'prod_12', name: 'Toast Telur', price: 9000, order: 11 }
    ],
    activeOrders: [],
    archive: [],
    ingredients: [
      { id: 'ing_bulki', name: 'Bułki', unit: 'szt', stock: 24, unit_price: 800, min_stock: 20, target_stock: 60, min_order_quantity: 10, unit_step: 10 },
      { id: 'ing_ceker', name: 'Mięso cekier', unit: 'g', stock: 3000, unit_price: 45, min_stock: 4000, target_stock: 15000, min_order_quantity: 1000, unit_step: 500 },
      { id: 'ing_maka', name: 'Mąka pszenna', unit: 'g', stock: 9000, unit_price: 8, min_stock: 5000, target_stock: 25000, min_order_quantity: 5000, unit_step: 1000 },
      { id: 'ing_jajka', name: 'Jajka', unit: 'szt', stock: 18, unit_price: 2500, min_stock: 24, target_stock: 60, min_order_quantity: 12, unit_step: 6 },
      { id: 'ing_olej', name: 'Olej', unit: 'ml', stock: 1200, unit_price: 20, min_stock: 1000, target_stock: 5000, min_order_quantity: 1000, unit_step: 500 },
      { id: 'ing_przyprawa', name: 'Przyprawa do seblak', unit: 'g', stock: 400, unit_price: 120, min_stock: 500, target_stock: 2000, min_order_quantity: 500, unit_step: 100 }
    ],
    purchaseOrders: [],
    language: 'id'
  }
};
