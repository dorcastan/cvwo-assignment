# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Todo.create(title: "Make to do list", details: "Using Rails/React")
Todo.create(title: "Submit CVWO assignment", details: "By 24 January 2020")

8.times do 
    Todo.create(title: "Title", details: "Details")
end

tagNames = ["General", "Urgent", "Personal"]
tagNames.each do |tagName|
    Tag.create(name: tagName)
end
