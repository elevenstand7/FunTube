json.video do
  json.partial! '/api/videos/video', video: @video
  json.uploader @video.user.username
end

