

  # @likes.each do |like|
  #   json.set! like.id do
  #     json.partial! '/api/likes/like', like:like
  #   end
  # end



json.array! @likes do |like|
  # json.set! like.id do
  #   json.id like.id
  #   json.video_id like.video_id
  #   json.user_id like.user_id
  # end
  json.id like.id
  json.likedVideo_id like.video_id
  json.user_id like.user_id
end

