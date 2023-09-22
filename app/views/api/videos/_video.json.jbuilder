json.extract! video, :id, :title, :description, :user_id, :created_at, :updated_at

if video.new_video.attached?
  json.video_url url_for (video.new_video)
else
  json.video_url "www.google.com"
end


if video.photo.attached?
  json.photo_url url_for (video.photo)
end
