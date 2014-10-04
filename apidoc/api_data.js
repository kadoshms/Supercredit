define({ api: [
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
    "url": "/restrictions/:id",
    "title": "Request User Restrictions",
    "name": "GetRestrictions",
    "group": "Restrictions",
    "version": "0.0.0",
    "filename": "routes/restrictions.js"
  }
] });