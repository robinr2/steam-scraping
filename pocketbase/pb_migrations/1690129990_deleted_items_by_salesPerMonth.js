migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("9g2ewkker5pu559");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "9g2ewkker5pu559",
    "created": "2023-07-19 14:23:57.535Z",
    "updated": "2023-07-19 16:49:22.855Z",
    "name": "items_by_salesPerMonth",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "x6wuuh90",
        "name": "url",
        "type": "url",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "io4dqwp1",
        "name": "salesPerMonth",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "ygifqxfl",
        "name": "margin",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT url, salesPerMonth, margin, id\nFROM items\nORDER BY salesPerMonth DESC;"
    }
  });

  return Dao(db).saveCollection(collection);
})
