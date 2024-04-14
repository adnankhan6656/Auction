const logger = require("./logger");

const index = (req, res) => {
    logger.info("Hello,World!")
    logger.warn("Hello,World!")
    logger.error("Hello,World!")
    logger.fatal("Hello,World!")
    logger.debug("Hello,World!")
    logger.trace("Hello,World!")
    res.render("pages/index.ejs");
}

module.exports = {index}