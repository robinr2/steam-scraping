migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k7u1kb6s2ojhtpy")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k7u1kb6s2ojhtpy")

  collection.listRule = null

  return dao.saveCollection(collection)
})
