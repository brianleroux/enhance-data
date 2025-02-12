/**
 * @private
 * @module update/one
 */
let waterfall = require('run-waterfall')
let getTableName = require('../helpers/_get-table-name')
// let createKey = require('../helpers/_create-key')
let validate = require('../helpers/_validate')
// let unfmt = require('../helpers/_unfmt')
// let fmt = require('../helpers/_fmt')
let dynamo = require('../helpers/_dynamo').doc

/**
 * Write a document
 * @param {object} params - The document to write
 * @param {callback} errback - Node style error first callback
 */
module.exports = function one (params, callback) {
  validate.table(params.table)
  if (params.key)
    validate.key(params.key)
  waterfall([
    function getTable (Item, callback) {
      getTableName(function done (err, TableName) {
        if (err) callback(err)
        else callback(null, TableName, Item)
      })
    },
    function _dynamo (TableName, Item, callback) {
      dynamo(function done (err, doc) {
        if (err) callback(err)
        else callback(null, TableName, Item, doc)
      })
    },
    function write (TableName, Item, doc, callback) {
      validate.size(Item)
      console.log({ TableName, Item })
      callback()
      /*
      let query = {}
      doc.update(query, function done (err) {
        if (err) callback(err)
        else callback(null, unfmt(Item))
      })*/
    }
  ], callback)
}
