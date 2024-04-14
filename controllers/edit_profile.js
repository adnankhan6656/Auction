const { getData } = require('../common');
const logger = require('../controllers/logger');

const editProfile = async (req, res) => {
    const id = +req.params.id;
    // logger.info(id);

    const profileSql = `select *,DATE_FORMAT(dob,'%Y-%m-%d') as dob from users where id=?`;
    try {
        const profileData = await getData(profileSql, [id]);
        // logger.info(profileData);
        res.render('pages/edit_profile', { data: profileData[0] });
    } catch (error) {
        logger.error(error);
    }
}

const postEditProfile = async (req, res) => {
    logger.info(req.body);
    res.send({ data: req.body })
}

module.exports = { editProfile, postEditProfile };