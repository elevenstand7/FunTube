

json.video do
  json.partial! '/api/videos/video', video: @video
  json.uploader @video.user.username

end


@video.likes.each do |like|
  json.likes do
    json.set! like.id do
      json.partial! 'api/likes/like', like: like
    end
  end

json.users do
    json.set! like.user_id do
      json.partial! 'api/users/user', user: like.user
    end
  end
end
