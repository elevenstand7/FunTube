# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


require "open-uri"

ApplicationRecord.transaction do
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Video.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'demo',
    email: 'demo@user.io',
    password: 'password'
  )

  # More users
  10.times do
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    })
  end

  puts "Creating videos..."
  random_description = proc { Faker::Lorem.paragraphs(number: rand(1..3)).join("\n\n") }

  videos = Video.create!([
    {
      title: 'Loopy!',
      description: random_description.call,
      user_id: 1
    },
    {
      title: 'Party Animals',
      description: random_description.call,
      user_id: 2
    },
    {
      title: 'study with me',
      description: random_description.call,
      user_id: 1
    }]);


end


puts "Attaching videos..."
Video.first(3).each_with_index do |video, index|
  video.new_video.attach(
      io: URI.open("https://funtube-seeds.s3.us-east-2.amazonaws.com/v#{index + 1}.mp4"),
      filename: "v#{index + 1}.mp4"
    )
end

puts "Done!"
