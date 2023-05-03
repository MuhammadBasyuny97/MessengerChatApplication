const router = require('express').Router();
const {getFriends, messageUploadDB, getMessage,ImageSendMessage} = require('../controller/messengerController');
const { authMiddleware } = require('../middleware/authMiddleware');


router.get('/get-friends',authMiddleware ,getFriends);

router.post('/send-message',authMiddleware ,messageUploadDB);
router.get('/get-message/:id',authMiddleware ,getMessage);
router.post('/image-message-send', authMiddleware,ImageSendMessage);



module.exports = router;