json.comment do
    json.partial! '/api/comments/comment', comment: @comment
end


# json.user do
#     json.partial! '/api/users/user', user: @comment.author
# end


# json.video do
#     json.partial! '/api/videos/video', video: @comment.video
#   end