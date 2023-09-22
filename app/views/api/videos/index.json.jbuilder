json.videos({})

json.videos do
  @videos.each do |video|
    json.set! video.id do
      json.partial! 'api/videos/video', video:video
      json.uploader video.user.username
    end
  end
end

