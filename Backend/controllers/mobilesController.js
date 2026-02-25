const mobilesModel = require("../models/mobilesModels");
exports.getMobiles=async (req, res, next)=>{
     const query = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'   // ✅ fixed typo: $option → $options
        }
    } : {};

    const mobiles = await mobilesModel.find(query);
    res.json({
        success: true,
        mobiles
    });
}
exports.getSingleMobile=async(req, res, next)=>{
     try {
    const mobile = await mobilesModel.findById(req.params.id); // ✅ removed invalid 'ID'

    res.json({
      success: true,
      mobile
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
}