import Site from "../../models/Site";
import sequelize from "../../utils/db";

const handler = (req, res) => {
    // Order.belongsTo(User)
    // User.hasMany(Order);

    // Order.belongsToMany(Product, { through: OrderItem })
    // Product.belongsToMany(Order, { through: OrderItem })

    sequelize.sync({ force: true }).then(result => {

        // Site.create({
        //     name: "Shopping",
        //     slogan: "Site sloganı",
        //     email: "email@example.com",
        //     address: "",
        //     city: "",
        //     country: "",
        //     postalCode: "",
        //     phoneNumber: ""
        // }).then((result) => {
        //     return res.send({ message: "Site verileri eklendi." })
        // }).catch((err) => {
        //     return res.send({ message: "Hata." })
        // });

    }).catch(err => {
        res.send({ message: err.parent.sqlMessage });
    })
}

export default handler;

