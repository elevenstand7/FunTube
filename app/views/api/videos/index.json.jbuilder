json.videos({})


# json.videos do
#   @videos.each do |video|
#     json.set! video.id do
#       json.partial! 'api/videos/video', video:video
#       json.uploader video.user.username
#     end
#   end
# end

json.videos do
  @videos.each do |video|
    json.set! video.id do
      # json.partial! 'api/videos/video', video:video
      json.id video.id
      json.title video.title
      json.photo_url url_for (video.photo)
      json.uploader video.user.username
      json.userId video.user_id
    end
  end
end


