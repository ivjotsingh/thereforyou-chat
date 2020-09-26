//Map of topicName: Rating
const Topic = mongoose.Schema({
  type: Map,
  of: Number,
});
