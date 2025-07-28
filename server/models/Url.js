import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    shortId : { type :String, required: true, unique: true },
    originalUrl : { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, 
    expiresAt: { type: Date, required: true }
});
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL Index
urlSchema.index({ shortId: 1 }, { unique: true }); // Ensure shortId is unique
export default mongoose.model('Url', urlSchema);