export const dummy_data ={
  "foundry-ecosytem": {
    "wholesalers": [
      {
        "id": "WH001",
        "name": "Accra Wholesale Mart",
        "location": { "lat": 5.5600, "lng": -0.2100 },
        "products": ["Rice", "Cooking Oil", "Sugar"],
        "transactions": [
          { "to": "MB001", "type": "loan_repayment", "amount": 10000 },
          { "to": "MK002", "type": "supply", "product": "Rice", "quantity": 500 },
          { "to": "MK007", "type": "supply", "product": "Rice", "quantity": 700 }
        ]
      },
      {
        "id": "WH002",
        "name": "Bulk Goods Distributors",
        "location": { "lat": 5.5802, "lng": -0.2051 },
        "products": ["Tomatoes", "Soap", "Bottled Water"],
        "transactions": [
          { "to": "MB002", "type": "loan_repayment", "amount": 5000 },
          { "to": "MK003", "type": "supply", "product": "Tomatoes", "quantity": 1000 },
          { "to": "MK004", "type": "supply", "product": "Soap", "quantity": 500 },
          { "to": "MK005", "type": "supply", "product": "Bottled Water", "quantity": 300 }
        ]
      },
      {
        "id": "WH003",
        "name": "Cepodek Warehouse",
        "location": { "lat": 5.665552944172566, "lng": -0.20408982912293316 }
      }
    ],

    "microfinance": [
      {
        "id": "MB001",
        "name": "EasyCredit Microfinance",
        "location": { "lat": 5.5503, "lng": -0.1925 },
        "loans": [
          { "to": "WH001", "amount": 15000, "status": "active" },
          { "to": "MK002", "amount": 5000, "status": "pending" },
          { "to": "MK004", "amount": 2500, "status": "active" },
          { "to": "MK006", "amount": 6000, "status": "active" }
        ]
      },
      {
        "id": "MB002",
        "name": "QuickLoans Finance",
        "location": { "lat": 5.5651, "lng": -0.2028 },
        "loans": [
          { "to": "WH002", "amount": 8000, "status": "active" },
          { "to": "MK001", "amount": 3000, "status": "paid" },
          { "to": "MK003", "amount": 4000, "status": "active" },
          { "to": "MK005", "amount": 3500, "status": "active" },
          { "to": "MK007", "amount": 5000, "status": "active" }
        ]
      }
    ],

    "market_businesses": [
      {
        "id": "MK001",
        "name": "Kojo's Grocery Store",
        "location": { "lat": 5.5705, "lng": -0.1983 },
        "inventory": [
          { "product": "Cooking Oil", "quantity": 200 },
          { "product": "Sugar", "quantity": 150 }
        ],
        "pos_transactions": [
          { "customer": "Individual A", "product": "Sugar", "quantity": 2, "amount": 10 },
          { "customer": "Individual B", "product": "Cooking Oil", "quantity": 1, "amount": 25 }
        ],
        "financial_transactions": [
          { "from": "MB002", "type": "loan", "amount": 3000 }
        ]
      },
      {
        "id": "MK002",
        "name": "Ama's Provisions",
        "location": { "lat": 5.5632, "lng": -0.1905 },
        "inventory": [
          { "product": "Rice", "quantity": 100 },
          { "product": "Soap", "quantity": 50 }
        ],
        "pos_transactions": [
          { "customer": "Individual C", "product": "Rice", "quantity": 5, "amount": 50 }
        ],
        "financial_transactions": [
          { "from": "WH001", "type": "supply", "product": "Rice", "quantity": 500 },
          { "from": "MB001", "type": "loan", "amount": 5000 }
        ]
      },
      {
        "id": "MK003",
        "name": "Cepodek",
        "location": { "lat": 5.6783, "lng": -0.1695 },
        "inventory": [
          { "product": "Tomatoes", "quantity": 1000 }
        ],
        "pos_transactions": [
          { "customer": "Individual D", "product": "Tomatoes", "quantity": 10, "amount": 30 }
        ],
        "financial_transactions": [
          { "from": "WH002", "type": "supply", "product": "Tomatoes", "quantity": 1000 },
          { "from": "MB002", "type": "loan", "amount": 4000 }
        ]
      },
      {
        "id": "MK004",
        "name": "Nampo",
        "location": { "lat": 5.6784, "lng": -0.1694 },
        "inventory": [
          { "product": "Soap", "quantity": 500 }
        ],
        "pos_transactions": [
          { "customer": "Individual E", "product": "Soap", "quantity": 3, "amount": 15 }
        ],
        "financial_transactions": [
          { "from": "WH002", "type": "supply", "product": "Soap", "quantity": 500 },
          { "from": "MB001", "type": "loan", "amount": 2500 }
        ]
      },
      {
        "id": "MK005",
        "name": "Red Ventures",
        "location": { "lat": 5.6783, "lng": -0.1697 },
        "inventory": [
          { "product": "Bottled Water", "quantity": 300 }
        ],
        "pos_transactions": [
          { "customer": "Individual F", "product": "Bottled Water", "quantity": 6, "amount": 18 }
        ],
        "financial_transactions": [
          { "from": "WH002", "type": "supply", "product": "Bottled Water", "quantity": 300 },
          { "from": "MB002", "type": "loan", "amount": 3500 }
        ]
      },
      {
        "id": "MK006",
        "name": "Az",
        "location": { "lat": 5.6781, "lng": -0.1694 },
        "inventory": [
          { "product": "Cooking Oil", "quantity": 200 }
        ],
        "pos_transactions": [
          { "customer": "Individual G", "product": "Cooking Oil", "quantity": 2, "amount": 50 }
        ],
        "financial_transactions": [
          { "from": "WH001", "type": "supply", "product": "Cooking Oil", "quantity": 200 },
          { "from": "MB001", "type": "loan", "amount": 6000 }
        ]
      },
      {
        "id": "MK007",
        "name": "Rabo",
        "location": { "lat": 5.6781, "lng": -0.1698 },
        "inventory": [
          { "product": "Rice", "quantity": 700 }
        ],
        "pos_transactions": [
          { "customer": "Individual H", "product": "Rice", "quantity": 4, "amount": 40 }
        ],
        "financial_transactions": [
          { "from": "WH001", "type": "supply", "product": "Rice", "quantity": 700 },
          { "from": "MB002", "type": "loan", "amount": 5000 }
        ]
      }
    ]
  }
}
