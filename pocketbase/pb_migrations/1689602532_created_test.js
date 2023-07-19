migrate((db) => {
  const collection = new Collection({
    "id": "n73e9r5bakal96z",
    "created": "2023-07-17 14:02:12.524Z",
    "updated": "2023-07-17 14:02:12.524Z",
    "name": "test",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rdh9yqts",
        "name": "number1",
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
        "id": "hre37zxm",
        "name": "number2",
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
  const collection = dao.findCollectionByNameOrId("n73e9r5bakal96z");

  return dao.deleteCollection(collection);
})
