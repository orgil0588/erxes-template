const ExmFeeds = {
  async createdUser(exmFeed, {}, { coreModels }) {
    const user = await coreModels.Users.findOne({ _id: exmFeed.createdBy });
    return user;
  },

  async updatedUser(exmFeed, {}, { coreModels }) {
    const user = coreModels.Users.findOne({ _id: exmFeed.updatedBy });
    return user;
  },

  async recipients(exmFeed, {}, { coreModels }) {
    const user = coreModels.Users.find({ _id: { $in: exmFeed.recipientIds } });
    return user;
  },

  async eventGoingUsers(exmFeed, {}, { coreModels }) {
    const user = coreModels.Users.find({
      _id: { $in: (exmFeed.eventData || {}).goingUserIds || [] }
    });
    return user;
  },

  async eventInterestedUsers(exmFeed, {}, { coreModels }) {
    const user = coreModels.Users.find({
      _id: { $in: (exmFeed.eventData || {}).interestedUserIds || [] }
    });
    return user;
  },

  async commentCount(exmFeed, {}, { models }) {
    const user = models.Comments
      ? models.Comments.find({
          contentId: exmFeed._id,
          contentType: 'exmFeed'
        }).countDocuments()
      : 0;
    return user;
  },

  async likeCount(exmFeed, {}, { models }) {
    const user = models.Emojis
      ? models.Emojis.find({
          contentId: exmFeed._id,
          contentType: 'exmFeed',
          type: 'like'
        }).countDocuments()
      : 0;
    return user;
  },
  async heartCount(exmFeed, {}, { models }) {
    const user = models.Emojis
      ? models.Emojis.find({
          contentId: exmFeed._id,
          contentType: 'exmFeed',
          type: 'heart'
        }).countDocuments()
      : 0;
    return user;
  },

  async isHearted(exmFeed, {}, { models, user }) {
    const User = models.Emojis
      ? await models.Emojis.exists({
          contentId: exmFeed._id,
          contentType: 'exmFeed',
          type: 'heart',
          userId: user._id
        })
      : false;
    return User;
  },

  async isLiked(exmFeed, {}, { models, user }) {
    const User = models.Emojis
      ? await models.Emojis.exists({
          contentId: exmFeed._id,
          contentType: 'exmFeed',
          type: 'like',
          userId: user._id
        })
      : false;
    return User;
  }
};

export default ExmFeeds;
