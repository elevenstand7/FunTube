json.comments({})


json.comments do
  @comments.each do |comment|
    json.set! comment.id do
      json.partial! 'api/comments/comment', comment:comment
      json.author comment.author.username

    end
  end
end


