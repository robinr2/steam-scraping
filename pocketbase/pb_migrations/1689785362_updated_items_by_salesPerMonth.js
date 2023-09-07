migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9g2ewkker5pu559")

  collection.options = {
    "query": "SELECT url, salesPerMonth, margin, id\nFROM items\nORDER BY salesPerMonth DESC;"
  }

  // remove
  collection.schema.removeField("kwud6zsb")

  // remove
  collection.schema.removeField("4hlvtwu7")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9g2ewkker5pu559")

  collection.options = {
    "query": "SELECT id, url, salesPerMonth\nFROM items\nORDER BY salesPerMonth DESC;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kwud6zsb",
    "name": "url",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4hlvtwu7",
    "name": "salesPerMonth",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("x6wuuh90")

  // remove
  collection.schema.removeField("io4dqwp1")

  // remove
  collection.schema.removeField("ygifqxfl")

  return dao.saveCollection(collection)
})
