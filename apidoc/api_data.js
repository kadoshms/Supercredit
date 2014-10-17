define({ api: [
  {
    "type": "post",
    "url": "/purchases/ Create a new Purchase if validated",
    "title": "Calls come from Cedit Card Company",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "credit_hash",
            "optional": false,
            "description": "<p>Hashed Credit Card number</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "purchase_type",
            "optional": false,
            "description": "<p>Purchase Identifier</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "purchase_amount",
            "optional": false,
            "description": "<p>Requested purchase amount</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Purchase-Approved:",
          "content": "Purchase-Approved:\n{\n\tstatus: 1020\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Purchase-Denied:",
          "content": "Purchase-Denied:\n{\n\tstatus: 1010\n}\n",
          "type": "json"
        },
        {
          "title": "User-not-found:",
          "content": "User-not-found:\n{\n\tstatus: 1101\n}\n",
          "type": "json"
        }
      ]
    },
    "name": "CreatePurchases",
    "group": "Purchases",
    "version": "0.0.0",
    "filename": "routes/purchases.js"
  },
  {
    "type": "put",
    "url": "/purchase/:id",
    "title": "Set Denied Purchase As Approved (Status 1020)",
    "group": "Purchase",
    "success": {
      "examples": [
        {
          "title": "Purchase-Approved:",
          "content": "Purchase-Approved:\n{\n\tstatus: 1020\n}\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/purchases.js"
  },
  {
    "type": "post",
    "url": "/restrictions/",
    "title": "Create a new Restriction",
    "name": "CreateRestrictions",
    "group": "Restrictions",
    "version": "0.0.0",
    "filename": "routes/restrictions.js"
  },
  {
    "type": "get",
    "url": "/restrictions/:userId",
    "title": "Request User Restrictions",
    "name": "GetRestrictions",
    "group": "Restrictions",
    "version": "0.0.0",
    "filename": "routes/restrictions.js"
  }
] });