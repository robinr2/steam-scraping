migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k7u1kb6s2ojhtpy")

  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k7u1kb6s2ojhtpy")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
