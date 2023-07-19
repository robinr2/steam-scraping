migrate((db) => {
  const collection = new Collection({
    "id": "k7u1kb6s2ojhtpy",
    "created": "2023-07-17 11:57:09.956Z",
    "updated": "2023-07-17 11:57:09.956Z",
    "name": "items",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "stsclqao",
        "name": "highestBuyOrder",
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
        "id": "3ixxgfpm",
        "name": "lowestSellOrder",
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
        "id": "dcapf9ls",
        "name": "buyOrders",
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
        "id": "zoonq236",
        "name": "sellOrders",
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
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("k7u1kb6s2ojhtpy");

  return dao.deleteCollection(collection);
})
