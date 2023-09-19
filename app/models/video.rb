# == Schema Information
#
# Table name: videos
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :string           not null
#  user_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Video < ApplicationRecord
  validates :title, presence: true, length: {maximum: 100}
  validates :description, length: {maximum: 5000}
  validates :user_id, presence: true

  belongs_to :user
  has_many :comments
  has_many :likes

end
