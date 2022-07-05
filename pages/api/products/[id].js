import Product from "../../../models/Product"

const handler = async (req, res) => {
    const product = await Product.findByPk(req.query.id);
    res.send(product);
}

export default handler;