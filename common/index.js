const db = require("../config/connection");
const logger = require("../controllers/logger");
const getData = async (sql, arr) => {
    try {
        const results = await db.query(sql, [...arr]);
        if (results[0].error) throw new Error(results[0].error.message);
        return results[0];
    } catch (error) {
        logger.error(error);
    }
}

module.exports = { getData };