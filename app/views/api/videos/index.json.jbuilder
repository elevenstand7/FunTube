# json.videos({})

json.videos do
  @videos.each do |video|
    json.set! video.id do
      json.partial! 'api/videos/video', video:video
      # json.extract! video, :id, :title, :description, :user_id
    end
  end
end
