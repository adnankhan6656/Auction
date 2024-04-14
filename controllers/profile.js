const { getData } = require('../common');
const logger = require('../controllers/logger');

const profile = async (req, res) => {
    const id = +req.params.id;
    // logger.info(id);

    const profileSql = `select * from users where id=?`;
    const addressSql = `select * from shipping_address where user_id= ?`
    try {
        const profileData = await getData(profileSql, [id]);
        const addressData = await getData(addressSql, [id]);
        logger.info(profileData);
        res.render('pages/profile', { data: profileData[0], address: addressData[0] });
    } catch (error) {
        logger.error(error);
    }

}

module.exports = { profile };