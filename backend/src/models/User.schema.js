const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  provider: String,
  providerId: String,
  providerPic: String,
  token: String,
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});
const { following, followers } = this;

UserSchema.methods.follow = function follow(userId) {
  if (following.indexOf(userId) === -1) {
    following.push(userId);
  }
  return this.save();
};
UserSchema.methods.addFollower = function addFollower(fs) {
  followers.push(fs);
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);
