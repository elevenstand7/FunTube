json.like do
  json.partial! '/api/likes/like', like: @like
end

json.user do
  json.partial! '/api/users/user', user: @like.user
end

json.video do
  json.partial! 'api/videos/video', video: @like.video
end
