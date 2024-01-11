Donut.destroy_all
Topping.destroy_all
Order.destroy_all

# Create 10 Donuts
20.times do
    Donut.create(
        name: Faker::Lorem.sentence(word_count: 2),
        description: Faker::Lorem.paragraph(sentence_count: 4),
        price: 5.25,
        sold_out: false,
    )

    Topping.create(
        name: Faker::Lorem.word(),
        price: 1.25,
        sold_out: false,
    )

    Order.create(
        customer_name: Faker::Name.name(),
        customer_phone: Faker::PhoneNumber.cell_phone(),
        customer_email: "seeds@fake.com",
        total_price: 6.50,
        completed: false,
        order_items_attributes: [{
            donut_name: Faker::Lorem.sentence(word_count: 2),
            donut_price: 5.25,
            order_item_toppings_attributes: [{
                topping_name: Faker::Lorem.sentence(word_count: 2),
                topping_price: 1.25
            }]
        }]
    )

end
