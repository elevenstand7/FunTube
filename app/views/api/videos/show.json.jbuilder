json.video do
  json.extract! @video, :id, :title, :description, :user_id
end
