# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  user_like  :boolean          default(FALSE), not null
#  user_id    :bigint           not null
#  video_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
  validates :user_like, presence:true, inclusion: {in: [true, false]}
  validates :user_id, uniqueness: { scope: :video_id}

  belongs_to :video
  belongs_to :user
end
