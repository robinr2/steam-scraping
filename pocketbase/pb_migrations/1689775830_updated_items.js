migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k7u1kb6s2ojhtpy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jhcjwk4z",
    "name": "salesPerMonth",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k7u1kb6s2ojhtpy")

  // remove
  collection.schema.removeField("jhcjwk4z")

  return dao.saveCollection(collection)
})
