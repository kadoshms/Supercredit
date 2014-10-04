define({ api: [
  {
    "type": "post",
    "url": "/purchases/",
    "title": "Create a new Purchase if validated",
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
        }
      ]
    },
    "name": "CreatePurchases",
    "group": "Purchases",
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