# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  author_id  :bigint           not null
#  video_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord

  validates :body, presence: true

  belongs_to :video
  belongs_to :author, class_name: :User


end
