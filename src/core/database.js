const { MongoClient } = require("mongodb")
const { logInfo } = require("./log")

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_IP}:${process.env.DB_PORT}/?authMechanism=DEFAULT`
const client = new MongoClient(url)

const dbName = process.env.DB_DBNAME

var settings_coll
var warnings_coll
var vault_coll

exports.DatabaseStart = async () => {

    await client.connect();

    logInfo("Database Client Connected Successfully")

    const db = client.db(dbName)

    logInfo("Database Connected Successfully")

    await db.listCollections({name:"settings"}).next() ?? await db.createCollection("settings")
    await db.listCollections({name:"warnings"}).next() ?? await db.createCollection("warnings")
    await db.listCollections({name:"vault"}).next() ?? await db.createCollection("vault")

    const settingscoll = db.collection("settings")
    const warningscoll = db.collection("warnings")
    const vaultcoll = db.collection("vault")

    await settingscoll.findOne({header: "logchannel" }) ?? await settingscoll.insertOne({header: "logchannel", value: ""})

    return {client: client, db: db, colls: { settings: settingscoll, warnings: warningscoll, vault: vaultcoll } }

}