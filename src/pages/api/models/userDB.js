const mongoose = require("mongoose");
const bcrypt = typeof window === 'undefined' ? require("bcrypt") : null;
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    secret: { type: String, required: true, minlength: 6 },
  },
  {
    collection: "user",
  }
);

userSchema.plugin(uniqueValidator);

userSchema.statics.findAndValidate = async function (email, secret) {
  if (!bcrypt) throw new Error('bcrypt is only available on the server side');
  const user = await this.findOne({ email });
  if (!user) return false;
  const isValid = await bcrypt.compare(secret, user.secret);
  return isValid ? user : false;
};

userSchema.pre("save", async function (next) {
  if (!bcrypt) throw new Error('bcrypt is only available on the server side');
  if (!this.isModified("secret")) return next();
  this.secret = await bcrypt.hash(this.secret, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
