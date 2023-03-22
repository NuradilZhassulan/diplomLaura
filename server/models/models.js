const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketApartment = sequelize.define('basket_apartment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Apartment = sequelize.define('apartment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Room = sequelize.define('room', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const House = sequelize.define('house', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const ApartmentInfo = sequelize.define('apartment_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeRoom = sequelize.define('type_room', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketApartment)
BasketApartment.belongsTo(Basket)

Type.hasMany(Apartment)
Apartment.belongsTo(Type)

Room.hasMany(Apartment)
Apartment.belongsTo(Room)

House.hasMany(Apartment)
Apartment.belongsTo(House)

Apartment.hasMany(Rating)
Rating.belongsTo(Apartment)

Apartment.hasMany(BasketApartment)
BasketApartment.belongsTo(Apartment)

Apartment.hasMany(ApartmentInfo, {as: 'info'});
ApartmentInfo.belongsTo(Apartment)

Type.belongsToMany(Room, {through: TypeRoom })
Room.belongsToMany(Type, {through: TypeRoom })
// House.belongsToMany(House, {through: TypeRoom })

module.exports = {
    User,
    Basket,
    BasketApartment,
    Apartment,
    Type,
    Room,
    House,
    Rating,
    TypeRoom,
    ApartmentInfo
}