// forked from https://gist.github.com/GendelfLugansk/db31d7742c4dbc3d6d768fa525474aff
// and added 'sql-template-strings' wrapper

import * as SQLite from 'expo-sqlite'
import { SQLStatement } from 'sql-template-strings'

export default class Connection {
  constructor (databaseName) {
    this._db = SQLite.openDatabase(databaseName)
    this.transacting = false
  }

  execute (sqlStatement, args = []) {
    if (sqlStatement instanceof SQLStatement) {
      args = sqlStatement.values
      sqlStatement = sqlStatement.sql
    }

    return new Promise((resolve, reject) => {
      this._db.exec([{ sql: sqlStatement, args }], false, (err, res) => {
        if (err) {
          return reject(err)
        }

        if (res[0].error) {
          return reject(res[0].error)
        }

        resolve(res[0])
      })
    })
  }

  close () {
    this._db._db.close()
  }

  async beginTransaction () {
    await this.execute('begin transaction')
    this.transacting = true
  }

  async commitTransaction () {
    await this.execute('commit')
    this.transacting = false
  }

  async rollbackTransaction () {
    await this.execute('rollback')
    this.transacting = false
  }
}
