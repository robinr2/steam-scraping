migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k7u1kb6s2ojhtpy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lb85gtlb",
    "name": "url",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k7u1kb6s2ojhtpy")

  // remove
  collection.schema.removeField("lb85gtlb")

  return dao.saveCollection(collection)
})
