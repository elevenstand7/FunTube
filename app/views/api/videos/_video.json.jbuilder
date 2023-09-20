json.extract! video, :id, :title, :description, :user_id

if video.new_video.attached?
  json.video_url url_for (video.new_video)
end
