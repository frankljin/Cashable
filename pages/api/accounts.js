import nextConnect from "next-connect";
import middleware from "../../middleware/database";
const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { id } = req.query;
  const query = { sub: id };
  let doc = await req.db.collection("accounts").find(query).toArray();
  res.json(doc);
});

handler.post(async (req, res) => {
  let doc = await req.db.collection("accounts").insertOne(req.body);
  res.json(doc)
})

export default handler;
