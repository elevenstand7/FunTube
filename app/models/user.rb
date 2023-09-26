# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :username,
  uniqueness: true,
  length: { in: 3..30 },
  format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email,
  uniqueness: true,
  length: { in: 3..255 },
  format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  before_validation :ensure_session_token

  has_many :videos, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, 
    foreign_key: :author_id,
    dependent: :destroy, 
    inverse_of: :author

  def self.find_by_credentials(credential, password)
    field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
    user = User.find_by(field => credential)
    user&.authenticate(password)
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def reset_session_token!
      self.session_token = generate_unique_session_token
      save!
      session_token
  end

  private

  def generate_unique_session_token
      while true
          token = SecureRandom.urlsafe_base64
          return token unless User.exists?(session_token: token)
      end
  end



end
