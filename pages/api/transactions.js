import nextConnect from "next-connect";
import middleware from "../../middleware/database";
const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { id } = req.query;
  const query = { account: id };
  let doc = await req.db.collection("transactions").findOne(query);
  res.json(doc);
});

handler.post(async (req, res) => {
  let doc = await req.db.collection("transactions").insertOne(req.body);
  res.json(doc)
})

export default handler;
